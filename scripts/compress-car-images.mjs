// One-time migration: shrink already-uploaded car photos in Supabase Storage.
//
// New uploads are compressed client-side (see src/lib/supabase/storage.ts), but photos
// already sitting in the "car-images" bucket are still full-size camera originals. This
// downloads each one, resizes/re-encodes it if it's oversized, and re-uploads it to the
// SAME path (upsert) so no database rows need to change.
//
// Usage:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/compress-car-images.mjs            # dry run (default)
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/compress-car-images.mjs --apply     # actually overwrite

import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const BUCKET = "car-images";
const MAX_DIMENSION = 1920;
const JPEG_QUALITY = 82;
const SKIP_UNDER_BYTES = 400_000; // already small enough, leave alone
const CONCURRENCY = 5;

const apply = process.argv.includes("--apply");

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars first.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function listAllFiles() {
  const files = [];
  let offset = 0;
  const limit = 100;
  for (;;) {
    const { data, error } = await supabase.storage.from(BUCKET).list("", { limit, offset });
    if (error) throw error;
    if (!data || data.length === 0) break;
    files.push(...data.filter((f) => f.id)); // folders have no id
    if (data.length < limit) break;
    offset += limit;
  }
  return files;
}

async function processFile(file) {
  const path = file.name;
  const originalSize = file.metadata?.size ?? 0;

  const { data: blob, error: downloadError } = await supabase.storage.from(BUCKET).download(path);
  if (downloadError) {
    console.error(`  ✗ ${path}: download failed — ${downloadError.message}`);
    return { path, skipped: true };
  }
  const buffer = Buffer.from(await blob.arrayBuffer());

  const meta = await sharp(buffer).metadata();
  const needsResize = (meta.width ?? 0) > MAX_DIMENSION || (meta.height ?? 0) > MAX_DIMENSION;
  const needsCompress = buffer.length > SKIP_UNDER_BYTES;

  if (!needsResize && !needsCompress) {
    console.log(`  – ${path}: already small (${(buffer.length / 1024).toFixed(0)}KB), skipping`);
    return { path, skipped: true };
  }

  const output = await sharp(buffer)
    .rotate() // apply EXIF orientation, then strip metadata
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();

  if (output.length >= buffer.length) {
    console.log(`  – ${path}: re-encode didn't help, skipping`);
    return { path, skipped: true };
  }

  const savedPct = (100 * (1 - output.length / buffer.length)).toFixed(0);
  console.log(
    `  ✓ ${path}: ${(buffer.length / 1024).toFixed(0)}KB → ${(output.length / 1024).toFixed(0)}KB (-${savedPct}%)${apply ? "" : " [dry-run]"}`,
  );

  if (apply) {
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, output, {
      cacheControl: "31536000",
      upsert: true,
      contentType: "image/jpeg",
    });
    if (uploadError) {
      console.error(`  ✗ ${path}: upload failed — ${uploadError.message}`);
      return { path, skipped: true };
    }
  }

  return { path, originalSize: buffer.length, newSize: output.length, skipped: false };
}

async function run() {
  console.log(`Mode: ${apply ? "APPLY (will overwrite storage)" : "DRY RUN (no changes will be made)"}`);
  const files = await listAllFiles();
  console.log(`Found ${files.length} files in "${BUCKET}"\n`);

  const results = [];
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(processFile));
    results.push(...batchResults);
  }

  const changed = results.filter((r) => !r.skipped);
  const totalBefore = changed.reduce((sum, r) => sum + r.originalSize, 0);
  const totalAfter = changed.reduce((sum, r) => sum + r.newSize, 0);

  console.log(`\n${changed.length}/${files.length} files ${apply ? "compressed" : "would be compressed"}`);
  if (changed.length > 0) {
    console.log(
      `Total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB`,
    );
  }
  if (!apply) console.log("\nRe-run with --apply to actually overwrite the files in storage.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
