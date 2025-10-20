import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "@/styles/theme.css";

// Geist font family from Vercel
// Use prebuilt NextFont exports
const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
    metadataBase: new URL("https://nextconfcolombo.vercel.app/"),
    title: "Next.js Conf '25 - Colombo Watch Party",
    description:
        "Join us to celebrate the Next.js/Vercel ecosystem and connect with the best in our community.",
    openGraph: {
        images: [
            {
                url: "/assets/Next.js Conf '25 - Social Preview.png",
                width: 1200,
                height: 630,
                alt: "Next.js Conf '25 - Colombo Watch Party",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.className} ${geistMono.variable} bg-black text-neutral-200 antialiased selection:bg-white/10`}
            >
                {children}
            </body>
        </html>
    );
}
