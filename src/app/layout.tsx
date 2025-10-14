import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/theme.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

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
                className={`${inter.className} bg-black text-neutral-200 antialiased selection:bg-white/10`}
            >
                {children}
            </body>
        </html>
    );
}
