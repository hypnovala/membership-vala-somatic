import { NextResponse } from "next/server";
import { Resend } from "resend";

type WaitlistPayload = {
  email?: string;
  firstName?: string;
  source?: string;
  membershipInterest?: "$7" | "$39";
  inHouston?: boolean;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidBody(
  body: WaitlistPayload,
): body is Required<Pick<WaitlistPayload, "email" | "firstName">> & WaitlistPayload {
  return typeof body.email === "string" && typeof body.firstName === "string";
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
    const membershipInterest =
      body.membershipInterest === "$39" ? "$39" : "$7";

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const teamEmail = process.env.WAITLIST_TEAM_EMAIL;

    if (!resendApiKey || !fromEmail || !teamEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Resend environment variables are missing.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);

    const supportSubject = `New VALA Somatic waitlist signup: ${firstName}`;
    const supportText = [
      `Name: ${firstName}`,
      `Email: ${email}`,
      `Source: ${body.source ?? "unknown"}`,
      `Membership: ${membershipInterest}`,
      `In Houston: ${body.inHouston ? "yes" : "no"}`,
    ].join("\\n");

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
    ].join("\\n");

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

    const [{ error: supportError }, { data: confirmationData, error: confirmationError }] =
      await Promise.all([
        resend.emails.send({
          from: fromEmail,
          to: [teamEmail],
          subject: supportSubject,
          text: supportText,
          replyTo: teamEmail,
        }),
        resend.emails.send({
          from: fromEmail,
          to: [email],
          subject: confirmationSubject,
          text: confirmationText,
          html: confirmationHtml,
          replyTo: teamEmail,
        }),
      ]);

    if (supportError) {
      console.error("Support email error:", supportError);
    }

    if (confirmationError || !confirmationData?.id) {
      console.error("Confirmation email error:", confirmationError);

      return NextResponse.json(
        {
          success: false,
          message:
            "Your signup was saved, but the confirmation email was not accepted for delivery.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Thank you — check your email for details." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Waitlist API error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to process your request right now." },
      { status: 500 },
    );
  }
}
