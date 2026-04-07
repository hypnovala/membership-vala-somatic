import WaitlistForm from "../components/WaitlistForm";

const membershipBenefits = [
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
    title: "Monthly 1:1 Call with Brock",
    body:
      "A private monthly support call for premium members who want direct guidance, clearer next steps, and nervous system support tailored to real life.",
  },
  {
    title: "Private Houston Bodywork Access",
    body:
      "A premium local pathway for women who want deeper in-person support for decompression, regulation, and embodied restoration in Houston.",
  },
  {
    title: "Private Community + Early Access",
    body:
      "A private-entry space for women who want ongoing support, future program updates, and priority access to deeper VALA experiences.",
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
      "Reserved for women who want a higher-touch local layer of support alongside the VALA membership experience.",
  },
];

const introOfferExclusions = [
  "No monthly 1:1 call",
  "No Brock Somatic Check-In App",
  "No private Houston hybrid service",
];

const appFeatures = [
  "Quick nervous system check-ins",
  "Simple supportive prompts",
  "Somatic reset suggestions",
  "A grounded bridge between stress and calm",
];

const premiumFeatures = [
  "Monthly private 1:1 call with Brock",
  "Priority access to private Houston bodywork services",
  "Concierge-style support and higher-touch guidance",
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--vala-sand)] text-[var(--vala-ink)]">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
        <header className="rounded-[36px] border border-[var(--vala-line)] bg-[var(--vala-cream)] p-3 text-center text-sm tracking-wide text-[var(--vala-mauve)] shadow-sm">
          Brock John • VALA Somatic Reset • Luxury nervous system support for women
        </header>

        <section className="grid gap-8 py-10 lg:grid-cols-[1.2fr_0.85fr] lg:items-start">
          <div className="rounded-[40px] bg-[var(--vala-cream)] p-8 shadow-sm ring-1 ring-[var(--vala-line)] sm:p-10">
            <span className="mb-5 inline-flex rounded-full bg-[var(--vala-soft)] px-4 py-2 text-sm font-medium text-[var(--vala-mauve)]">
              VALA Somatic Membership
            </span>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Join the waitlist for calm, confidence, softness, and embodied support.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--vala-body)]">
              A refined membership experience that blends somatic education, feminine self-connection,
              and the VALA identity philosophy for women navigating pressure, performance, and emotional overload.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--vala-body)]">
              Start with the waitlist for launch updates, founding-member access, and the free Somatic Reset Guide.
            </p>

            <WaitlistForm buttonLabel="Join the Waitlist" source="hero" />

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#pricing"
                className="rounded-full border border-[var(--vala-mauve)] px-6 py-3 font-medium text-[var(--vala-deep)] transition hover:bg-[#f2e4dc]"
              >
                View Membership Options
              </a>
            </div>

            <p className="mt-5 text-sm text-[var(--vala-muted)]">
              Educational wellness content • Not medical advice • Feminine luxury, calm presence, and somatic reconnection
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
                When women stay in stress mode too long, the body can feel wired, tense, emotionally flooded, numb, or distant. VALA Somatic reframes these patterns as signals asking for presence, awareness, and regulation.
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

              <div className="mt-6 rounded-[24px] bg-white/70 p-3 ring-1 ring-[#e1c3b8]">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#9a6d65]">
                  Intro video
                </p>
                <video
                  autoPlay
                  controls
                  muted
                  playsInline
                  preload="none"
                  className="w-full rounded-[18px] bg-[#eaded7]"
                >
                  <source
                    src="https://hypnoticdreamtv.com/wp-content/uploads/2026/04/VALA_Intro0406_01.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
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
              Long work hours, emotional pressure, creative performance, caregiving roles, and the constant demand to stay composed can keep the body in an extended stress response. Over time, this can show up as chronic tension, poor sleep, numbness, fatigue, or a loss of connection with sensation and self-trust.
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
              The goal is not force. The goal is a gentler return to safety, sensation, softness, and embodied confidence.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-[38px] bg-[var(--vala-cream)] p-8 shadow-sm ring-1 ring-[var(--vala-line)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--vala-mauve)]">
            Who this is for
          </p>
          <h3 className="mt-3 text-3xl font-semibold leading-tight">
            Designed for women carrying high levels of pressure and emotional labor
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
            A feminine, luxury-centered approach to somatic reconnection and embodied self-worth
          </h3>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {methodCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[28px] bg-[var(--vala-cream)] p-7 shadow-sm ring-1 ring-[var(--vala-line)]"
              >
                <h4 className="text-2xl font-semibold">{card.title}</h4>
                <p className="mt-4 leading-8 text-[var(--vala-body)]">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="guide" className="grid gap-6 lg:grid-cols-[1.05fr_0.75fr]">
          <div className="rounded-[38px] bg-[var(--vala-cream)] p-8 shadow-sm ring-1 ring-[var(--vala-line)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--vala-mauve)]">
              Free resource
            </p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight">
              The VALA Somatic Reset Guide
            </h3>
            <p className="mt-5 leading-8 text-[var(--vala-body)]">
              A soft educational guide that introduces the foundation of VALA, explains why the nervous system matters, and offers a simple body-based practice women can begin using right away.
            </p>

            <ul className="mt-6 space-y-3 text-[#4e3a37]">
              <li>• Why chronic stress keeps the body in survival mode</li>
              <li>• How body awareness rebuilds connection and self-trust</li>
              <li>• The VALA foundation: Valuable, Accepted, Loved, Approved</li>
              <li>• A simple somatic reset practice to begin today</li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://valabody.com/free-reset-guide"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-[var(--vala-burgundy)] px-6 py-3 font-medium text-white transition hover:opacity-90"
              >
                Get the Free Guide
              </a>
              <p className="text-sm text-[var(--vala-muted)]">
                Instant access. No email required.
              </p>
            </div>
          </div>

          <div className="rounded-[38px] bg-[#f5e5de] p-6 shadow-sm ring-1 ring-[#e1c3b8]">
            <div className="rounded-[28px] bg-[#efe2d6] p-7">
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#9a6d65]">
                Try this 60-second practice
              </p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight">Body awareness reset</h3>
              <ol className="mt-5 space-y-3 leading-8 text-[#5b4642]">
                <li>1. Sit comfortably and close your eyes.</li>
                <li>2. Take three slow breaths.</li>
                <li>3. Notice where your body feels tight.</li>
                <li>4. Observe the sensation without trying to change it.</li>
              </ol>
              <p className="mt-5 text-sm leading-7 text-[#735b57]">
                The goal is awareness, not force. Regulation begins when the body can finally be listened to.
              </p>
            </div>
          </div>
        </section>

        <section id="pricing" className="mt-12 rounded-[38px] bg-[#f8efea] p-8 shadow-sm ring-1 ring-[#e8d0c5] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a6d65]">
            Membership options
          </p>
          <h3 className="mt-3 text-4xl font-semibold leading-tight">Choose your way into VALA</h3>
          <p className="mt-4 max-w-3xl leading-8 text-[#5a4744]">
            This is not just content. These are tools your body can use the same day you feel overwhelmed.
          </p>

          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            <div className="rounded-[28px] border border-[#e1c3b8] bg-white p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a6d65]">Start here</p>
              <h4 className="mt-3 text-2xl font-semibold text-[#311d1b]">$7 Intro Offer</h4>
              <p className="mt-3 leading-7 text-[#5a4744]">
                A light entry point for women who want to experience the tone and foundation of VALA before stepping into the full membership.
              </p>
              <ul className="mt-5 space-y-3 text-[#5a4744]">
                <li>• Introductory somatic reset content</li>
                <li>• Gentle educational entry into VALA</li>
                <li>• Soft low-risk first step</li>
              </ul>
              <div className="mt-5 rounded-[22px] bg-[#f8efea] p-4">
                <p className="text-sm font-semibold text-[#442c29]">Not included</p>
                <ul className="mt-3 space-y-2 text-sm text-[#735b57]">
                  {introOfferExclusions.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <a
                href="#final-waitlist"
                className="mt-6 inline-flex rounded-full bg-[var(--vala-burgundy)] px-5 py-3 font-medium text-white transition hover:opacity-90"
              >
                Join Intro Waitlist
              </a>
            </div>

            <div className="rounded-[28px] border border-[#d9b7ab] bg-[#f5e5de] p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a6d65]">Core membership</p>
              <h4 className="mt-3 text-2xl font-semibold text-[#311d1b]">$39 / month</h4>
              <p className="mt-3 leading-7 text-[#5a4744]">
                The main VALA membership for women who want recurring support, guided practices, and a deeper rhythm of somatic reconnection.
              </p>
              <ul className="mt-5 space-y-3 text-[#5a4744]">
                <li>• Guided nervous system reset practices</li>
                <li>• Somatic body awareness exercises</li>
                <li>• Monthly reset audio or video</li>
                <li>• Private community + early access</li>
                <li>• Brock Somatic Check-In App</li>
              </ul>
              <a
                href="#final-waitlist"
                className="mt-6 inline-flex rounded-full bg-[var(--vala-navy)] px-5 py-3 font-medium text-white transition hover:opacity-90"
              >
                Join Founding Waitlist
              </a>
            </div>

            <div className="rounded-[28px] border border-[#d2a989] bg-[#25154c] p-7 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#cfc4ff]">Premium access</p>
              <h4 className="mt-3 text-2xl font-semibold">Private with Brock</h4>
              <p className="mt-3 leading-7 text-[#efe8ff]">
                A premium layer for women who want direct support, a monthly 1:1 call, and access to private Houston bodywork services.
              </p>
              <ul className="mt-5 space-y-3 text-[#efe8ff]">
                {premiumFeatures.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="mt-5 rounded-[22px] bg-white/10 p-4 text-sm text-[#efe8ff]">
                Limited availability. Premium support is intentionally kept small.
              </div>
              <a
                href="#final-waitlist"
                className="mt-6 inline-flex rounded-full bg-white px-5 py-3 font-medium text-[var(--vala-navy)] transition hover:opacity-90"
              >
                Request Premium Access
              </a>
            </div>
          </div>
        </section>

        <section id="membership" className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.82fr]">
          <div className="rounded-[38px] bg-[#f8efea] p-8 shadow-sm ring-1 ring-[#e8d0c5] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a6d65]">Inside VALA</p>
            <h3 className="mt-3 text-4xl font-semibold leading-tight">What members receive</h3>
            <p className="mt-5 max-w-2xl leading-8 text-[#5a4744]">
              A private educational membership for women learning how to reconnect with their body, soften stress responses, and embody the VALA state with more calm, beauty, and confidence.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {membershipBenefits.map((item) => (
                <details
                  key={item.title}
                  className="group rounded-[24px] bg-[#efe2d6] p-5 shadow-sm transition open:bg-[#ead4ca]"
                >
                  <summary className="cursor-pointer list-none text-lg font-semibold text-[#36211f] marker:hidden">
                    <div className="flex items-start justify-between gap-4">
                      <span>{item.title}</span>
                      <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[#7a4b45]">
                        Tap to explore
                      </span>
                    </div>
                  </summary>
                  <p className="mt-4 leading-8 text-[#5a4744]">{item.body}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[38px] bg-[#25154c] p-8 text-white shadow-sm sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#cfc4ff]">
                Brock Somatic Check-In App
              </p>
              <h3 className="mt-3 text-4xl font-semibold leading-tight">A daily bridge between stress and support</h3>
              <p className="mt-5 leading-8 text-[#efe8ff]">
                The app gives core members a practical daily support layer before moving into the deeper identity work and premium support pathways.
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

            <div className="rounded-[38px] bg-[#f5e5de] p-8 shadow-sm ring-1 ring-[#e1c3b8] sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a6d65]">
                Premium pathway
              </p>
              <h3 className="mt-3 text-4xl font-semibold leading-tight text-[#311d1b]">
                1:1 with Brock + Private Houston Bodywork
              </h3>
              <p className="mt-5 leading-8 text-[#5a4744]">
                For women who want a more private, higher-touch experience, premium access adds a monthly 1:1 call with Brock and a pathway into limited private Houston bodywork services.
              </p>
              <div className="mt-6 rounded-[24px] border border-[#d2a989] bg-[#f6ede7] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a6d65]">Members only</p>
                <p className="mt-2 leading-7 text-[#5a4744]">
                  This is positioned as reserved access, not a public commodity service. Availability stays limited by design.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="final-waitlist" className="mt-12 rounded-[40px] bg-[var(--vala-cream)] p-10 text-center shadow-sm ring-1 ring-[var(--vala-line)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--vala-mauve)]">
            Final invitation
          </p>
          <h3 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">
            Begin the next step toward calm, confidence, softness, and embodied self-worth.
          </h3>
          <p className="mx-auto mt-6 max-w-3xl leading-8 text-[var(--vala-body)]">
            Join the waitlist to get founding-member updates, launch access, and first notice when the $7 intro offer and premium pathway open.
          </p>
          <div className="mx-auto mt-8 max-w-3xl text-left">
            <WaitlistForm buttonLabel="Join the Waitlist" source="final-cta" />
          </div>
          <p className="mt-6 text-sm text-[var(--vala-muted)]">
            Brock John • VALA Somatic Reset • Houston, Texas • Educational wellness experience
          </p>
        </section>
      </div>
    </main>
  );
}
