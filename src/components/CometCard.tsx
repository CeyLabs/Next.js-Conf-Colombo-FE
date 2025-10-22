"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

type ShareTarget = {
    label: string;
    href: string;
    icon: LucideIcon;
};

type CometCardProps = {
    headline?: string;
    subline?: string;
    badge?: string;
    caption?: string;
    texture: string;
    shareButtons?: ShareTarget[];
    isFlipped: boolean;
    tiltEnabled: boolean;
    onToggleFlip: () => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function CometCard({
    headline = "",
    subline = "",
    badge = "",
    caption = "",
    texture,
    shareButtons = [],
    isFlipped,
    tiltEnabled,
    onToggleFlip,
}: CometCardProps) {
    const cardShellRef = useRef<HTMLDivElement | null>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const transform = useMemo(() => {
        const frontRotation = isFlipped ? 180 : 0;
        const tiltX = tiltEnabled ? rotation.x : 0;
        const tiltY = tiltEnabled ? rotation.y : 0;
        return `rotateX(${tiltX}deg) rotateY(${frontRotation + tiltY}deg)`;
    }, [isFlipped, rotation, tiltEnabled]);

    const handleTilt = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!tiltEnabled || !cardShellRef.current) return;
        const bounds = cardShellRef.current.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        const tiltX = clamp((0.5 - y) * 18, -18, 18);
        const tiltY = clamp((x - 0.5) * 20, -20, 20);
        setRotation({ x: tiltX, y: tiltY });
    };

    const resetTilt = () => setRotation({ x: 0, y: 0 });

    const handleCardClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const interactiveParent = (event.target as HTMLElement | null)?.closest("button, a");
        if (interactiveParent) return;
        onToggleFlip();
    };

    const cardGlow =
        "bg-[radial-gradient(circle_at_20%_-10%,rgba(0,87,255,0.18),transparent_55%),radial-gradient(circle_at_80%_120%,rgba(0,87,255,0.2),transparent_50%)]";
    const gridOverlay =
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-[0.12] before:mix-blend-screen before:[background-image:radial-gradient(circle_at_center,rgba(180,202,255,0.6)_0.8px,transparent_1px)] before:[background-size:18px_18px]";

    return (
        <div className="flex w-full max-w-sm flex-col items-center gap-6">
            <div
                ref={cardShellRef}
                onMouseMove={handleTilt}
                onMouseLeave={() => {
                    if (!tiltEnabled) return;
                    resetTilt();
                }}
                onClick={handleCardClick}
                className="relative aspect-[3/4] w-full"
                style={{ perspective: "1600px" }}
            >
                <div
                    className={cn(
                        "relative size-full rounded-[30px] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                        "[transform-style:preserve-3d]"
                    )}
                    style={{ transform }}
                >
                    <div
                        className={cn(
                            "absolute inset-0 rounded-[30px]",
                            "border border-white/8 bg-gradient-to-b from-black/40 to-black/80 shadow-[0_45px_85px_-40px_rgba(59,130,246,0.6)]",
                            "overflow-hidden [backface-visibility:hidden]",
                            gridOverlay
                        )}
                    >
                        <div className="absolute inset-0 rounded-[inherit] border border-white/10 opacity-40" />
                        <div className={cn("absolute inset-0", cardGlow)} />
                        <div className="absolute inset-3 rounded-[24px] border border-white/10 bg-black/60">
                            <Image
                                src={texture}
                                alt="Card texture"
                                fill
                                priority
                                className="rounded-[inherit] object-cover opacity-80 mix-blend-screen"
                            />
                            <div className="absolute inset-0 rounded-[inherit]">
                                {/* Image only - no text overlay */}
                            </div>
                        </div>
                    </div>

                    <div
                        className={cn(
                            "absolute inset-0 rounded-[30px]",
                            "border border-white/8 bg-gradient-to-b from-black/50 to-black/80 shadow-[0_45px_85px_-40px_rgba(59,130,246,0.6)]",
                            "[transform:rotateY(180deg)] overflow-hidden [backface-visibility:hidden]",
                            gridOverlay
                        )}
                    >
                        <div className="absolute inset-0 rounded-[inherit] border border-white/10 opacity-40" />
                        <div className={cn("absolute inset-0", cardGlow)} />
                        <div className="absolute inset-3 rounded-[24px] border border-white/10 bg-black/70 p-6">
                            <Image
                                src="/assets/back-2.webp"
                                alt="Card back texture"
                                fill
                                priority
                                className="rounded-[inherit] object-cover opacity-80 mix-blend-screen"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <p className="font-mono text-[11px] text-neutral-300">
                Tip: Click anywhere on the card to flip.
            </p>
        </div>
    );
}
