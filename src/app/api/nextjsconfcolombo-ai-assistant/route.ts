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

const COMMON_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
} as const;

const JSON_HEADERS = {
    ...COMMON_HEADERS,
    "Content-Type": "application/json",
} as const;

const STREAM_HEADERS = {
    ...COMMON_HEADERS,
    "Content-Type": "text/plain; charset=utf-8",
} as const;

const createJsonResponse = (status: number, payload: unknown) =>
    new Response(JSON.stringify(payload), {
        status,
        headers: JSON_HEADERS,
    });

export async function OPTIONS(): Promise<Response> {
    return new Response(null, {
        status: 204,
        headers: COMMON_HEADERS,
    });
}

export async function POST(req: Request): Promise<Response> {
    if (!process.env.OPENAI_API_KEY) {
        return createJsonResponse(500, {
            error: "OPENAI_API_KEY is not set in the environment.",
            hint: "Add OPENAI_API_KEY to your Vercel project settings and redeploy.",
        });
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
        return createJsonResponse(400, {
            error: "Invalid request payload.",
        });
    }

    if (!prompt) {
        return createJsonResponse(400, {
            error: "A prompt is required to generate a response.",
        });
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

        return result.toTextStreamResponse({
            headers: STREAM_HEADERS,
        });
    } catch (error) {
        const requestId = crypto.randomUUID();
        let errorDetails = "Unknown error";

        if (error instanceof Error) {
            errorDetails = error.message || error.name;
        } else {
            try {
                errorDetails = JSON.stringify(error);
            } catch {
                errorDetails = String(error);
            }
        }

        console.error(
            `Failed to generate Next.js Conf assistant response [${requestId}]:`,
            error,
        );

        return createJsonResponse(500, {
            error: "Unable to generate a response at this time. Please try again later.",
            requestId,
            details: errorDetails,
        });
    }
}
