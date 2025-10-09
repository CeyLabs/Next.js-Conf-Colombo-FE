export function Footer() {
    return (
        <section className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                <div className="mt-8 flex flex-col items-center justify-between gap-4 text-neutral-500 sm:flex-row">
                    <p className="text-xs">© 2025 Next.js Conf Colombo Watch Party</p>
                    <div className="flex items-center gap-5 text-xs">
                        <a href="#" className="transition hover:text-white">
                            Code of Conduct
                        </a>
                        <a href="#" className="transition hover:text-white">
                            Privacy
                        </a>
                        <a href="#" className="transition hover:text-white">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
