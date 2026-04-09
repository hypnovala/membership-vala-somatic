"use client";

import { useState } from "react";

type WaitlistFormProps = {
  buttonLabel?: string;
  compact?: boolean;
  source?: string;
};

export default function WaitlistForm({
  buttonLabel = "Join the Waitlist",
  compact = false,
  source = "hero",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [membershipInterest, setMembershipInterest] = useState<"$7" | "$39">("$7");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          source,
          membershipInterest,
          inHouston: false,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      setMessage(data.message || "You’re on the waitlist.");
      setEmail("");
      setFirstName("");
      setMembershipInterest("$7");
    } catch (error) {
      const nextMessage =
        error instanceof Error
          ? error.message
          : "Unable to join the waitlist right now.";

      setStatus("error");
      setMessage(nextMessage);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "mt-6 grid gap-3" : "mt-8 grid gap-4 rounded-[28px] bg-white/60 p-5 ring-1 ring-[var(--vala-line)]"}
    >
      <div>
        <p className="text-lg font-semibold text-[var(--vala-deep)]">
          Get Membership Details + 40% Off (Limited Offer)
        </p>
        <p className="mt-1 text-sm text-[var(--vala-muted)]">
          Enter your email below to receive full membership information and your limited-time 40% off first month coupon.
        </p>
      </div>

      <div className={compact ? "grid gap-3 sm:grid-cols-[0.85fr_1.15fr]" : "grid gap-3 sm:grid-cols-2"}>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="First name"
          className="w-full rounded-full border border-[var(--vala-line)] bg-white px-5 py-3 text-[var(--vala-deep)] outline-none transition focus:border-[var(--vala-gold)]"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          required
          className="w-full rounded-full border border-[var(--vala-line)] bg-white px-5 py-3 text-[var(--vala-deep)] outline-none transition focus:border-[var(--vala-gold)]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--vala-deep)]" htmlFor="membershipInterest">
          Membership option
        </label>
        <select
          id="membershipInterest"
          name="membershipInterest"
          value={membershipInterest}
          onChange={(event) => setMembershipInterest(event.target.value as "$7" | "$39")}
          className="w-full rounded-full border border-[var(--vala-line)] bg-white px-5 py-3 text-[var(--vala-deep)] outline-none transition focus:border-[var(--vala-gold)]"
        >
          <option value="$7">$7 Waitlist Sign Up</option>
          <option value="$39">$39 Membership</option>
        </select>
      </div>

      <div className={compact ? "flex flex-col gap-3 sm:flex-row sm:items-center" : "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"}>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex justify-center rounded-full bg-[var(--vala-burgundy)] px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Submitting..." : buttonLabel}
        </button>
        <p className="text-sm text-[var(--vala-muted)]">
          Join the waitlist for launch updates, founding-member access, and the free Somatic Reset Guide.
        </p>
      </div>

      {message ? (
        <p
          className={`text-sm ${
            status === "success" ? "text-[#24543d]" : "text-[var(--vala-burgundy)]"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
