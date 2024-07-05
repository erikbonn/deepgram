import { useState, useCallback } from "react";

interface TranscriptionResult {
  results: {
    channels: {
      alternatives: {
        transcript: string;
      }[];
    }[];
  };
}

interface ApiResponse {
  result: TranscriptionResult;
}

export const useFileTranscription = () => {
  const [transcription, setTranscription] = useState<string | null>(null);

  const handleFileTranscription = useCallback(async (url: string) => {
    if (!url) {
      console.error("File upload failed");
      return;
    }

    console.log("transcribing for url: ", url);

    const transcriptionResponse = await fetch("/api/transcribe", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!transcriptionResponse.ok) {
      console.error("Transcription failed");
      return;
    }

    const data = (await transcriptionResponse.json()) as ApiResponse;
    const transcript =
      data.result.results.channels[0]?.alternatives[0]?.transcript;

    if (transcript) {
      setTranscription(transcript);
    } else {
      console.error("Transcription result is undefined");
    }
  }, []);

  return { transcription, handleFileTranscription };
};
