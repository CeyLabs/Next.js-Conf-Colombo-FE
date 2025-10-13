import Image from "next/image";
import { Button } from "@/components/ui/button";

const navigationLinks = [
    { href: "#agenda", label: "Agenda" },
    { href: "#faq", label: "FAQ" },
    { href: "https://luma.com/2kqylm3u?from=embed", label: "Get Tickets" },
];

export function Header() {
    return (
        <>
            <div className="fixed inset-x-0 top-0 z-20 h-px bg-white/10" />

            <header className="relative">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <div className="flex items-center">
                        <Image
                            src="/assets/Founderflow x Ceylon Cash.svg"
                            alt="Founderflow x Ceylon Cash"
                            width={300}
                            height={60}
                            className="h-auto max-h-full w-60"
                        />
                    </div>

                    <nav className="hidden items-center gap-6 text-sm text-neutral-400 md:flex">
                        {navigationLinks.map((link) =>
                            link.label === "Get Tickets" ? (
                                <Button
                                    key={link.label}
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                                >
                                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                                        {link.label}
                                    </a>
                                </Button>
                            ) : (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="transition hover:text-white"
                                >
                                    {link.label}
                                </a>
                            )
                        )}
                    </nav>
                </div>
                <div className="h-px w-full bg-white/5" />
            </header>
        </>
    );
}
