"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Check, Copy, Loader2, RefreshCw, Share2, Twitter, Linkedin, Wand2 } from "lucide-react";

import PixelBlast from "@/components/PixelBlast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { CometCard } from "@/components/CometCard";

type CopyState = "idle" | "copied" | "error";

const EVENT_HASHTAGS = "#NextjsLK #Colombo #Vercel #nextjs #Ceyloncash #Founderflow";

const DEFAULT_CAPTIONS = [
    "Just wrapped up the Next.js Conf Colombo watch party and it was absolutely incredible! Grateful for the amazing community, insightful talks from Vercel, and connecting with devs worldwide. Can't wait for the next one! #NextjsLK #Colombo #Vercel #nextjs #Ceyloncash #Founderflow",
    "Attended the Next.js Conf Colombo watch party and came away inspired! From edge functions to Turbopack updates, learned so much. Huge thanks to the organizers and everyone who joined virtually. #NextjsLK #Colombo #Vercel #nextjs #Ceyloncash #Founderflow",
    "Post-watch party vibes: Next.js Conf Colombo delivered big time! Shouting out the Sri Lankan dev community and our global friends tuning in from London, Berlin, and beyond. Building the future together. LFG! #NextjsLK #Colombo #Vercel #nextjs #Ceyloncash #Founderflow",
    "Super excited to have attended the Next.js Conf Colombo watch party along with amazing folks also tuning in from London and Berlin. What an epic event! Can't wait to implement what I learned. #NextjsLK #Colombo #Vercel #nextjs #Ceyloncash #Founderflow",
    "Reflecting on the Next.js Conf Colombo watch party — pure magic! The energy, the insights, the community. Thanks to Founderflow and CeylonCash for making it happen. Sri Lanka dev scene is unstoppable! #NextjsLK #Colombo #Vercel #nextjs #Ceyloncash #Founderflow",
    "Just finished the Next.js Conf Colombo watch party and I'm buzzing! Learned about the latest Next.js features, connected with incredible devs, and felt that global community spirit. Grateful for every moment. #NextjsLK #Colombo #Vercel #nextjs #Ceyloncash #Founderflow",
    "Attended Next.js Conf Colombo watch party and it exceeded all expectations! From the keynotes to the community chats, it was inspiring. Huge shoutout to the team and all participants. Let's keep building! #NextjsLK #Colombo #Vercel #nextjs #Ceyloncash #Founderflow",
    "Wrapping up the Next.js Conf Colombo watch party with a heart full of gratitude. The talks were mind-blowing, the community welcoming, and the Sri Lankan hospitality unmatched. See you at the next event! #NextjsLK #Colombo #Vercel #nextjs #Ceyloncash #Founderflow",
    "Post-event glow from Next.js Conf Colombo watch party! Absorbed so much knowledge about modern web development, made great connections, and celebrated our growing dev community. Thank you all! #NextjsLK #Colombo #Vercel #nextjs #Ceyloncash #Founderflow",
    "Just attended the Next.js Conf Colombo watch party and I'm inspired! The blend of local energy and global insights was perfect. Thanks to Vercel, Founderflow, and CeylonCash for an unforgettable experience. #NextjsLK #Colombo #Vercel #nextjs #Ceyloncash #Founderflow",
];

const TONE_PRESETS = ["Chill", "Enthusiastic", "Techie", "Playful"] as const;

const SUPPORT_PROMPTS = [
    {
        id: "attendance-share",
        label: "Share attendance",
        prompt: "Create a caption sharing that you attended the Next.js Conf Colombo watch party. Keep it proud and community-focused, mention the global connections made.",
    },
    {
        id: "experience-share",
        label: "Share experience",
        prompt: "Write a caption about your experience at the Next.js Conf Colombo watch party. Focus on what you learned, the energy, and the Sri Lankan tech community.",
    },
    {
        id: "sponsor-love",
        label: "Appreciate partners",
        prompt: "Generate a caption that thanks the hosting partners Founderflow and CeylonCash for bringing the Next.js Conf Colombo watch party together. Keep it upbeat and community-focused.",
    },
];

const SHARE_URL = "https://nextconfcolombo.vercel.app/community-pulse";

const CARD_TEXTURES = ["/assets/back-1.webp", "/assets/back-2.webp"];

const sanitizeCaption = (input: string) => {
    const text = input
        .replace(/\s+/g, " ")
        .replace(/["“”]+/g, "")
        .trim();
    if (!text) {
        return EVENT_HASHTAGS;
    }

    const lowerCaseText = text.toLowerCase();
    const missingTags = EVENT_HASHTAGS.split(" ").filter(
        (tag) => !lowerCaseText.includes(tag.toLowerCase())
    );

    return `${text}${missingTags.length ? ` ${missingTags.join(" ")}` : ""}`.trim();
};

const fireConfetti = () => {
    if (typeof window === "undefined") return;

    const duration = 900;
    const end = Date.now() + duration;

    const frame = () => {
        confetti({
            particleCount: 4,
            startVelocity: 45,
            spread: 360,
            ticks: 60,
            gravity: 0.9,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2,
            },
            colors: ["#ffffff", "#38bdf8", "#0ea5e9", "#6366f1"],
        });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    };

    frame();
};

export default function CommunityPulsePage() {
    const [prompt, setPrompt] = useState("");
    const [activeTone, setActiveTone] = useState<(typeof TONE_PRESETS)[number]>("Chill");
    const [copyState, setCopyState] = useState<CopyState>("idle");
    const [suggestions, setSuggestions] = useState(() => DEFAULT_CAPTIONS.slice(0, 3));
    const [activeCaption, setActiveCaption] = useState(DEFAULT_CAPTIONS[0]);
    const [textureIndex, setTextureIndex] = useState(0);
    const [isTiltEnabled, setIsTiltEnabled] = useState(true);
    const [isFlipped, setIsFlipped] = useState(false);
    const [streamingText, setStreamingText] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cleanly reset copy state to avoid timeout leaks on unmount
    useEffect(() => {
        if (copyState !== "idle") {
            const timer = window.setTimeout(() => setCopyState("idle"), 2000);
            return () => window.clearTimeout(timer);
        }
    }, [copyState]);

    const shuffleSuggestions = () => {
        const pool = [...DEFAULT_CAPTIONS];
        for (let i = pool.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        setSuggestions(pool.slice(0, 3));
        setActiveCaption(pool[0]);
        setStreamingText("");
    };

    const handleGenerate = async () => {
        const trimmedPrompt = prompt.trim();
        const userPrompt =
            trimmedPrompt || "Share the attendees of the Next.js Conf Colombo watch party.";

        setStreamingText("");
        setActiveCaption("");
        setIsGenerating(true);
        setError(null);

        try {
            const response = await fetch("/api/nextjsconfcolombo-ai-assistant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: userPrompt,
                    tone: activeTone,
                    hashtags: EVENT_HASHTAGS,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate caption");
            }

            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error("No reader available");
            }

            const decoder = new TextDecoder();
            let accumulatedText = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                accumulatedText += chunk;
                setStreamingText(accumulatedText);
            }
            setActiveCaption(sanitizeCaption(accumulatedText));

            setIsFlipped(false);
        } catch (error) {
            console.error("Failed to generate caption", error);
            setError("Failed to generate caption");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSupportPrompt = async (supportPrompt: (typeof SUPPORT_PROMPTS)[number]) => {
        setStreamingText("");
        setActiveCaption("");
        setIsGenerating(true);
        setError(null);

        try {
            const response = await fetch("/api/nextjsconfcolombo-ai-assistant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: supportPrompt.prompt,
                    tone: activeTone,
                    support: supportPrompt.id,
                    hashtags: EVENT_HASHTAGS,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate caption");
            }

            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error("No reader available");
            }

            const decoder = new TextDecoder();
            let accumulatedText = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                accumulatedText += chunk;
                setStreamingText(accumulatedText);
            }
            setActiveCaption(sanitizeCaption(accumulatedText));

            setIsFlipped(true);
        } catch (error) {
            console.error("Failed to generate support caption", error);
            setError("Failed to generate support caption");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = async () => {
        try {
            // Copy what the user currently sees
            await navigator.clipboard.writeText(displayedCaption);
            setCopyState("copied");
            fireConfetti();
        } catch (error) {
            console.error("Failed to copy caption", error);
            setCopyState("error");
        }
    };

    // Show streaming text live while generating; show sanitized final otherwise
    const displayedCaption = isGenerating && streamingText ? streamingText : activeCaption;
    const charCount = displayedCaption.length;

    const encodedCaption = useMemo(() => encodeURIComponent(activeCaption), [activeCaption]);

    const shareButtons = useMemo(
        () => [
            {
                label: "Let the community know, share on X",
                icon: Twitter,
                href: `https://twitter.com/intent/tweet?text=${encodedCaption}`,
            },
            {
                label: "Share to LinkedIn",
                icon: Linkedin,
                href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    SHARE_URL
                )}&summary=${encodedCaption}`,
            },
        ],
        [encodedCaption]
    );

    const assistantProblem = !isGenerating && error;

    return (
        <div className="bg-black text-neutral-200">
            <Header />
            <main className="relative min-h-screen overflow-hidden">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <PixelBlast
                        variant="square"
                        pixelSize={12}
                        patternScale={10}
                        patternDensity={1}
                        pixelSizeJitter={0.1}
                        enableRipples
                        color="#0057ff"
                        rippleIntensityScale={0.9}
                        rippleThickness={0.5}
                        rippleSpeed={0.35}
                        speed={0.45}
                        edgeFade={0.9}
                        transparent
                        antialias
                        globalEvents
                        className="h-full w-full"
                    />
                </div>

                <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-col lg:items-center lg:gap-16">
                    <section className="flex flex-1 flex-col items-center gap-6">
                        <CometCard
                            headline="Next.js"
                            subline="Virtual • Global • Sri Lanka Chapter"
                            badge="Colombo Watch Party"
                            caption={activeCaption}
                            texture={CARD_TEXTURES[textureIndex]}
                            shareButtons={shareButtons}
                            isFlipped={isFlipped}
                            tiltEnabled={isTiltEnabled}
                            onToggleFlip={() => setIsFlipped((prev) => !prev)}
                        />
                    </section>

                    <section className="flex flex-1 flex-col gap-10 lg:max-w-md">
                        <div className="space-y-4 rounded-3xl border border-white/10 bg-black/50 p-5 backdrop-blur">
                            <label
                                htmlFor="prompt"
                                className="font-mono text-xs text-neutral-400 uppercase"
                            >
                                create and share the nextconf vibe you just felt
                            </label>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/60 px-4 py-3">
                                    <textarea
                                        value={displayedCaption}
                                        onChange={(event) => setActiveCaption(event.target.value)}
                                        rows={5}
                                        className="min-h-[120px] w-full resize-none bg-transparent text-sm text-neutral-200 focus:outline-none"
                                    />
                                    {isGenerating && (
                                        <span className="ml-1 inline-block h-3 w-0.5 animate-pulse bg-white/60 align-middle" />
                                    )}
                                    <div className="flex flex-wrap items-center gap-2">
                                        {TONE_PRESETS.map((tone) => (
                                            <button
                                                key={tone}
                                                type="button"
                                                onClick={() => setActiveTone(tone)}
                                                className={cn(
                                                    "rounded-full px-3 py-1.5 text-xs transition",
                                                    activeTone === tone
                                                        ? "bg-white text-black"
                                                        : "bg-black/60 text-neutral-300 ring-1 ring-white/10 ring-inset hover:text-white"
                                                )}
                                            >
                                                {tone}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        onClick={handleCopy}
                                    >
                                        {copyState === "copied" ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                        {copyState === "copied"
                                            ? "Copied"
                                            : copyState === "error"
                                              ? "Try again"
                                              : "Copy"}
                                    </Button>
                                    <span className="font-mono text-xs text-neutral-500">
                                        {charCount}/280
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <Button
                                        type="button"
                                        onClick={handleGenerate}
                                        disabled={isGenerating}
                                        className="flex-1"
                                    >
                                        {isGenerating ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Wand2 className="h-4 w-4" />
                                        )}
                                        Generate
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={shuffleSuggestions}
                                        disabled={isGenerating}
                                        className="flex-1"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                        Shuffle presets
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="font-mono text-xs tracking-[0.18em] text-neutral-400 uppercase">
                                    Quick helpers
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {SUPPORT_PROMPTS.map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => handleSupportPrompt(item)}
                                            disabled={isGenerating}
                                            className={cn(
                                                "rounded-full border border-white/10 px-3 py-1.5 text-xs text-neutral-200 transition hover:bg-white/10",
                                                isGenerating && "opacity-60"
                                            )}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {assistantProblem && (
                                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                                    We couldn’t generate a caption this time. Try again or use a
                                    preset below.
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-black/60 p-5 backdrop-blur">
                            <span className="font-mono text-xs tracking-[0.18em] text-neutral-400 uppercase">
                                Share on
                            </span>
                            <div className="flex flex-wrap items-center gap-3">
                                {/* X with label (keep title the same) */}
                                <Button
                                    asChild
                                    variant="secondary"
                                    size="sm"
                                    className="border border-white/10 bg-black/60 hover:bg-white/10"
                                >
                                    <Link
                                        href={`https://twitter.com/intent/tweet?text=${encodedCaption}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Twitter className="h-4 w-4" />
                                        Share to X
                                    </Link>
                                </Button>

                                {/* LinkedIn icon-only, rounded */}
                                <Button
                                    asChild
                                    aria-label="Share to LinkedIn"
                                    variant="secondary"
                                    size="icon"
                                    className="rounded-full border border-white/10 bg-black/60 hover:bg-white/10"
                                >
                                    <Link
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                            SHARE_URL
                                        )}&summary=${encodedCaption}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Linkedin className="h-4 w-4" />
                                    </Link>
                                </Button>

                                {/* System share icon-only, rounded */}
                                <Button
                                    aria-label="Share"
                                    variant="secondary"
                                    size="icon"
                                    onClick={async () => {
                                        if (navigator.share) {
                                            try {
                                                await navigator.share({
                                                    title: "Next.js Conf Colombo",
                                                    text: activeCaption,
                                                    url: SHARE_URL,
                                                });
                                            } catch (error) {
                                                console.error("Share failed", error);
                                            }
                                        } else {
                                            window.open(
                                                `https://twitter.com/intent/tweet?text=${encodedCaption}`,
                                                "_blank",
                                                "noopener"
                                            );
                                        }
                                    }}
                                    className="rounded-full border border-white/10 bg-black/60 hover:bg-white/10"
                                >
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3 rounded-3xl border border-white/10 bg-black/50 p-5 backdrop-blur">
                            <p className="font-mono text-xs tracking-[0.18em] text-neutral-400 uppercase">
                                Suggested captions
                            </p>
                            <div className="flex flex-col gap-3">
                                {suggestions.map((caption) => (
                                    <button
                                        key={caption}
                                        type="button"
                                        onClick={() => {
                                            setActiveCaption(caption);
                                            setStreamingText("");
                                            setIsFlipped(false);
                                        }}
                                        className="rounded-2xl border border-white/10 bg-black/60 px-4 py-4 text-left text-sm text-neutral-200 transition hover:border-white/30 hover:text-white"
                                    >
                                        {caption}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="font-mono text-xs text-neutral-500">
                            Powered by <span className="text-neutral-300">Vercel AI SDK</span>
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
