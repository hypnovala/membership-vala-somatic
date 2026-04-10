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

    const supportSubject = `New VALA waitlist signup: ${firstName}`;
    const supportText = [
      `Name: ${firstName}`,
      `Email: ${email}`,
      `Source: ${body.source ?? "unknown"}`,
      `Membership: ${body.membershipInterest ?? "unknown"}`,
      `In Houston: ${body.inHouston ? "yes" : "no"}`,
    ].join("\n");

    const confirmationSubject = "You’re on the VALA waitlist";
    const confirmationText = [
      `Hi ${firstName},`,
      "",
      "Thank you for joining the VALA Somatic waitlist.",
      "You’ll get launch updates, founding-member access, and details soon.",
    ].join("\n");

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
