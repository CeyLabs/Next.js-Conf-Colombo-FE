import Image from "next/image";

const navigationLinks = [
    { href: "#overview", label: "Overview" },
    { href: "#speakers", label: "Speakers" },
    { href: "#faq", label: "FAQ" },
];

export function Header() {
    return (
        <>
            <div className="fixed inset-x-0 top-0 z-20 h-px bg-white/10" />

            <header className="relative">
                <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white text-black">
                                <Image src="/next.svg" alt="Next.js" width={16} height={16} />
                            </span>
                            <span className="text-sm text-neutral-300">Next.js Conf Colombo</span>
                        </div>

                        <nav className="hidden items-center gap-6 text-sm text-neutral-400 md:flex">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="transition hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
                <div className="h-px w-full bg-white/5" />
            </header>
        </>
    );
}
