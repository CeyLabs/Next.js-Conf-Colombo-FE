import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

interface PromoCardProps {
    className?: string;
}

export function PromoCard({ className }: PromoCardProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-8",
                className
            )}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18)_0%,_rgba(15,23,42,0)_60%)]" />
            <div className="relative flex max-w-3xl flex-col gap-4">
                <div>
                    <p className="mb-2 text-xs font-semibold tracking-[0.35em] text-neutral-400 uppercase">
                        Community Partner
                    </p>
                    <div>
                        <Image
                            src="/assets/partners/STEMLink - Next.js Conf_Community Partners.svg"
                            alt="STEMLink"
                            width={200}
                            height={56}
                            className="h-16 w-auto md:h-20"
                            priority
                        />
                    </div>
                    {/* <div className="h-px w-20 bg-gradient-to-r from-white/40 to-transparent" /> */}
                </div>

                <p className="text-sm leading-relaxed text-neutral-200 md:text-sm">
                    STEM Link Bootcamp learners receive{" "}
                    <span className="font-semibold text-white">50% off</span> for ticket purchase.
                </p>

                <div>
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="group border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                    >
                        <a
                            href="https://stemlink.online/event/nextjs-watch-party?via=nextjsconfcolombo"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Claim Your Discount
                            <ArrowUpRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
