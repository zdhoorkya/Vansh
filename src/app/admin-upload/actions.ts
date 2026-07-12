"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Ensure the upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export async function getUploadedImages() {
  try {
    const files = fs.readdirSync(UPLOAD_DIR);
    // Filter to standard image formats
    return files.filter((file) =>
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
    );
  } catch (err) {
    console.error("Failed to read upload directory:", err);
    return [];
  }
}

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file || file.size === 0) {
      throw new Error("No file uploaded or file is empty.");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Clean and validate filename
    const originalName = file.name;
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension)
      .replace(/[^a-zA-Z0-9_-]/g, "_"); // Remove special characters
      
    // Append timestamp to ensure uniqueness and prevent naming collisions
    const cleanName = `${baseName}_${Date.now()}${extension}`;
    const filePath = path.join(UPLOAD_DIR, cleanName);
    
    fs.writeFileSync(filePath, buffer);
    
    // Trigger Next.js path cache updates
    revalidatePath("/gallery");
    revalidatePath("/admin-upload");
    return { success: true, filename: cleanName };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to upload image.";
    return { success: false, error: message };
  }
}

export async function deleteImage(filename: string) {
  try {
    // Sanitise the input to block path traversal vulnerabilities (e.g. deleting outside files)
    const cleanFilename = path.basename(filename);
    const filePath = path.join(UPLOAD_DIR, cleanFilename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      
      // Trigger Next.js path cache updates
      revalidatePath("/gallery");
      revalidatePath("/admin-upload");
      return { success: true };
    } else {
      throw new Error("Target file not found.");
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete image.";
    return { success: false, error: message };
  }
}
