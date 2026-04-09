import { NextResponse } from "next/server";

type MembershipInterest = "$7" | "$39";

type WaitlistPayload = {
  email: string;
  firstName: string;
  source: string;
  membershipInterest: MembershipInterest;
  brand: string;
  submittedAt: string;
};

type WaitlistInput = {
  email?: string;
  firstName?: string;
  source?: string;
  membershipInterest?: string;
};

const WAITLIST_NOT_CONFIGURED_MESSAGE =
  "Waitlist is not configured. Set WAITLIST_WEBHOOK_URL or WAITLIST_GMAIL_TO in Vercel.";

async function sendToWebhook(webhookUrl: string, payload: WaitlistPayload) {
  return fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: JSON.stringify(payload),
  });
}

async function sendToFormSubmit(recipient: string, payload: WaitlistPayload) {
  const encodedRecipient = encodeURIComponent(recipient);

  return postJson(
    `https://formsubmit.co/ajax/${encodedRecipient}`,
    payload,
    {
      Accept: "application/json",
    },
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WaitlistInput;
    const payload = normalizePayload(body);

    if (!payload) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
    const gmailRecipient = process.env.WAITLIST_GMAIL_TO;

    if (!webhookUrl && !gmailRecipient) {
      return NextResponse.json(
        {
          message: WAITLIST_NOT_CONFIGURED_MESSAGE,
        },
        { status: 503 },
      );
    }

    const upstreamResponse = webhookUrl
      ? await postJson(webhookUrl, payload)
      : await sendToFormSubmit(gmailRecipient as string, payload);

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          message:
            "The waitlist service is unavailable right now. Please try again shortly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message:
        "Success! Check your inbox for membership details and your limited-time offer.",
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to submit right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
