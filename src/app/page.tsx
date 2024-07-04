"use client";
import { Cairo } from "@next/font/google";
import { FileUpload } from "./components/FileUpload";
import { Transcription } from "./components/Transcription";
import { useState } from "react";
import type {
  ClientUploadedFileData,
  UploadedFileData,
} from "uploadthing/types";

const cairo = Cairo({
  weight: "400",
  subsets: ["latin", "arabic", "latin-ext"],
  display: "swap",
});

export default function HomePage() {
  const [files, setFiles] = useState<
    ClientUploadedFileData<{ file: UploadedFileData }>[]
  >([]);
  const [selectedFile, setSelectedFile] =
    useState<ClientUploadedFileData<{ file: UploadedFileData }>>();
  const [transcription, setTranscription] = useState<string | null>(null);

  console.log("files", files);

  const handleFileTranscription = async (url: string) => {
    if (url) {
      console.log("transcibing for url: ", url);
      const transcriptionResponse = await fetch("/api/transcribe", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (transcriptionResponse.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { result } = await transcriptionResponse.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        console.log("result", result);
        setTranscription(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          result?.results.channels[0].alternatives[0].transcript as string,
        );
      } else {
        console.error("Transcription failed");
      }
    } else {
      console.error("File upload failed");
    }
  };

  return (
    <main className={cairo.className}>
      <div className="flex flex-col">
        <div className="h-50 flex flex-col">
          <div className="my-4 flex justify-center text-xl font-black drop-shadow-2xl">
            Deepgram Audio Server
          </div>
          <FileUpload files={files} setFiles={setFiles} />
        </div>
        <table className="mx-10 mb-10 table-auto">
          <thead>
            <tr className="border-b-2 border-solid border-black text-lg font-bold ">
              <th className="py-2 pl-3 text-left">Filename</th>
              <th className="py-2 pl-3 text-left ">Duration</th>
              <th className="py-2 pl-3 text-left ">Size</th>
              <th className="py-2 pl-3 text-left "></th>
              <th className="py-2 pl-3 text-left "></th>
            </tr>
          </thead>
          <tbody>
            {files?.map((file) => (
              <tr
                key={file?.key}
                className="border-b-2 border-solid border-gray-400"
              >
                <td className="py-3 pl-3 ">
                  <a href={file.url} target="_blank">
                    {file.name}
                  </a>
                </td>
                <td className="py-3 pl-3 ">
                  <a href={file.url} target="_blank">
                    {file?.type}
                  </a>
                </td>
                <td className="py-3 pl-3 ">
                  {(file?.size / 1000000).toFixed(1)}MB
                </td>
                <td className="py-3 pl-3">
                  <button
                    onClick={async () => {
                      setSelectedFile(file),
                        await handleFileTranscription(file?.url);
                    }}
                    className="text-blue font-black drop-shadow-2xl"
                  >
                    TRANSCRIBE
                  </button>
                </td>
                <td className="py-3 pl-3">
                  <a
                    href={file.url} // fix
                    target="_blank"
                    className="text-blue font-black drop-shadow-2xl"
                  >
                    DOWNLOAD
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Transcription
        transcription={transcription}
        selectedFile={selectedFile}
      />
    </main>
  );
}
