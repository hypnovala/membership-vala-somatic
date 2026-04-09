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

type FormSubmitPayload = WaitlistPayload & {
  _subject: string;
  _template: "table";
};

const WAITLIST_NOT_CONFIGURED_MESSAGE =
  "Waitlist is not configured. Please contact support.";

function normalizePayload(input: WaitlistInput): WaitlistPayload | null {
  const email = input.email?.trim();
  if (!email) return null;

  const interest = input.membershipInterest;
  const membershipInterest: MembershipInterest =
    interest === "$7" || interest === "$39" ? interest : "$39";

  return {
    email,
    firstName: input.firstName?.trim() ?? "",
    source: input.source?.trim() ?? "waitlist",
    membershipInterest,
    brand: "VALA",
    submittedAt: new Date().toISOString(),
  };
}

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
      console.warn("Waitlist endpoint called without delivery configuration");

      return NextResponse.json(
        {
          message: "Waitlist is not configured. Please contact support.",
        },
        { status: 202 },
      );
    }

    const upstreamResponse = webhookUrl
      ? await postJson(webhookUrl, payload)
      : await sendToGmailAddress(gmailRecipient as string, payload);

    if (!upstreamResponse.ok) {
      const upstreamBody = await upstreamResponse.text();
      console.error("Waitlist upstream request failed", {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        bodyPreview: upstreamBody.slice(0, 500),
      });

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
  } catch (error) {
    console.error("Waitlist handler crashed", error);

    return NextResponse.json(
      { message: "Unable to submit right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
