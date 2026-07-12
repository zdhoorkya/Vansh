"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please populate all required fields.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to submit.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section
      id="contact"
      className="w-full bg-white text-black py-24 md:py-36 px-6 md:px-12 border-b border-black/10 overflow-hidden"
      aria-label="Contact Vansh Barman"
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left info column */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-8">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-black/50 block mb-6">
              06 // Connectivity
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight uppercase leading-tight">
              Initiate <br /> Contact.
            </h2>
            <p className="text-sm font-light text-black/75 mt-6 leading-relaxed max-w-sm">
              If you have inquiries regarding venture collaborations, creative IP acquisition, or architectural development, use the secure direct form.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-black/10 text-xs font-mono">
            <div>
              <span className="block text-black/40 uppercase">Direct Email</span>
              <a
                href="mailto:officialvanshbarman@gmail.com"
                className="hover:underline font-semibold"
              >
                officialvanshbarman@gmail.com
              </a>
            </div>
            <div>
              <span className="block text-black/40 uppercase">Locations</span>
              <span className="font-semibold uppercase">India / Global</span>
            </div>
          </div>
        </div>

        {/* Right form column */}
        <div className="md:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            
            {/* Name */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-xs font-mono font-semibold uppercase tracking-wider text-black/60">
                Name <span className="text-black/40 font-normal">(Required)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status === "submitting"}
                className="w-full bg-white text-black border border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                aria-required="true"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-xs font-mono font-semibold uppercase tracking-wider text-black/60">
                Email Address <span className="text-black/40 font-normal">(Required)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === "submitting"}
                className="w-full bg-white text-black border border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                aria-required="true"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="subject" className="text-xs font-mono font-semibold uppercase tracking-wider text-black/60">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={status === "submitting"}
                className="w-full bg-white text-black border border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-xs font-mono font-semibold uppercase tracking-wider text-black/60">
                Message <span className="text-black/40 font-normal">(Required)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                disabled={status === "submitting"}
                className="w-full bg-white text-black border border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 resize-none"
                aria-required="true"
              />
            </div>

            {/* Status alerts */}
            {status === "success" && (
              <div className="p-4 border border-black bg-black text-white text-xs font-mono uppercase tracking-wider" role="alert">
                Message successfully routed. Thank you.
              </div>
            )}

            {status === "error" && (
              <div className="p-4 border-2 border-black bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider" role="alert">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest border border-black hover:bg-white hover:text-black transition-all duration-300 disabled:bg-black/30 disabled:border-black/30 disabled:text-white/50"
            >
              {status === "submitting" ? "Routing Message..." : "Transmit"}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
