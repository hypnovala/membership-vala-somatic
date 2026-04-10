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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          inHouston: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSuccess(true);
      setFirstName("");
      setEmail("");
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className={compact ? "mt-6 grid gap-3" : "mt-8 grid gap-4 rounded-[28px] bg-white/60 p-5 ring-1 ring-[var(--vala-line)]"}
    >
      <div>
        <p className="text-lg font-semibold text-[var(--vala-deep)]">
          Get Membership Details + 40% Off First Month
        </p>
        <p className="mt-1 text-sm text-[var(--vala-muted)]">
          Click below to view membership details and access the limited-time first month offer.
        </p>
      </div>

      <div className={compact ? "grid gap-3 sm:grid-cols-[0.85fr_1.15fr]" : "grid gap-3 sm:grid-cols-2"}>
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          className="w-full rounded-full border border-[var(--vala-line)] bg-white px-5 py-3 text-[var(--vala-deep)] outline-none transition focus:border-[var(--vala-gold)]"
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
          className="w-full rounded-full border border-[var(--vala-line)] bg-white px-5 py-3 text-[var(--vala-deep)] outline-none transition focus:border-[var(--vala-gold)]"
        />
      </div>

      <div className={compact ? "flex flex-col gap-3 sm:flex-row sm:items-center" : "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"}>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center rounded-full bg-[var(--vala-burgundy)] px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Submitting..." : buttonLabel}
        </button>
        <p className="text-sm text-[var(--vala-muted)]">
          40% off first month offer.
        </p>
      </div>

      {success ? (
        <p className="text-sm text-[#24543d]">You&apos;re in — check your email</p>
      ) : null}

      {error ? (
        <p className="text-sm text-[var(--vala-burgundy)]">Something went wrong. Please try again.</p>
      ) : null}
    </form>
  );
}
