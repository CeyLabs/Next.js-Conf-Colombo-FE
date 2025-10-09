import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/theme.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Next.js Conf Colombo Watch Party",
    description:
        "Register your interest in the Next.js Conf 2025 Colombo watch party hosted by Vercel.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} bg-black text-neutral-200 antialiased selection:bg-white/10`}
            >
                {children}
            </body>
        </html>
    );
}
