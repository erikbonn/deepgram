import type { File } from "~/app/page";

export const handleDownload = (
  selectedFile: File | undefined,
  transcription: string | null,
) => {
  if (!transcription || !selectedFile) return;

  const element = document.createElement("a");
  const file = new Blob([transcription], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = `${selectedFile.name.split(".")[0]}_transcription.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
