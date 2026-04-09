import assert from "node:assert/strict";
import { after, beforeEach, describe, it, mock } from "node:test";

import { GET, POST } from "../../app/api/waitlist/route";

describe("waitlist API route", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    process.env.GMAIL_USER = "team@example.com";
    process.env.GMAIL_APP_PASSWORD = "app-password";
    mock.restoreAll();
  });

  after(() => {
    process.env = originalEnv;
    mock.restoreAll();
  });

  it("returns a health response on GET", async () => {
    const response = await GET();
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.match(body.message, /Waitlist endpoint is live/);
  });

  it("returns 400 for invalid payloads", async () => {
    const request = new Request("http://localhost/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ email: "only-email@example.com" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.message, "Invalid request body.");
  });

  it("returns 400 for invalid email format", async () => {
    const request = new Request("http://localhost/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ firstName: "Dana", email: "not-an-email", inHouston: false }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.message, "Please provide a valid email address.");
  });

  it("returns 200 and success true when both emails are accepted", async () => {
    mock.method(globalThis, "fetch", async () => new Response(null, { status: 200 }));

    const request = new Request("http://localhost/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ firstName: "Dana", email: "member@example.com", inHouston: true }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.message, "Thank you — check your email for details.");
  });

  it("returns 500 when team notification is not accepted", async () => {
    mock.method(globalThis, "fetch", async () => new Response(null, { status: 500 }));

    const request = new Request("http://localhost/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ firstName: "Dana", email: "member@example.com", inHouston: false }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const body = await response.json();

    assert.equal(response.status, 500);
    assert.equal(body.message, "Unable to send waitlist notification email.");
  });
});
