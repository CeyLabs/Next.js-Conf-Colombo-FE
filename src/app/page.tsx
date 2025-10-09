"use client";

import {
    FormEvent,
    MutableRefObject,
    SVGProps,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { cn } from "@/lib/cn";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const agendaItems = [
    "Registration & networking",
    "Customer success stories",
    "Dig deeper – Hands on with Next.js",
    "Next.js Conf keynote live stream",
    "Drinks reception & hors d'oeuvres",
];

const countries = [
    "Sri Lanka",
    "India",
    "Bangladesh",
    "Pakistan",
    "Singapore",
    "United Kingdom",
    "United States",
    "Other",
];

const countryMenuStyles =
    "absolute z-10 mt-2 w-full rounded-xl border border-white/10 bg-neutral-950 shadow-xl";

export default function HomePage() {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const countryMenuRef = useRef<HTMLDivElement>(null);
    const countryButtonRef = useRef<HTMLButtonElement>(null);
    const statusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const websiteRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (statusTimeoutRef.current) {
                clearTimeout(statusTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            if (!target) return;
            if (countryMenuRef.current?.contains(target)) return;
            if (countryButtonRef.current?.contains(target)) return;
            setIsCountryMenuOpen(false);
        }

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatusMessage("Thanks! We’ve received your interest.");
        if (statusTimeoutRef.current) {
            clearTimeout(statusTimeoutRef.current);
        }
        statusTimeoutRef.current = setTimeout(() => {
            setStatusMessage(null);
        }, 4000);
    }, []);

    const countryLabel = selectedCountry ?? "Select your country";

    return (
        <div className="bg-black text-neutral-200">
            <Header />

            <main className="relative">
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
                                <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-4">
                                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                                        <MapPinIcon className="h-4 w-4" />
                                        <span>Where:</span>
                                    </div>
                                    <div className="mt-3 rounded-xl border border-white/10 bg-black/40 p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-base font-medium text-white">
                                                    Shangri-La Colombo
                                                </p>
                                                <p className="mt-1 text-sm text-neutral-400">
                                                    1 Galle Face, Colombo 2, Sri Lanka
                                                </p>
                                            </div>
                                            <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
                                                <BuildingIcon className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-4">
                                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>When:</span>
                                    </div>
                                    <div className="mt-3 rounded-xl border border-white/10 bg-black/40 p-4">
                                        <p className="text-base text-white">
                                            Wednesday, Oct 22, 2025 at 8:30 PM Sri Lanka Time
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 rounded-2xl border border-white/10 bg-neutral-950/60 p-6">
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
                            <div className="sticky top-6 rounded-2xl border border-white/10 bg-neutral-950/60 p-6 lg:p-7">
                                <h2 className="text-xl font-semibold tracking-tight text-white">
                                    Register interest
                                </h2>

                                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm text-neutral-300"
                                        >
                                            Company email
                                        </label>
                                        <div className="relative">
                                            <MailIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                                            <input
                                                ref={emailRef}
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="janedoe@yourcompany.com"
                                                className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pr-3 pl-10 text-sm text-white placeholder:text-neutral-500 focus:border-white/20 focus:ring-2 focus:ring-white/20 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="mb-2 block text-sm text-neutral-300">
                                            Country
                                        </label>
                                        <input
                                            type="hidden"
                                            name="country"
                                            value={selectedCountry ?? ""}
                                        />
                                        <button
                                            type="button"
                                            ref={countryButtonRef}
                                            onClick={() => setIsCountryMenuOpen((state) => !state)}
                                            className="focus-ring inline-flex w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-sm text-neutral-300 hover:bg-white/5 focus:ring-2 focus:ring-white/20 focus:outline-none"
                                            aria-haspopup="listbox"
                                            aria-expanded={isCountryMenuOpen}
                                            aria-label="Select your country"
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                <GlobeIcon className="h-4 w-4 text-neutral-500" />
                                                <span
                                                    className={cn(
                                                        selectedCountry
                                                            ? "text-neutral-200"
                                                            : "text-neutral-500"
                                                    )}
                                                >
                                                    {countryLabel}
                                                </span>
                                            </span>
                                            <ChevronDownIcon
                                                className={cn(
                                                    "h-4 w-4 text-neutral-500 transition",
                                                    isCountryMenuOpen &&
                                                        "rotate-180 text-neutral-300"
                                                )}
                                            />
                                        </button>
                                        {isCountryMenuOpen ? (
                                            <div ref={countryMenuRef} className={countryMenuStyles}>
                                                <ul
                                                    role="listbox"
                                                    className="max-h-56 overflow-auto py-1"
                                                >
                                                    {countries.map((country) => (
                                                        <li key={country}>
                                                            <button
                                                                type="button"
                                                                className="w-full px-3 py-2 text-left text-sm text-neutral-200 hover:bg-white/5"
                                                                onClick={() => {
                                                                    setSelectedCountry(country);
                                                                    setIsCountryMenuOpen(false);
                                                                }}
                                                            >
                                                                {country}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : null}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm text-neutral-300"
                                        >
                                            Full name
                                        </label>
                                        <div className="relative">
                                            <UserIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                                            <input
                                                ref={nameRef}
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                placeholder="Jane Doe"
                                                className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pr-3 pl-10 text-sm text-white placeholder:text-neutral-500 focus:border-white/20 focus:ring-2 focus:ring-white/20 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="website"
                                                className="mb-2 block text-sm text-neutral-300"
                                            >
                                                Company website
                                            </label>
                                            <div className="relative">
                                                <LinkIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                                                <input
                                                    ref={websiteRef}
                                                    id="website"
                                                    name="website"
                                                    type="url"
                                                    placeholder="https://www.example.com"
                                                    className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pr-3 pl-10 text-sm text-white placeholder:text-neutral-500 focus:border-white/20 focus:ring-2 focus:ring-white/20 focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="title"
                                                className="mb-2 block text-sm text-neutral-300"
                                            >
                                                Job title
                                            </label>
                                            <div className="relative">
                                                <BriefcaseIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                                                <input
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    placeholder="Software Engineer"
                                                    className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pr-3 pl-10 text-sm text-white placeholder:text-neutral-500 focus:border-white/20 focus:ring-2 focus:ring-white/20 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="diet"
                                            className="mb-2 block text-sm text-neutral-300"
                                        >
                                            Dietary Requirements
                                        </label>
                                        <textarea
                                            id="diet"
                                            name="diet"
                                            rows={3}
                                            placeholder="Dietary Requirements"
                                            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white/20 focus:ring-2 focus:ring-white/20 focus:outline-none"
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90 focus:ring-2 focus:ring-white/20 focus:outline-none"
                                        >
                                            <SendIcon className="h-4 w-4" />
                                            Submit
                                        </button>
                                        {statusMessage ? (
                                            <p className="mt-3 text-xs text-neutral-400">
                                                {statusMessage}
                                            </p>
                                        ) : null}
                                    </div>
                                </form>
                            </div>
                        </aside>
                    </div>
                </div>

                <Footer />
            </main>
        </div>
    );
}

type IconProps = SVGProps<SVGSVGElement>;

function TriangleIcon({ className, ...props }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className={className}
            {...props}
        >
            <path d="M12 4 22 20H2z" />
        </svg>
    );
}

function MapPinIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function BuildingIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M10 12h4" />
            <path d="M10 8h4" />
            <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
            <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
            <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
        </svg>
    );
}

function CalendarIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
        </svg>
    );
}

function MailIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect width="20" height="16" x="2" y="4" rx="2" />
        </svg>
    );
}

function ClipboardPasteIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M11 14h10" />
            <path d="M16 4h2a2 2 0 0 1 2 2v1.344" />
            <path d="m17 18 4-4-4-4" />
            <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113" />
            <rect width="8" height="4" x="8" y="2" rx="1" />
        </svg>
    );
}

function GlobeIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
        </svg>
    );
}

function ChevronDownIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

function UserIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function LinkIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    );
}

function BriefcaseIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
    );
}

function SendIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
            <path d="m21.854 2.147-10.94 10.939" />
        </svg>
    );
}
