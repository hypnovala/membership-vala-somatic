import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type WaitlistPayload = {
  firstName: string;
  email: string;
  inHouston: boolean;
};

const isValidPayload = (value: unknown): value is WaitlistPayload => {
  if (!value || typeof value !== "object") return false;

  const payload = value as Record<string, unknown>;

  return (
    typeof payload.firstName === "string" &&
    payload.firstName.trim().length > 0 &&
    typeof payload.email === "string" &&
    payload.email.trim().length > 0 &&
    typeof payload.inHouston === "boolean"
  );
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export async function GET() {
  return NextResponse.json(
    {
      message:
        "Waitlist endpoint is live. Send a POST request with firstName, email, and inHouston.",
    },
    { status: 200 },
  );
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();

    if (!isValidPayload(body)) {
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const { firstName, email, inHouston } = body;

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      return NextResponse.json(
        { message: "Server email configuration is missing." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.verify();

    try {
      const teamNotificationResult = await transporter.sendMail({
        from: gmailUser,
        to: gmailUser,
        subject: "New Waitlist Signup",
        text: [
          "New waitlist signup received:",
          `First name: ${firstName}`,
          `Email: ${email}`,
          `In Houston: ${inHouston ? "Yes" : "No"}`,
        ].join("\n"),
      });

      console.log("Team notification result:", teamNotificationResult);
    } catch (notifyError) {
      console.error("Team notification send failed:", notifyError);
    }

    const confirmationResult = await transporter.sendMail({
      from: gmailUser,
      to: email,
      subject: "You’re on the waitlist — Somatic Nurse",
      html: `<p>You're officially in, ${firstName}.</p>`,
    });

    console.log("Confirmation result:", confirmationResult);

    return NextResponse.json({
      success: true,
      message: "Thank you — check your email for details.",
    });
  } catch (error) {
    console.error("Waitlist API error:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
