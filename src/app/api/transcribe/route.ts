// pages/api/transcribe.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";
import dotenv from "dotenv";

dotenv.config();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// const transcribeUrl = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
//     console.log("deeeep", req?.body?.url);

//     const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
//       {
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
//         url: req?.body.url, // Expecting URL to be passed in the request body
//       },
//       {
//         model: "nova-2",
//         smart_format: true,
//       },
//     );

//     if (error) {
//       throw error;
//     }

//     res.status(200).json({ result });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };

// export default transcribeUrl;
