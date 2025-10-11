"use client";

import { useState } from "react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
    MapPinIcon,
    BuildingIcon,
    CalendarIcon,
    LinkIcon,
    TriangleIcon,
    XIcon,
    LinkedinIcon,
} from "@/components/ui/icons";

const agendaItems = [
    "Registration & networking",
    "Next.js Conf keynote live stream",
    "evening snacks and refreshment",
];

export default function HomePage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (isSubmitted) {
        return (
            <div className="bg-black text-neutral-200">
                <main
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="registration-success-title"
                    aria-describedby="registration-success-description"
                    className="flex min-h-screen flex-col bg-black text-white"
                >
                    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-10 lg:px-8 lg:py-16">
                        <div className="flex flex-1 flex-col items-center justify-center text-center">
                            <h2
                                id="registration-success-title"
                                className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
                            >
                                Thanks for registering!
                            </h2>
                            <p
                                id="registration-success-description"
                                className="mt-6 max-w-xl text-base text-neutral-400 sm:text-lg"
                            >
                                Thanks for registering your interest in Next.js Conf Colombo Watch
                                Party. A member of our team will be in touch shortly to confirm your
                                place.
                            </p>

                            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 bg-neutral-950/60 px-5 py-3">
                                <button
                                    type="button"
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/20"
                                    aria-label="Copy registration link"
                                >
                                    <LinkIcon className="h-5 w-5 text-white" />
                                </button>
                                <a
                                    href="https://vercel.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/20"
                                    aria-label="Visit Vercel"
                                >
                                    <TriangleIcon className="h-5 w-5 text-white" />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setIsSubmitted(false)}
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/20"
                                    aria-label="Close confirmation"
                                >
                                    <XIcon className="h-5 w-5 text-white" />
                                </button>
                                <a
                                    href="https://www.linkedin.com/company/vercel/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/20"
                                    aria-label="Share on LinkedIn"
                                >
                                    <LinkedinIcon className="h-5 w-5 text-white" />
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-black text-neutral-200">
            <Header />

            <main className="relative min-h-screen">
                <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                        <section className="lg:col-span-7">
                            <p className="text-sm leading-relaxed text-neutral-400">
                                Wednesday, Oct 22, 2025 <span className="text-neutral-500">at</span>{" "}
                                <span className="text-neutral-300">8:30 PM Sri Lanka Time</span>
                            </p>

                            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Next.js Conf Colombo Watch Party
                            </h1>

                            <p className="mt-4 text-lg text-neutral-300">
                                Join us in Colombo to hear the latest on Next.js
                            </p>

                            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-400">
                                Next.js Conf 25 is here. Register your interest today for the chance
                                to join the local community of developers and leaders in Colombo for
                                an evening of cutting-edge insights, education, and networking as we
                                build a better web together.
                            </p>

                            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="rounded-xl border border-white/10 bg-neutral-950/60 p-4">
                                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                                        <MapPinIcon className="h-4 w-4" />
                                        <span>Where:</span>
                                    </div>
                                    <div className="mt-3 rounded-xl border border-white/10 bg-[#0a0a0a] p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-base font-medium text-white">
                                                    TBA
                                                </p>
                                                <p className="mt-1 text-sm text-neutral-400"></p>
                                            </div>
                                            <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
                                                <BuildingIcon className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-neutral-950/60 p-4">
                                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>When:</span>
                                    </div>
                                    <div className="mt-3 rounded-xl border border-white/10 bg-[#0a0a0a] p-4">
                                        <p className="text-base text-white">
                                            Wednesday, Oct 22, 2025 at 8:30 PM Sri Lanka Time
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 rounded-xl border border-white/10 bg-neutral-950/60 p-6">
                                <h3 className="text-lg font-semibold tracking-tight text-white">
                                    Agenda:
                                </h3>
                                <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                                    {agendaItems.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/70" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-5 text-sm text-neutral-400">
                                    Stay tuned as speakers are announced.
                                </p>
                            </div>
                        </section>

                        <aside className="lg:col-span-5">
                            <div className="sticky top-6 rounded-xl border border-white/10 bg-[#0a0a0a] p-6 lg:p-7">
                                <h2 className="text-xl font-semibold tracking-tight text-white">
                                    Register interest
                                </h2>

                                <div className="mt-6">
                                    <iframe
                                        src="https://luma.com/embed/event/evt-F6SfVJFaWxVpx9H/simple"
                                        width="100%"
                                        height="900"
                                        frameBorder="0"
                                        style={{
                                            border: "2px solid #bfcbda88",
                                            borderRadius: "4px",
                                        }}
                                        allow="fullscreen; payment"
                                        aria-hidden="false"
                                        tabIndex={0}
                                        className="w-full"
                                    ></iframe>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                <Footer />
            </main>
        </div>
    );
}
