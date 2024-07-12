"use client";
import { FileUpload } from "./components/FileUpload";
import { Transcription } from "./components/Transcription";
import { useState } from "react";
import { useFileTranscription } from "./hooks/useFileTranscription";
import { handleTranscriptionDownload } from "../utils/handleTranscriptionDownload";

export type File = {
  name: string;
  size: number;
  key: string;
  serverData?: File | undefined;
  url: string;
  customId: string | null;
  type: string;
  duration?: string;
};

export default function HomePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  console.log("files", files);

  const { transcription, handleFileTranscription } = useFileTranscription();

  return (
    <main>
      <div className="flex flex-col">
        <div className="h-50 flex flex-col">
          <div className="my-4 flex justify-center text-2xl font-black drop-shadow-2xl">
            Deepgram Audio Server
          </div>
          <FileUpload files={files} setFiles={setFiles} />
        </div>
        <div className="mx-10 mb-10 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b-2 border-solid border-black text-lg font-bold ">
                <th className="max-w-14 py-2 pl-3 text-left">Filename</th>
                <th className="max-w-14 py-2 pl-3 text-left">Duration</th>
                <th className="max-w-14 py-2 pl-3 text-left">Size</th>
                <th className="max-w-14 py-2 pl-3 text-left"></th>
                <th className="max-w-14 py-2 pl-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr
                  key={file.key}
                  className="border-b-2 border-solid border-gray-400"
                >
                  <td className="min-w-20 max-w-28  py-3 pl-3">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      {file.name}
                    </a>
                  </td>
                  <td className="max-w-28 py-3 pl-3">
                    <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                      {file?.duration}
                    </span>
                  </td>
                  <td className="max-w-24 py-3 pl-3">
                    {(file.size / 1000000).toFixed(1)}MB
                  </td>
                  <td className="max-w-24  py-3 pl-3">
                    <button
                      onClick={async () => {
                        setSelectedFile(file);
                        await handleFileTranscription(file.url);
                      }}
                      className="text-blue font-black drop-shadow-2xl"
                    >
                      TRANSCRIBE
                    </button>
                  </td>
                  <td className="max-w-24 py-3 pl-3">
                    {selectedFile === file && transcription ? (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleTranscriptionDownload(file, transcription);
                        }}
                        className="text-blue cursor-pointer font-black drop-shadow-2xl"
                      >
                        DOWNLOAD
                      </a>
                    ) : (
                      <a
                        href="#"
                        onClick={(e) => {
                          console.error("No transcription to download!");
                        }}
                        className="text-blue cursor-pointer font-black drop-shadow-2xl"
                      >
                        DOWNLOAD TRANSCRIPTION
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Transcription
        transcription={transcription}
        selectedFile={selectedFile}
      />
    </main>
  );
}
