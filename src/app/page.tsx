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
                {/* BACKGROUND LAYERS */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {/* Soft radial glows (accent) */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(60% 50% at 50% 0%, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.05) 35%, transparent 60%), radial-gradient(40% 35% at 85% 65%, rgba(16,185,129,0.12) 0%, transparent 60%), radial-gradient(50% 40% at 15% 70%, rgba(14,165,233,0.12) 0%, transparent 60%)",
                        }}
                    ></div>

                    {/* Grid + dots layer with responsive spacing */}
                    <div
                        className="absolute inset-0"
                        style={
                            {
                                backgroundImage:
                                    "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
                                backgroundSize:
                                    "calc(clamp(36px, 6vw, 64px) / 2) calc(clamp(36px, 6vw, 64px) / 2), clamp(36px, 6vw, 64px) clamp(36px, 6vw, 64px), clamp(36px, 6vw, 64px) clamp(36px, 6vw, 64px)",
                                backgroundPosition: "center",
                                maskImage:
                                    "radial-gradient(80% 70% at 50% 35%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0) 100%)",
                                WebkitMaskImage:
                                    "radial-gradient(80% 70% at 50% 35%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0) 100%)",
                            } as React.CSSProperties
                        }
                    ></div>

                    {/* Vignette and subtle borders */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(120% 90% at 50% 50%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.35) 100%)",
                        }}
                    ></div>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>

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
                                <div className="rounded-xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                                        <MapPinIcon className="h-4 w-4" />
                                        <span>Where:</span>
                                    </div>
                                    <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm">
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

                                <div className="rounded-xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>When:</span>
                                    </div>
                                    <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm">
                                        <p className="text-base text-white">
                                            Wednesday, Oct 22, 2025 at 8:30 PM Sri Lanka Time
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
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
                            <div className="sticky top-6 rounded-xl border border-white/10 bg-black/10 backdrop-blur-sm">
                                <iframe
                                    src="https://luma.com/embed/event/evt-F6SfVJFaWxVpx9H/simple"
                                    width="100%"
                                    height="900"
                                    frameBorder="0"
                                    style={{
                                        border: "1px solid #bfcbda88",
                                        borderRadius: "12px",
                                    }}
                                    allow="fullscreen; payment"
                                    aria-hidden="false"
                                    tabIndex={0}
                                    className="w-full"
                                ></iframe>
                            </div>
                        </aside>
                    </div>
                </div>

                <Footer />
            </main>
        </div>
    );
}
