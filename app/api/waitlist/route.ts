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
      `Membership: ${body.membershipInterest ?? "unknown"}`,
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

    const confirmationHtml = `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#f8efea;font-family:Georgia,'Times New Roman',serif;color:#311d1b;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f8efea;margin:0;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;background-color:#ffffff;border:1px solid #e8d0c5;border-radius:22px;overflow:hidden;">
            <tr>
              <td style="padding:36px 36px 18px 36px;background:linear-gradient(180deg,#f8efea 0%,#ffffff 100%);">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9a6d65;margin-bottom:10px;">
                  VALA Somatic Membership
                </div>
                <h1 style="margin:0;font-size:30px;line-height:1.2;font-weight:600;color:#311d1b;">
                  You’re officially inside.
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:0 36px 12px 36px;font-size:17px;line-height:1.8;color:#5a4744;">
                <p style="margin:0 0 16px 0;">Hi there,</p>

                <p style="margin:0 0 16px 0;">
                  Before anything else—pause for a moment.
                </p>

                <p style="margin:0 0 16px 0;">
                  Take a slow breath in…<br>
                  and a longer breath out.
                </p>

                <p style="margin:0 0 16px 0;">
                  That shift you just felt?<br>
                  That’s where this work begins.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:10px 36px 8px 36px;">
                <h2 style="margin:0;font-size:22px;line-height:1.3;color:#311d1b;">What You May Be Feeling Right Now</h2>
              </td>
            </tr>

            <tr>
              <td style="padding:0 36px 12px 36px;font-size:17px;line-height:1.8;color:#5a4744;">
                <p style="margin:0 0 14px 0;">If you’ve been feeling:</p>
                <ul style="margin:0 0 16px 20px;padding:0;color:#5a4744;">
                  <li style="margin-bottom:8px;">wired but exhausted</li>
                  <li style="margin-bottom:8px;">tension in your shoulders or jaw</li>
                  <li style="margin-bottom:8px;">difficulty shutting off after work</li>
                </ul>

                <p style="margin:0 0 16px 0;">
                  Your body isn’t broken.
                </p>

                <p style="margin:0 0 16px 0;">
                  Your nervous system has simply been operating in survival mode for too long.
                </p>

                <p style="margin:0 0 16px 0;">
                  VALA Somatic was created for women who carry a lot, move through high-pressure environments, and want to return to calm, embodied confidence, and grounded self-worth.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:10px 36px 8px 36px;">
                <h2 style="margin:0;font-size:22px;line-height:1.3;color:#311d1b;">What Happens Next</h2>
              </td>
            </tr>

            <tr>
              <td style="padding:0 36px 12px 36px;font-size:17px;line-height:1.8;color:#5a4744;">
                <p style="margin:0 0 16px 0;">
                  You’re not just joining content.
                </p>

                <p style="margin:0 0 16px 0;">
                  You’re stepping into a membership designed to help your body shift out of stress and back into regulation—consistently.
                </p>

                <p style="margin:0 0 14px 0;">Inside VALA Somatic Membership, you’ll learn how to:</p>

                <ul style="margin:0 0 16px 20px;padding:0;color:#5a4744;">
                  <li style="margin-bottom:8px;">release stored tension from your body</li>
                  <li style="margin-bottom:8px;">calm your nervous system in real time</li>
                  <li style="margin-bottom:8px;">feel more present, grounded, and connected to yourself</li>
                  <li style="margin-bottom:8px;">build simple daily regulation habits that actually last</li>
                </ul>

                <p style="margin:0 0 16px 0;">
                  This is not about performing wellness.
                </p>

                <p style="margin:0 0 16px 0;">
                  This is about helping your body feel safe enough to soften.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:10px 36px 8px 36px;">
                <h2 style="margin:0;font-size:22px;line-height:1.3;color:#311d1b;">Your 40% Off Access Code</h2>
              </td>
            </tr>

            <tr>
              <td style="padding:0 36px 20px 36px;font-size:17px;line-height:1.8;color:#5a4744;">
                <p style="margin:0 0 16px 0;">
                  As part of your early access:
                </p>

                <div style="margin:0 0 18px 0;padding:18px 20px;background-color:#f8efea;border:1px solid #e8d0c5;border-radius:16px;text-align:center;">
                  <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9a6d65;margin-bottom:8px;">Use code</div>
                  <div style="font-size:30px;line-height:1.2;font-weight:700;color:#7c2d2d;">RESET40</div>
                  <div style="margin-top:8px;font-size:15px;color:#5a4744;">40% off your first month</div>
                </div>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 10px 0;">
                  <tr>
                    <td align="center" style="border-radius:999px;background-color:#7c2d2d;">
                      <a href="https://membership-vala-somatic.vercel.app/#pricing" style="display:inline-block;padding:14px 24px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px;">
                        Unlock Your Access
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:10px 36px 8px 36px;">
                <h2 style="margin:0;font-size:22px;line-height:1.3;color:#311d1b;">Want Deeper Support?</h2>
              </td>
            </tr>

            <tr>
              <td style="padding:0 36px 20px 36px;font-size:17px;line-height:1.8;color:#5a4744;">
                <p style="margin:0 0 16px 0;">
                  If you’re in Houston and want a more private reset, premium pathways may include access to deeper support and body-based services.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0;">
                  <tr>
                    <td align="center" style="border-radius:999px;border:1px solid #311d1b;">
                      <a href="https://membership-vala-somatic.vercel.app/#membership" style="display:inline-block;padding:14px 24px;font-size:16px;font-weight:600;color:#311d1b;text-decoration:none;border-radius:999px;">
                        View Membership + Support Options
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:10px 36px 8px 36px;">
                <h2 style="margin:0;font-size:22px;line-height:1.3;color:#311d1b;">A Simple Reset You Can Do Right Now</h2>
              </td>
            </tr>

            <tr>
              <td style="padding:0 36px 12px 36px;font-size:17px;line-height:1.8;color:#5a4744;">
                <ul style="margin:0 0 16px 20px;padding:0;color:#5a4744;">
                  <li style="margin-bottom:8px;">Inhale slowly through your nose</li>
                  <li style="margin-bottom:8px;">Take a second small inhale at the top</li>
                  <li style="margin-bottom:8px;">Exhale slowly through your mouth</li>
                </ul>

                <p style="margin:0 0 16px 0;">
                  Repeat 3 times.
                </p>

                <p style="margin:0 0 16px 0;">
                  This signals safety to your nervous system.
                </p>

                <p style="margin:0 0 16px 0;">
                  And your body responds to safety—not force.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:10px 36px 8px 36px;">
                <h2 style="margin:0;font-size:22px;line-height:1.3;color:#311d1b;">Stay Connected</h2>
              </td>
            </tr>

            <tr>
              <td style="padding:0 36px 28px 36px;font-size:17px;line-height:1.8;color:#5a4744;">
                <p style="margin:0 0 14px 0;">
                  Follow for daily somatic education, nervous system support, and grounded feminine reset content:
                </p>

                <p style="margin:0 0 6px 0;">
                  Instagram · Facebook · TikTok
                </p>

                <p style="margin:16px 0 0 0;">
                  You don’t need to escape your life to feel better.
                </p>

                <p style="margin:0 0 16px 0;">
                  You just need to help your body feel safe again.
                </p>

                <p style="margin:0;">
                  I’ll guide you there.
                </p>

                <p style="margin:18px 0 0 0;">
                  — Brock<br>
                  VALA Somatic
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 36px 30px 36px;border-top:1px solid #e8d0c5;font-size:13px;line-height:1.7;color:#7a6661;background-color:#f8efea;">
                Education only. Not medical advice. Consult a qualified professional for medical concerns.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

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
