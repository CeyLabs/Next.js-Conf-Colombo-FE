"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TelegramIcon } from "@/components/ui/icons";

export default function SiteClosure() {
    return (
        <div className="bg-black text-neutral-200">
            <main className="flex min-h-screen flex-col bg-black text-white">
                <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-10 lg:px-8 lg:py-16">
                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                        <h2
                            id="site-closed-title"
                            className="font-geist text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl"
                        >
                            Thanks for joining us, Colombo.
                            <br />
                            See you next year!
                        </h2>
                        <p
                            id="site-closed-description"
                            className="font-geist mt-6 max-w-xl text-sm text-neutral-400 sm:text-base"
                        >
                            Thank you for being part of Next.js Conf Colombo 2025 watch party! The
                            event has concluded, but stay connected with our community.
                        </p>

                        <div className="mt-10 rounded-lg border border-white/10 bg-gradient-to-r from-black/20 to-black/10 p-4 backdrop-blur-sm">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src="/assets/tg-cover-nextjslk.jpeg"
                                        alt="Next.js Sri Lanka Telegram Community"
                                        width={40}
                                        height={40}
                                        className="rounded-full ring-1 ring-white/10"
                                    />
                                    <div>
                                        <h3 className="font-geist text-sm font-semibold text-white">
                                            Join our Telegram Community
                                        </h3>
                                        <p className="font-geist text-xs text-neutral-400">
                                            Official Sri Lankan Next.js community
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="h-8 border-white/20 bg-white/5 px-3 py-1 text-xs text-white hover:bg-white/10 hover:text-white"
                                >
                                    <a
                                        href="https://t.me/NextjsLK"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <TelegramIcon className="mr-1 h-3 w-3" />
                                        Join
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
