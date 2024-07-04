import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";
import dotenv from "dotenv";

dotenv.config();
interface TranscribeRequestBody {
  url: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TranscribeRequestBody;
    const { url } = body;
    const deepgram = createClient(process.env.DEEPGRAM_SECRET);

    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
      { url },
      { model: "nova-2", smart_format: true },
    );

    if (error) {
      throw error;
    }

    return NextResponse.json({ result });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 },
      );
    }
  }
}
