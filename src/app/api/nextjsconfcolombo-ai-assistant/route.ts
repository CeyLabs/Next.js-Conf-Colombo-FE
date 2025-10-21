import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const SYSTEM_PROMPT = `
You are a social media caption generator for the Next.js Conf Colombo watch party community.
Write short, energetic captions that feel native to Sri Lankan tech audiences.
Keep every response under 220 characters so it is friendly to X posts.
Use plain text only — no markdown, no bullet points, no asterisks.
Do not add hashtags or links — they are handled separately in the UI.
Mention the livestream, community energy, or watching together when relevant.
Always ensure the tone stays optimistic, inclusive, and focused on the event.
Respond with ONLY the caption text, nothing else.
`;
export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
    if (!process.env.OPENAI_API_KEY) {
        return new Response(
            JSON.stringify({
                error: "OPENAI_API_KEY is not set in the environment.",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }

    let prompt: string | undefined;
    let tone: string = "chill";

    try {
        const body = await req.json();
        if (typeof body === "string") {
            prompt = body.trim();
        } else if (typeof body?.prompt === "string") {
            prompt = body.prompt.trim();
        } else if (typeof body?.question === "string") {
            prompt = body.question.trim();
        }
        
        if (body?.tone) {
            tone = body.tone.toLowerCase();
        }
    } catch (error) {
        console.error("Invalid JSON payload received for Next.js Conf assistant:", error);
        return new Response(
            JSON.stringify({
                error: "Invalid request payload.",
            }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            },
        );
    }

    if (!prompt) {
        return new Response(
            JSON.stringify({
                error: "A prompt is required to generate a response.",
            }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            },
        );
    }

    try {
        const openai = createOpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const userMessage = `Write a ${tone} social media caption for: ${prompt}`;

        const result = await streamText({
            model: openai("gpt-4o-mini"),
            temperature: 0.4,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userMessage },
            ],
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error("Failed to generate Next.js Conf assistant response:", error);
        return new Response(
            JSON.stringify({
                error: "Unable to generate a response at this time. Please try again later.",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }
}
