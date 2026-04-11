"use client";

import { type FormEvent, useState } from "react";

type WaitlistFormProps = {
  buttonLabel?: string;
  compact?: boolean;
};

export default function WaitlistForm({
  buttonLabel = "Click Here",
  compact = false,
}: WaitlistFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [membershipInterest, setMembershipInterest] = useState<"$7" | "$39">("$7");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          membershipInterest,
          inHouston: false,
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      let message = "";

      if (contentType.includes("application/json")) {
        const data = (await response.json()) as { message?: string; success?: boolean };
        message = data.message || "";
      } else {
        const rawText = await response.text();
        console.error("Non-JSON waitlist response:", rawText);
        throw new Error("Unexpected server response. Check the API route deployment.");
      }

      if (!response.ok) {
        throw new Error(message || "Request failed");
      }

      setSuccess(true);
      setFirstName("");
      setEmail("");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        compact
          ? "mt-6 grid gap-3"
          : "mt-8 grid gap-4 rounded-[28px] bg-white/60 p-5 ring-1 ring-[var(--vala-line)]"
      }
    >
      <div>
        <p className="text-lg font-semibold text-[var(--vala-deep)]">
          Get Membership Details + 40% Off First Month
        </p>
        <p className="mt-1 text-sm text-[var(--vala-muted)]">
          Enter your email to join the waitlist and receive membership details.
        </p>
      </div>

      <div
        className={
          compact ? "grid gap-3 sm:grid-cols-[0.85fr_1.15fr]" : "grid gap-3 sm:grid-cols-2"
        }
      >
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="w-full rounded-full border border-[var(--vala-line)] bg-white px-5 py-3 text-[var(--vala-deep)] outline-none transition focus:border-[var(--vala-gold)]"
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-full border border-[var(--vala-line)] bg-white px-5 py-3 text-[var(--vala-deep)] outline-none transition focus:border-[var(--vala-gold)]"
        />
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-medium text-[var(--vala-deep)]"
          htmlFor="membershipInterest"
        >
          Membership option
        </label>
        <select
          id="membershipInterest"
          name="membershipInterest"
          value={membershipInterest}
          onChange={(event) =>
            setMembershipInterest(event.target.value as "$7" | "$39")
          }
          className="w-full rounded-full border border-[var(--vala-line)] bg-white px-5 py-3 text-[var(--vala-deep)] outline-none transition focus:border-[var(--vala-gold)]"
        >
          <option value="$7">$7 Intro Offer</option>
          <option value="$39">$39 Membership</option>
        </select>
      </div>

      <div
        className={
          compact
            ? "flex flex-col gap-3 sm:flex-row sm:items-center"
            : "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
        }
      >
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center rounded-full bg-[var(--vala-burgundy)] px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Submitting..." : buttonLabel}
        </button>
        <p className="text-sm text-[var(--vala-muted)]">40% off the first month offer.</p>
      </div>

      {success ? (
        <p className="text-sm text-[#24543d]">You&apos;re in — check your email.</p>
      ) : null}

      {errorMessage ? (
        <p className="text-sm text-[var(--vala-burgundy)]">{errorMessage}</p>
      ) : null}
    </form>
  );
}
