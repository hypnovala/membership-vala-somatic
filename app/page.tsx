const includes = [
  {
    title: "Brock Somatic Check-In App",
    body:
      "A guided check-in space that helps members pause, notice stress patterns, and receive a simple grounded next step before tension builds.",
  },
  {
    title: "The Valadation Method™ Sneak Peek",
    body:
      "A preview of the VALA identity framework—Valuable, Accepted, Loved, Approved—introduced as a bridge from external validation to embodied self-worth.",
  },
  {
    title: "Guided Nervous System Reset Practices",
    body:
      "Short calming audio and video practices for moments of overwhelm, emotional fatigue, and body tension.",
  },
  {
    title: "Somatic Body Awareness Exercises",
    body:
      "Simple practices that teach women how to notice tension, breath, sensation, and subtle body cues with more clarity.",
  },
  {
    title: "Monthly Reset Audio or Video",
    body:
      "A soft monthly ritual experience designed to help members reconnect with calm, confidence, and feminine presence.",
  },
  {
    title: "Private Community + Early Access",
    body:
      "A premium-entry space for women who want ongoing support, future program updates, and first access to deeper VALA offers.",
  },
];

const whoItsFor = [
  "Women in demanding careers",
  "Creators, performers, and entrepreneurs",
  "Women who feel wired, tense, numb, or emotionally overloaded",
  "Women rebuilding self-worth, softness, and trust in the body",
];

const methodCards = [
  {
    title: "Luxury Somatic Education",
    body:
      "Elegant guidance that helps women understand stress cues, body awareness, and nervous system regulation without heavy clinical language.",
  },
  {
    title: "Embodied Feminine Presence",
    body:
      "Practices designed to help members feel more grounded, receptive, confident, and connected to themselves.",
  },
  {
    title: "The VALA Method",
    body:
      "A four-part identity foundation that teaches women to feel Valuable, Accepted, Loved, and Approved in mind, body, and spirit.",
  },
  {
    title: "Private Houston Bodywork",
    body:
      "For local premium members, private sessions offer deeper support for decompression, regulation, and embodied restoration.",
  },
];

const appFeatures = [
  "Quick nervous system check-ins",
  "Simple supportive prompts",
  "Somatic reset suggestions",
  "A grounded bridge between stress and calm",
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--vala-sand)] text-[var(--vala-ink)]">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
        <header className="rounded-[36px] border border-[var(--vala-line)] bg-[var(--vala-cream)] p-3 text-center text-sm tracking-wide text-[var(--vala-mauve)] shadow-sm">
          Brock John • VALA Somatic Reset • Luxury nervous system support for
          women
        </header>

        <section className="grid gap-8 py-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-start">
          <div className="rounded-[40px] bg-[var(--vala-cream)] p-8 shadow-sm ring-1 ring-[var(--vala-line)] sm:p-10">
            <span className="mb-5 inline-flex rounded-full bg-[var(--vala-soft)] px-4 py-2 text-sm font-medium text-[var(--vala-mauve)]">
              VALA Somatic Membership
            </span>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Luxury nervous system support for women ready to feel calm,
              confident, and VALA.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--vala-body)]">
              A refined digital membership that blends somatic education,
              feminine self-connection, and the VALA identity philosophy for
              women navigating pressure, performance, and emotional overload.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#membership"
                className="rounded-full bg-[var(--vala-burgundy)] px-6 py-3 font-medium text-white transition hover:opacity-90"
              >
                Join Early Access
              </a>
              <a
                href="#guide"
                className="rounded-full border border-[var(--vala-mauve)] px-6 py-3 font-medium text-[var(--vala-deep)] transition hover:bg-[#f2e4dc]"
              >
                Download Free Guide
              </a>
            </div>

            <p className="mt-5 text-sm text-[var(--vala-muted)]">
              Educational wellness content • Not medical advice • Feminine
              luxury, calm presence, and somatic reconnection
            </p>
          </div>

          <aside className="rounded-[40px] bg-[#f5e5de] p-6 shadow-sm ring-1 ring-[var(--vala-line)]">
            <div className="rounded-[30px] bg-white/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--vala-mauve)]">
                Why this exists
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-[var(--vala-deep)]">
                Your body is not broken.
              </h2>
              <p className="mt-4 leading-7 text-[var(--vala-body)]">
                When women stay in stress mode too long, the body can feel
                wired, tense, emotionally flooded, numb, or distant. VALA
                Somatic reframes these patterns as signals asking for presence,
                awareness, and regulation.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {[
                  "Sleep + recovery support",
                  "Muscle tension relief",
                  "Emotional resilience",
                  "Body awareness",
                  "Calm presence",
                  "Post-shift decompression",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-[#eaded7] px-4 py-3 text-[#533d39]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
          <div className="rounded-[34px] bg-[var(--vala-cream)] p-8 shadow-sm ring-1 ring-[var(--vala-line)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--vala-mauve)]">
              The problem
            </p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight">
              Why so many women feel stuck in survival mode
            </h3>
            <p className="mt-5 max-w-3xl leading-8 text-[var(--vala-body)]">
              Long work hours, emotional pressure, creative performance,
              caregiving roles, and the constant demand to stay composed can
              keep the body in an extended stress response. Over time, this can
              show up as chronic tension, poor sleep, numbness, fatigue, or a
              loss of connection with sensation and self-trust.
            </p>
          </div>

          <div className="rounded-[34px] bg-[var(--vala-burgundy)] p-8 text-[#fff8f5] shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f2c9c1]">
              Key reframe
            </p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight">
              Disconnection is often the nervous system adapting to overload.
            </h3>
            <p className="mt-5 leading-8 text-[#f5ddd8]">
              The goal is not force. The goal is a gentler return to safety,
              sensation, softness, and embodied confidence.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-[38px] bg-[var(--vala-cream)] p-8 shadow-sm ring-1 ring-[var(--vala-line)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--vala-mauve)]">
            Who this is for
          </p>
          <h3 className="mt-3 text-3xl font-semibold leading-tight">
            Designed for women carrying high levels of pressure and emotional
            labor
          </h3>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {whoItsFor.map((item) => (
              <div
                key={item}
                className="rounded-full bg-[#eaded7] px-5 py-4 text-[#4f3c39] shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--vala-mauve)]">
            The method
          </p>
          <h3 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">
            A feminine, luxury-centered approach to somatic reconnection and
            embodied self-worth
          </h3>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {methodCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[28px] bg-[var(--vala-cream)] p-7 shadow-sm ring-1 ring-[var(--vala-line)]"
              >
                <h4 className="text-2xl font-semibold">{card.title}</h4>
                <p className="mt-4 leading-8 text-[var(--vala-body)]">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="guide"
          className="grid gap-6 lg:grid-cols-[1.05fr_0.75fr]"
        >
          <div className="rounded-[38px] bg-[var(--vala-cream)] p-8 shadow-sm ring-1 ring-[var(--vala-line)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--vala-mauve)]">
              Free resource
            </p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight">
              The VALA Somatic Reset Guide
            </h3>
            <p className="mt-5 leading-8 text-[var(--vala-body)]">
              A soft educational guide that introduces the foundation of VALA,
              explains why the nervous system matters, and offers a simple
              body-based practice women can begin using right away.
            </p>

            <ul className="mt-6 space-y-3 text-[#4e3a37]">
              <li>• Why chronic stress keeps the body in survival mode</li>
              <li>• How body awareness rebuilds connection and self-trust</li>
              <li>• The VALA foundation: Valuable, Accepted, Loved, Approved</li>
              <li>• A simple somatic reset practice to begin today</li>
            </ul>

            <a
              href="#"
              className="mt-8 inline-flex rounded-full bg-[var(--vala-burgundy)] px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              Download the Guide
            </a>
          </div>

          <div className="rounded-[38px] bg-[#f5e5de] p-6 shadow-sm ring-1 ring-[var(--vala-line)]">
            <div className="rounded-[28px] bg-[var(--vala-sand)] p-7">
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-[var(--vala-mauve)]">
                Try this 60-second practice
              </p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight">
                Body awareness reset
              </h3>
              <ol className="mt-5 space-y-3 leading-8 text-[#5b4642]">
                <li>1. Sit comfortably and close your eyes.</li>
                <li>2. Take three slow breaths.</li>
                <li>3. Notice where your body feels tight.</li>
                <li>4. Observe the sensation without trying to change it.</li>
              </ol>
              <p className="mt-5 text-sm leading-7 text-[#735b57]">
                The goal is awareness, not force. Regulation begins when the
                body can finally be listened to.
              </p>
            </div>
          </div>
        </section>

        <section
          id="membership"
          className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.82fr]"
        >
          <div className="rounded-[38px] bg-[var(--vala-cream)] p-8 shadow-sm ring-1 ring-[var(--vala-line)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--vala-mauve)]">
              Membership
            </p>
            <h3 className="mt-3 text-4xl font-semibold leading-tight">
              VALA Somatic Membership
            </h3>
            <p className="mt-5 max-w-2xl leading-8 text-[var(--vala-body)]">
              A private educational membership for women learning how to
              reconnect with their body, soften stress responses, and embody the
              VALA state with more calm, beauty, and confidence.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {includes.map((item) => (
                <details
                  key={item.title}
                  className="group rounded-[24px] bg-[var(--vala-sand)] p-5 shadow-sm transition open:bg-[#ead4ca]"
                >
                  <summary className="cursor-pointer list-none text-lg font-semibold text-[#36211f]">
                    <div className="flex items-start justify-between gap-4">
                      <span>{item.title}</span>
                      <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[var(--vala-mauve)]">
                        Tap to explore
                      </span>
                    </div>
                  </summary>
                  <p className="mt-4 leading-8 text-[var(--vala-body)]">
                    {item.body}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-8 rounded-[26px] border border-[#d2a989] bg-[#f6ede7] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--vala-mauve)]">
                    Early access
                  </p>
                  <p className="mt-2 text-lg text-[var(--vala-body)]">
                    Join now for founding-member access, waitlist priority, and
                    first-release content.
                  </p>
                </div>
                <div className="rounded-full bg-[var(--vala-gold)] px-5 py-2 text-base font-semibold text-white">
                  $39 / month
                </div>
              </div>
              <a
                href="#"
                className="mt-5 inline-flex rounded-full bg-[var(--vala-navy)] px-6 py-3 font-medium text-white transition hover:opacity-90"
              >
                Join Early Access
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[38px] bg-[var(--vala-navy)] p-8 text-white shadow-sm sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#cfc4ff]">
                Brock Somatic Check-In App
              </p>
              <h3 className="mt-3 text-4xl font-semibold leading-tight">
                A daily bridge between stress and support
              </h3>
              <p className="mt-5 leading-8 text-[#efe8ff]">
                Add the app benefit before the Valadation Method section so
                members first see the practical daily support layer—then the
                deeper identity transformation layer.
              </p>

              <div className="mt-6 rounded-[26px] bg-white/10 p-6">
                <h4 className="text-2xl font-semibold">Inside the app</h4>
                <ul className="mt-4 space-y-3 text-[#efe8ff]">
                  {appFeatures.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <a
                  href="https://somatic-nurse-app.vercel.app/"
                  className="mt-6 inline-flex rounded-full bg-white px-5 py-3 font-medium text-[var(--vala-navy)]"
                >
                  Explore App Benefit
                </a>
              </div>
            </div>

            <div className="rounded-[38px] bg-[#f5e5de] p-8 shadow-sm ring-1 ring-[var(--vala-line)] sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--vala-mauve)]">
                Sneak peek
              </p>
              <h3 className="mt-3 text-4xl font-semibold leading-tight text-[var(--vala-deep)]">
                The Valadation Method™
              </h3>
              <p className="mt-5 leading-8 text-[var(--vala-body)]">
                A somatic, hypnotic, and identity-based practice that teaches
                women how to feel Valuable, Accepted, Loved, and Approved—not
                only as affirmations, but as embodied experiences.
              </p>
              <a
                href="https://valadation-method.vercel.app/"
                className="mt-6 inline-flex rounded-full border border-[var(--vala-mauve)] px-5 py-3 font-medium text-[var(--vala-deep)]"
              >
                Visit Valadation Method
              </a>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[40px] bg-[var(--vala-cream)] p-10 text-center shadow-sm ring-1 ring-[var(--vala-line)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--vala-mauve)]">
            Final invitation
          </p>
          <h3 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">
            Begin the next step toward calm, confidence, softness, and embodied
            self-worth.
          </h3>
          <p className="mx-auto mt-6 max-w-3xl leading-8 text-[var(--vala-body)]">
            Start with the free guide, explore the app benefit, and join early
            access to the VALA Somatic Membership.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#guide"
              className="rounded-full bg-[var(--vala-burgundy)] px-6 py-3 font-medium text-white"
            >
              Get the Free Guide
            </a>
            <a
              href="#membership"
              className="rounded-full border border-[var(--vala-deep)] px-6 py-3 font-medium text-[var(--vala-deep)]"
            >
              Join Early Access
            </a>
          </div>
          <p className="mt-6 text-sm text-[var(--vala-muted)]">
            Brock John • VALA Somatic Reset • Houston, Texas • Educational
            wellness experience
          </p>
        </section>
      </div>
    </main>
  );
}
