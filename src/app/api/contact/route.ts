import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Basic structure of a contact submission
interface ContactSubmission {
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
}

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: name, email, message." },
        { status: 400 }
      ) as Response;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format." },
        { status: 400 }
      ) as Response;
    }

    const newSubmission: ContactSubmission = {
      name,
      email,
      subject: subject || "No Subject Specified",
      message,
      timestamp: new Date().toISOString(),
    };

    // Logging for server diagnostics
    console.log("Contact form routing received:", newSubmission);

    // Fallback: Write submissions locally in dev mode/workspace for audit
    // Avoid writing to tmp or dot dirs directly, save under workspace root
    try {
      const submissionsDir = path.join(process.cwd(), "logs");
      if (!fs.existsSync(submissionsDir)) {
        fs.mkdirSync(submissionsDir, { recursive: true });
      }
      
      const submissionsFile = path.join(submissionsDir, "contact_submissions.json");
      let submissionsList: ContactSubmission[] = [];
      
      if (fs.existsSync(submissionsFile)) {
        const fileData = fs.readFileSync(submissionsFile, "utf-8");
        submissionsList = JSON.parse(fileData);
      }
      
      submissionsList.push(newSubmission);
      fs.writeFileSync(submissionsFile, JSON.stringify(submissionsList, null, 2), "utf-8");
    } catch (fsError) {
      console.error("Local file logging failed:", fsError);
      // Don't fail the request, we still want to log success to the user
    }

    // If Resend API key exists in env, send email (optional hook)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "contact@vanshbarman.com",
            to: "vanshbarman@gmail.com", // Fallback destination
            subject: `Vansh Barman Brand Site: ${newSubmission.subject}`,
            html: `
              <h3>New submission from ${newSubmission.name}</h3>
              <p><strong>Email:</strong> ${newSubmission.email}</p>
              <p><strong>Message:</strong></p>
              <p>${newSubmission.message.replace(/\n/g, "<br/>")}</p>
              <p><em>Received at: ${newSubmission.timestamp}</em></p>
            `,
          }),
        });

        if (!res.ok) {
          const resendError = await res.json();
          console.error("Resend API failed:", resendError);
        }
      } catch (emailErr) {
        console.error("Email dispatch failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true, message: "Submission routed successfully." }) as Response;
  } catch (error) {
    console.error("Route handler error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    ) as Response;
  }
}
