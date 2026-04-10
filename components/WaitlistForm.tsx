"use client";

type WaitlistFormProps = {
  buttonLabel?: string;
  compact?: boolean;
  ctaHref?: string;
};

export default function WaitlistForm({
  buttonLabel = "Click Here",
  compact = false,
  ctaHref = "#membership-details",
}: WaitlistFormProps) {
  return (
    <div
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

      <div className={compact ? "flex flex-col gap-3 sm:flex-row sm:items-center" : "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"}>
        <a
          href={ctaHref}
          className="inline-flex justify-center rounded-full bg-[var(--vala-burgundy)] px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {buttonLabel}
        </a>
        <p className="text-sm text-[var(--vala-muted)]">
          40% off first month offer.
        </p>
      </div>
    </div>
  );
}
