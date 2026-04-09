import { NextResponse } from "next/server";

type WaitlistPayload = {
  email: string;
  firstName: string;
  source: string;
  membershipInterest: "$7" | "$39";
  brand: string;
};

type FormSubmitPayload = WaitlistPayload & {
  _subject: string;
  _template: "table";
};

async function postJson(
  url: string,
  payload: WaitlistPayload | FormSubmitPayload,
  extraHeaders: Record<string, string> = {},
) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body: JSON.stringify(payload),
  });
}

async function sendToWebhook(webhookUrl: string, payload: WaitlistPayload) {
  return postJson(webhookUrl, payload);
}

async function sendToGmailAddress(recipient: string, payload: WaitlistPayload) {
  const encodedRecipient = encodeURIComponent(recipient);

  const formSubmitPayload: FormSubmitPayload = {
    _subject: `VALA Waitlist: ${payload.email}`,
    _template: "table",
    ...payload,
  };

  return postJson(
    `https://formsubmit.co/ajax/${encodedRecipient}`,
    formSubmitPayload,
    { Accept: "application/json" },
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      firstName?: string;
      source?: string;
      membershipInterest?: string;
    };

    const email = body.email?.trim().toLowerCase();
    const firstName = body.firstName?.trim() || "";
    const source = body.source?.trim() || "site";
    const membershipInterest = body.membershipInterest === "$39" ? "$39" : "$7";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const payload: WaitlistPayload = {
      email,
      firstName,
      source,
      membershipInterest,
      brand: "VALA Somatic Membership",
    };

    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
    const gmailRecipient = process.env.WAITLIST_GMAIL_TO;

    if (!webhookUrl && !gmailRecipient) {
      return NextResponse.json(
        {
          message:
            "Waitlist is not configured. Set WAITLIST_WEBHOOK_URL or WAITLIST_GMAIL_TO in Vercel.",
        },
        { status: 503 },
      );
    }

    const upstreamResponse = webhookUrl
      ? await sendToWebhook(webhookUrl, payload)
      : await sendToGmailAddress(gmailRecipient as string, payload);

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        { message: "The waitlist service is unavailable right now. Please try again shortly." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message: "You’re on the list. Watch your inbox for the next VALA update.",
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to submit right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
