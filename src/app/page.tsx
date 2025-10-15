"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
    MapPinIcon,
    BuildingIcon,
    CalendarIcon,
    LinkIcon,
    TriangleIcon,
    XIcon,
    LinkedinIcon,
} from "@/components/ui/icons";
import { Toaster, toast } from "sonner";

const agendaItems = [
    "The full Next.js Conf 2025 Livestream, direct from San Francisco.",
    "High-energy networking with the best in our tech community.",
    "Fun quizzes with official Next.js swag to be won",
];

const communityPartners = [
    {
        name: "AIESEC Sri Lanka",
        src: "/assets/partners/AIESEC - Next.js Conf_Community Partners.svg",
    },
    {
        name: "Rotaract",
        src: "/assets/partners/Rotaract - Next.js Conf_Community Partners.svg",
    },
    {
        name: "GenALPHA",
        src: "/assets/partners/GenALPHA - Next.js Conf_Community Partners.svg",
    },
    {
        name: "STEMLink",
        src: "/assets/partners/STEMLink - Next.js Conf_Community Partners.svg",
    },
    {
        name: "Young Founders Network",
        src: "/assets/partners/YFN - Next.js Conf_Community Partners.svg",
    },
    {
        name: "TechTalk360",
        src: "/assets/partners/TechTalk360 - Next.js Conf_Community Partners.svg",
    },
    {
        name: "Hackathons.lk",
        src: "/assets/partners/HackAthons.lk - Next.js Conf_Community Partners.svg",
    },
    {
        name: "CodeChefs",
        src: "/assets/partners/Codechefs - Next.js Conf_Community Partners.svg",
    },
    {
        name: "Creators",
        src: "/assets/partners/Creators - Next.js Conf_Community Partners.svg",
    },
    {
        name: "Hatch",
        src: "/assets/partners/Hatch - Next.js Conf_Community Partners.svg",
    },
];

const faqs = [
    {
        question: 'What exactly is a "Watch Party"?',
        answer: "It's a community-first event where we'll watch the live-streamed keynotes from San Francisco together on a big screen. It's a chance for live reactions, discussions, and high-energy networking with fellow enthusiasts.",
    },
    {
        question: "Why should I attend instead of just watching the stream at home?",
        answer: "This is more than just a livestream. It's an opportunity to network with the best in Sri Lanka's tech scene, feel the collective energy of the community, and be part of the official launch of the 'Sri Lankan Next.js Community'.",
    },
    {
        question: "Will there be food and drinks?",
        answer: "Yes, food and beverages will be provided to keep you energized throughout the event.",
    },
    {
        question: "What kind of prizes can I win?",
        answer: "Thanks to our partnership with the global Next.js and Vercel team, you'll have the chance to win exclusive, Official Next.js and Vercel merchandise.",
    },
    {
        question: "Who is this event for?",
        answer: "This event is for the entire Next.js and developer community: from passionate students and developers to tech leads, startup CTOs, and founders. If you love building on the web, this is for you.",
    },
];

export default function HomePage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex((current) => (current === index ? null : index));
    };

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);

        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    const partnerLoop = [...communityPartners, ...communityPartners];

    useEffect(() => {
        toast("Only 100 Early bird 🚀 Tickets available!", {
            duration: Infinity,
            action: {
                label: "Get tickets",
                onClick: () => window.open("https://luma.com/2kqylm3u?from=embed", "_blank"),
            },
        });
    }, []);

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
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/20"
                                    aria-label="Copy registration link"
                                >
                                    <LinkIcon className="h-5 w-5 text-white" />
                                </button>
                                <a
                                    href="https://vercel.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/20"
                                    aria-label="Visit Vercel"
                                >
                                    <TriangleIcon className="h-5 w-5 text-white" />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setIsSubmitted(false)}
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/20"
                                    aria-label="Close confirmation"
                                >
                                    <XIcon className="h-5 w-5 text-white" />
                                </button>
                                <a
                                    href="https://www.linkedin.com/company/vercel/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/20"
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
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/assets/Next.js Conf \\'25 - Cover.webp')",
                            backgroundAttachment: "fixed",
                            opacity: 0.4,
                        }}
                    ></div>

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

                <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                        <section className="p-4 lg:col-span-7">
                            <p className="text-sm leading-relaxed text-neutral-400">
                                Wednesday, Oct 22, 2025 | 7:00 PM - 4.00 AM SL Time
                            </p>

                            <div className="mt-3 flex justify-start motion-safe:animate-[hero-slide-in_0.75s_ease-out]">
                                <Image
                                    src="/assets/Next.js Conf - Hero Title.svg"
                                    alt="Next.js Conf 2025 Colombo Watch Party"
                                    width={600}
                                    height={150}
                                    className="h-auto w-full max-w-xl bg-transparent select-none"
                                    priority
                                    unoptimized
                                    draggable={false}
                                />
                            </div>

                            <p className="text-md mt-4 font-semibold text-white">
                                Join us in Colombo to hear the latest on Next.js
                            </p>

                            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-400">
                                We&apos;re proud to put Sri Lanka on the global map as the 3rd
                                Official Watch Party, right alongside London and Berlin for Next.js
                                Conf 2025.
                            </p>

                            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-400">
                                Join us to celebrate the Next.js/Vercel ecosystem and connect with
                                the best in our community. Let&apos;s show the world the passion of
                                Sri Lankan builders!
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
                                            Wednesday, Oct 22, 2025 | 7:00 PM - 4.00 AM SL Time
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                id="agenda"
                                className="mt-10 rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm"
                            >
                                <h3 className="text-lg font-semibold tracking-tight text-white">
                                    What to expect
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
                                    Register to access the detailed agenda!
                                </p>
                                <div className="mt-4">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                                    >
                                        <a
                                            href="https://luma.com/2kqylm3u?from=embed"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Register
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-10 rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
                                <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                                    <h3 className="text-lg font-semibold tracking-tight text-white">
                                        Community Partners
                                    </h3>
                                    <p className="mt-2 text-sm text-neutral-400 sm:mt-0">
                                        Our very own ambassadors of real-impact
                                    </p>
                                </div>
                                <div className="relative mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/30">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black via-black/80 to-transparent sm:w-16 md:w-24"></div>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black via-black/80 to-transparent sm:w-16 md:w-24"></div>
                                    <div className="flex min-w-max animate-[partners-scroll_24s_linear_infinite] items-center gap-1 px-4 py-6">
                                        {partnerLoop.map((partner, index) => (
                                            <div
                                                key={`${partner.name}-${index}`}
                                                className="flex w-[160px] flex-shrink-0 items-center justify-center"
                                            >
                                                <Image
                                                    src={partner.src}
                                                    alt={partner.name}
                                                    width={200}
                                                    height={100}
                                                    className="h-14 w-auto"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div
                                id="faq"
                                className="mt-10 rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm"
                            >
                                <h3 className="text-lg font-semibold tracking-tight text-white">
                                    Frequently Asked Questions
                                </h3>
                                <div className="mt-4 space-y-4">
                                    {faqs.map((faq, index) => {
                                        const isOpen = openFaqIndex === index;
                                        return (
                                            <div
                                                key={faq.question}
                                                className="rounded-lg border border-white/10 bg-black/30"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => toggleFaq(index)}
                                                    aria-expanded={isOpen}
                                                    className="flex min-h-14 w-full items-start justify-between gap-4 px-4 py-3 text-left transition hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/20"
                                                >
                                                    <span className="min-w-0 flex-1 text-base font-medium text-white">
                                                        {faq.question}
                                                    </span>
                                                    <span
                                                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-sm text-neutral-200 transition-transform ${
                                                            isOpen ? "rotate-45" : ""
                                                        }`}
                                                        aria-hidden="true"
                                                    >
                                                        +
                                                    </span>
                                                </button>
                                                <div
                                                    className={`overflow-hidden px-4 pb-4 text-sm text-neutral-300 transition-[max-height,opacity] duration-300 ease-in-out ${
                                                        isOpen
                                                            ? "max-h-96 opacity-100"
                                                            : "max-h-0 opacity-0"
                                                    }`}
                                                    aria-hidden={!isOpen}
                                                >
                                                    <p className="mt-2 whitespace-pre-line">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-10 rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
                                {/* Row layout by default so avatar sits left on mobile; on desktop, move avatar to the right */}
                                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    {/* Avatar centered on mobile */}
                                    <div className="flex-shrink-0 sm:order-2 sm:ml-auto">
                                        <Image
                                            src="/assets/tg-cover-nextjslk.jpeg"
                                            alt="Next.js Sri Lanka Telegram Community"
                                            width={96}
                                            height={96}
                                            className="rounded-full ring-1 ring-white/10"
                                        />
                                    </div>

                                    {/* Text and button */}
                                    <div className="text-center sm:order-1 sm:text-left">
                                        <h3 className="text-lg font-semibold tracking-tight text-white">
                                            Join our Telegram Community
                                        </h3>
                                        <p className="mt-2 text-sm text-neutral-400">
                                            This is the Official Sri Lankan Next.js community linked
                                            with the global Next.js/Vercel team
                                        </p>
                                        <div className="mt-4">
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                                            >
                                                <a
                                                    href="https://t.me/NextjsLK"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Join Telegram
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
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
            <Toaster
                position={isMobile ? "bottom-center" : "top-center"}
                theme="dark"
                toastOptions={{
                    style: {
                        maxWidth: "700px",
                        fontSize: "14px",
                        backdropFilter: "blur(10px)",
                        background: "rgba(0, 0, 0, 0.5)",
                    },
                    closeButton: true,
                }}
            />
        </div>
    );
}
