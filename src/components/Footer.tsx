export function Footer() {
    return (
        <section className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                <div className="mt-8 flex flex-col items-center justify-between gap-4 text-neutral-500 sm:flex-row">
                    <p className="text-xs">© 2025 Next.js Conf Colombo Watch Party</p>
                    <div className="flex items-center gap-2 text-xs">
                        <span>Hosted By:</span>
                        <a
                            href="https://founderflow.lk/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-white"
                        >
                            Founderflow
                        </a>
                        <span>x</span>
                        <a
                            href="https://x.com/CeylonCash"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-white"
                        >
                            CeylonCash
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
