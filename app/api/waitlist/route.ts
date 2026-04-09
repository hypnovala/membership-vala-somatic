import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type WaitlistPayload = {
  firstName: string;
  email: string;
  inHouston: boolean;
};

type MailResult = {
  accepted?: string[];
  rejected?: string[];
  response?: string;
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

const wasAccepted = (result: MailResult, expectedRecipient: string): boolean => {
  if (!Array.isArray(result.accepted)) return false;

  const normalizedRecipient = expectedRecipient.trim().toLowerCase();
  return result.accepted.some((recipient) => recipient.trim().toLowerCase() === normalizedRecipient);
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

    const fromAddress = `"VALA Somatic" <${gmailUser}>`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    try {
      const teamNotificationResult = (await transporter.sendMail({
        from: fromAddress,
        to: gmailUser,
        replyTo: gmailUser,
        subject: "New VALA Somatic Waitlist Signup",
        text: [
          "New VALA Somatic waitlist signup received:",
          `First name: ${firstName}`,
          `Email: ${email}`,
          `In Houston: ${inHouston ? "Yes" : "No"}`,
        ].join("\n"),
        html: `
          <p><strong>New VALA Somatic waitlist signup received:</strong></p>
          <p>First name: ${firstName}</p>
          <p>Email: ${email}</p>
          <p>In Houston: ${inHouston ? "Yes" : "No"}</p>
        `,
      })) as MailResult;

      console.log("Team notification result:", {
        accepted: teamNotificationResult.accepted,
        rejected: teamNotificationResult.rejected,
        response: teamNotificationResult.response,
      });
    } catch (notifyError) {
      console.error("Team notification send failed:", notifyError);
    }

    const html = `
      <div style="font-family: Georgia, 'Times New Roman', serif; color: #2b1c1a; line-height: 1.6;">
        <p>Hi ${firstName},</p>

        <p>You’re officially on the <strong>VALA Somatic Membership</strong> waitlist.</p>

        <p>We’ll send you updates about early access, the intro offer, and next steps as they open.</p>

        <p>For now, keep an eye on your inbox.</p>

        <p>With care,<br />Brock John<br />VALA Somatic</p>
      </div>
    `;

    const text = [
      `Hi ${firstName},`,
      "",
      "You’re officially on the VALA Somatic Membership waitlist.",
      "",
      "We’ll send you updates about early access, the intro offer, and next steps as they open.",
      "",
      "With care,",
      "Brock John",
      "VALA Somatic",
    ].join("\n");

    const confirmationResult = (await transporter.sendMail({
      from: `"VALA Somatic" <${gmailUser}>`,
      to: email,
      replyTo: gmailUser,
      subject: "You’re on the waitlist — VALA Somatic",
      text,
      html,
    })) as MailResult;

    console.log("Confirmation result:", confirmationResult);

    if (!wasAccepted(confirmationResult, email)) {
      console.error("Confirmation email not accepted:", confirmationResult);

      return NextResponse.json(
        { message: "Your signup was saved, but the confirmation email was not accepted for delivery." },
        { status: 502 },
      );
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
