"use client";

import { useState, useEffect } from "react";
import { MapPinIcon, UserIcon } from "@/components/ui/icons";

type EventStatus = "upcoming" | "live" | "ended";

// Export site close time for use in main page
export const SITE_CLOSE_TIME = new Date("2025-10-23T09:00:00+05:30"); // 5 hours after event end

export default function EventCountdown() {
    // Event timing (Asia/Colombo, UTC+05:30)
    const EVENT_START = new Date("2025-10-22T19:00:00+05:30"); // Wednesday, Oct 22, 2025 | 7:00 PM
    const EVENT_END = new Date("2025-10-23T04:00:00+05:30"); // Thursday, Oct 23, 2025 | 4:00 AM

    const [status, setStatus] = useState<EventStatus>("upcoming");
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const calculateStatusAndTime = () => {
        const now = new Date();
        let newStatus: EventStatus;
        if (now < EVENT_START) newStatus = "upcoming";
        else if (now >= EVENT_START && now < EVENT_END) newStatus = "live";
        else newStatus = "ended";

        const target = newStatus === "upcoming" ? EVENT_START : EVENT_END;
        const diff = Math.max(0, target.getTime() - now.getTime());
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setStatus(newStatus);
        setTimeLeft({ days, hours, minutes, seconds });
    };

    // Live countdown/status updater
    useEffect(() => {
        calculateStatusAndTime();
        const id = setInterval(calculateStatusAndTime, 1000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            role="timer"
            aria-live="off"
            aria-atomic={false}
            className="mt-3 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm"
        >
            {status === "upcoming" && (
                <div className="flex flex-col gap-3">
                    <div className="inline-flex items-center justify-center gap-2 font-mono text-xs font-bold text-white uppercase">
                        <span
                            className="inline-flex h-2 w-2 bg-blue-700"
                            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                        ></span>
                        Starts in
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        {timeLeft.days > 0 && <TimeBox label="Days" value={timeLeft.days} />}
                        <TimeBox label="Hours" value={timeLeft.hours} />
                        <TimeBox label="Minutes" value={timeLeft.minutes} />
                        <TimeBox label="Seconds" value={timeLeft.seconds} />
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2 font-mono text-xs text-white">
                            <MapPinIcon className="h-4 w-4" />
                            <span className="uppercase">Colombo, LK</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs text-white">
                            <UserIcon className="h-4 w-4" />
                            <span className="uppercase">In-person</span>
                        </div>
                    </div>
                </div>
            )}

            {status === "live" && (
                <div className="flex flex-col gap-3">
                    <div className="inline-flex items-center justify-center gap-2 font-mono text-xs font-bold text-white uppercase">
                        <span
                            className="inline-flex h-2 w-2 animate-pulse bg-red-400"
                            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                        ></span>
                        Live - Ends in
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        {timeLeft.days > 0 && <TimeBox label="Days" value={timeLeft.days} />}
                        <TimeBox label="Hours" value={timeLeft.hours} />
                        <TimeBox label="Minutes" value={timeLeft.minutes} />
                        <TimeBox label="Seconds" value={timeLeft.seconds} />
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2 font-mono text-xs text-white">
                            <MapPinIcon className="h-4 w-4" />
                            <span className="uppercase">Colombo, LK</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs text-white">
                            <UserIcon className="h-4 w-4" />
                            <span className="uppercase">In-person</span>
                        </div>
                    </div>
                </div>
            )}

            {status === "ended" && (
                <div className="flex flex-col gap-3">
                    <div className="inline-flex items-center justify-center gap-2 font-mono text-xs font-bold text-white uppercase">
                        <span
                            className="inline-flex h-2 w-2 bg-neutral-400"
                            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                        ></span>
                        Event Ended
                    </div>
                    <div className="flex h-[60px] items-center justify-center">
                        <p className="text-center font-mono text-sm text-neutral-300">
                            Thanks for joining us, Colombo. See you next year.
                        </p>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2 font-mono text-xs text-white">
                            <MapPinIcon className="h-4 w-4" />
                            <span className="uppercase">Colombo, LK</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs text-white">
                            <UserIcon className="h-4 w-4" />
                            <span className="uppercase">In-person</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Small presentational component for time segments
function TimeBox({ label, value }: { label: string; value: number }) {
    const pad = (n: number) => n.toString().padStart(2, "0");

    // Shorten labels
    const shortLabel =
        label === "Days"
            ? "DAYS"
            : label === "Hours"
              ? "HOURS"
              : label === "Minutes"
                ? "MINS"
                : label === "Seconds"
                  ? "SECS"
                  : label;

    return (
        <div className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-center">
            <div className="font-mono text-xl leading-none font-semibold text-white">
                {pad(value)}
            </div>
            <div className="mt-1 text-[10px] font-bold tracking-wide text-white uppercase">
                {shortLabel}
            </div>
        </div>
    );
}
