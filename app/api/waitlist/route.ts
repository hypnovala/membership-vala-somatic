import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type WaitlistPayload = {
  email?: string;
  firstName?: string;
  source?: string;
  membershipInterest?: "$7" | "$39";
  inHouston?: boolean;
};

type MailSendResult = {
  accepted?: string[];
  rejected?: string[];
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidBody(body: WaitlistPayload): body is Required<Pick<WaitlistPayload, "email" | "firstName">> & WaitlistPayload {
  return typeof body.email === "string" && typeof body.firstName === "string";
}

function getTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function GET() {
  return NextResponse.json(
    { success: true, message: "Waitlist endpoint is live." },
    { status: 200 },
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WaitlistPayload;

    if (!isValidBody(body)) {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 },
      );
    }

    const firstName = body.firstName.trim();
    const email = body.email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const teamEmail = process.env.GMAIL_USER;

    if (!teamEmail) {
      return NextResponse.json(
        { success: false, message: "Waitlist email destination is not configured." },
        { status: 500 },
      );
    }

    const transport = getTransport();

    const supportSubject = `New VALA Somatic waitlist signup: ${firstName}`;
    const supportText = [
      `Name: ${firstName}`,
      `Email: ${email}`,
      `Source: ${body.source ?? "unknown"}`,
      `Membership: ${body.membershipInterest ?? "unknown"}`,
      `In Houston: ${body.inHouston ? "yes" : "no"}`,
    ].join("\n");

    const confirmationSubject = "Welcome to the VALA Somatic waitlist";
    const confirmationText = [
      `Hi ${firstName},`,
      "",
      "You’re in.",
      "",
      "Thank you for joining the VALA Somatic waitlist.",
      "This space is designed for women ready to return to calm presence, embodied confidence, and grounded self-worth.",
      "",
      "You’ll receive early membership details and launch updates soon.",
      "",
      "With care,",
      "VALA Somatic",
    ].join("\n");
    const confirmationHtml = `
      <div style="margin:0;padding:0;background:#f8efea;font-family:Georgia,'Times New Roman',serif;color:#311d1b;">
        <div style="max-width:560px;margin:0 auto;padding:28px 20px;">
          <div style="background:#ffffff;border:1px solid #e8d0c5;border-radius:20px;padding:24px;">
            <h1 style="margin:0 0 16px;font-size:24px;line-height:1.25;font-weight:600;color:#311d1b;">Welcome to VALA Somatic</h1>
            <p style="margin:0 0 14px;font-size:16px;line-height:1.7;">Hi ${firstName},</p>
            <p style="margin:0 0 14px;font-size:16px;line-height:1.7;">You’re in.</p>
            <p style="margin:0 0 14px;font-size:16px;line-height:1.7;">
              Thank you for joining the VALA Somatic waitlist. This space is designed for women ready to return to calm presence, embodied confidence, and grounded self-worth.
            </p>
            <p style="margin:0 0 14px;font-size:16px;line-height:1.7;">
              You’ll receive early membership details and launch updates soon.
            </p>
            <p style="margin:18px 0 0;font-size:16px;line-height:1.7;">With care,<br />VALA Somatic</p>
          </div>
        </div>
      </div>
    `;

    const [supportResult, confirmationResult] = (await Promise.all([
      transport.sendMail({
        from: teamEmail,
        to: teamEmail,
        subject: supportSubject,
        text: supportText,
      }),
      transport.sendMail({
        from: teamEmail,
        to: email,
        subject: confirmationSubject,
        text: confirmationText,
        html: confirmationHtml,
      }),
    ])) as [MailSendResult, MailSendResult];

    const accepted = confirmationResult.accepted ?? [];
    const rejected = confirmationResult.rejected ?? [];

    if (!accepted.includes(email) || rejected.includes(email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your signup was saved, but the confirmation email was not accepted for delivery.",
          supportAccepted: supportResult.accepted ?? [],
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Thank you — check your email for details." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to process your request right now." },
      { status: 500 },
    );
  }
}
