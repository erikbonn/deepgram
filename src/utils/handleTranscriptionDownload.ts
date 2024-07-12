import DOMPurify from "dompurify";
import type { File } from "~/app/page";
import { sanitizeFileName } from "./sanitizeFilename";

export const handleTranscriptionDownload = (
  selectedFile: File | undefined,
  transcription: string | null,
) => {
  if (!transcription || !selectedFile) return;

  const sanitizedTranscription = DOMPurify.sanitize(transcription);
  const sanitizedFileName = sanitizeFileName(selectedFile.name);

  const blob = new Blob([sanitizedTranscription], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${sanitizedFileName.split(".")[0]}_transcription.txt`;

  // Append to the document body and click
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
