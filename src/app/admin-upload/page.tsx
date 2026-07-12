"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getUploadedImages, uploadImage, deleteImage } from "@/app/admin-upload/actions";

export default function AdminUploadPage() {
  const [images, setImages] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Load images on mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const list = await getUploadedImages();
    setImages(list);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setUploadStatus("idle");
      setErrorMessage("");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadStatus("error");
      setErrorMessage("Please select a file first.");
      return;
    }

    setUploadStatus("uploading");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      
      const result = await uploadImage(formData);
      
      if (result.success) {
        setUploadStatus("success");
        setSelectedFile(null);
        // Reset file input element
        const input = document.getElementById("file-input") as HTMLInputElement;
        if (input) input.value = "";
        
        await fetchImages(); // Reload list
      } else {
        setUploadStatus("error");
        setErrorMessage(result.error || "Failed to upload.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("error");
      setErrorMessage("An unexpected error occurred during transit.");
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Confirm absolute deletion of: ${filename}?`)) {
      return;
    }

    try {
      const result = await deleteImage(filename);
      if (result.success) {
        await fetchImages(); // Reload list
      } else {
        alert(result.error || "Failed to delete file.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete resource.");
    }
  };

  return (
    <>
      <Header />

      <main className="w-full min-h-screen bg-white text-black pt-36 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="border-b border-black/10 pb-8 mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-black/50 block mb-4">
              Operational Interface
            </span>
            <h1 className="text-4xl md:text-5xl font-light uppercase tracking-tight">
              Asset Upload Control
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left Upload Form Column */}
            <div className="md:col-span-5 space-y-6">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-black/50 border-b border-black/10 pb-3">
                {"// Upload Panel"}
              </h2>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="border border-dashed border-black p-6 flex flex-col justify-center items-center text-center bg-black/[0.01]">
                  <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer text-xs font-mono font-semibold uppercase tracking-wider hover:bg-black hover:text-white px-3 py-2 border border-black transition-colors duration-200"
                  >
                    {selectedFile ? "Select Different Image" : "Choose File"}
                  </label>
                  
                  {selectedFile && (
                    <div className="mt-4 text-[10px] font-mono text-black/70 truncate max-w-full">
                      <span>Selected: {selectedFile.name}</span>
                      <span className="block text-black/40 mt-1">
                        Size: {(selectedFile.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  )}
                </div>

                {uploadStatus === "success" && (
                  <div className="p-3 border border-black bg-black text-white text-xs font-mono uppercase tracking-wider">
                    Asset registered successfully.
                  </div>
                )}

                {uploadStatus === "error" && (
                  <div className="p-3 border-2 border-black bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={uploadStatus === "uploading"}
                  className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-widest border border-black hover:bg-white hover:text-black transition-all duration-300 disabled:bg-black/35"
                >
                  {uploadStatus === "uploading" ? "Uploading..." : "Upload Asset"}
                </button>
              </form>
            </div>

            {/* Right List Column */}
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-black/50 border-b border-black/10 pb-3 flex justify-between items-center">
                <span>{"// Active Gallery Assets"}</span>
                <span className="bg-black/5 px-2 py-0.5 text-[10px] text-black font-mono">
                  Count: {images.length}
                </span>
              </h2>

              {images.length === 0 ? (
                <div className="py-12 border border-dashed border-black/20 flex flex-col justify-center items-center text-center font-mono text-xs text-black/40">
                  No assets currently stored.
                </div>
              ) : (
                <ul className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {images.map((filename) => (
                    <li
                      key={filename}
                      className="border border-black p-3 flex justify-between items-center gap-4 bg-white hover:bg-black/[0.01] transition-colors duration-200"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Miniature thumbnail */}
                        <div className="w-12 h-12 flex-shrink-0 bg-black/5 border border-black/10 select-none overflow-hidden">
                          <img
                            src={`/uploads/${filename}`}
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-xs font-mono font-bold truncate max-w-[220px]">
                            {filename}
                          </span>
                          <span className="block text-[9px] font-mono text-black/45 mt-0.5">
                            {(() => {
                              const parts = filename.split("_");
                              if (parts.length > 1) {
                                const ts = parseInt(parts[parts.length - 1].split(".")[0]);
                                if (!isNaN(ts)) {
                                  return `Uploaded at: ${new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                                }
                              }
                              return "System Seeded";
                            })()}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(filename)}
                        className="px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-white text-black border border-black hover:bg-black hover:text-white transition-colors duration-200"
                        aria-label={`Delete ${filename}`}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
