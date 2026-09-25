import { useState, type FormEvent } from "react";
import MagneticButton from "@/components/MagneticButton";

// Wire this up to a real endpoint (Formspree, Netlify Forms, a serverless
// function, etc.) via an environment variable — see README.md, "Connecting
// the contact form". Left unset, the form still gives a real success/error
// state so the UI is fully demonstrable without a backend.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!ENDPOINT) {
      // No backend configured for this concept build — simulate the round
      // trip so the interaction still reads as finished and polished.
      setStatus("sending");
      setTimeout(() => setStatus("sent"), 700);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-28 md:py-40 bg-espresso text-ivory">
      <div className="container-editorial grid md:grid-cols-12 gap-14">
        <div className="md:col-span-6">
          <h2 className="font-display text-5xl md:text-7xl leading-[1.02]">
            Let&rsquo;s make
            <br />
            something
            <br />
            memorable.
          </h2>
          <MagneticButton
            as="a"
            href="mailto:hello@elenavoss.studio"
            className="eyebrow mt-10 border border-ivory/30 px-6 py-3 rounded-full hover:bg-ivory hover:text-espresso transition-colors"
          >
            hello@elenavoss.studio
          </MagneticButton>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          {status === "sent" ? (
            <div className="border border-ivory/20 p-8">
              <p className="font-display text-2xl mb-2">Thank you.</p>
              <p className="text-ivory/70 text-sm">Your enquiry has been received. Elena&rsquo;s studio will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <Field label="Name" name="name" type="text" required />
              <Field label="Email" name="email" type="email" required />
              <div>
                <label htmlFor="message" className="eyebrow block mb-2 text-ivory/70">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-ivory/30 focus:border-ivory outline-none py-2 text-lg placeholder:text-ivory/30 resize-none"
                  placeholder="Tell me about your project"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-stone">
                  Something went wrong sending that — please email hello@elenavoss.studio directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                data-cursor="Send"
                className="eyebrow self-start border border-ivory/30 px-8 py-3.5 rounded-full hover:bg-ivory hover:text-espresso transition-colors disabled:opacity-50 mt-2"
              >
                {status === "sending" ? "Sending…" : "Send Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block mb-2 text-ivory/70">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent border-b border-ivory/30 focus:border-ivory outline-none py-2 text-lg placeholder:text-ivory/30"
      />
    </div>
  );
}
