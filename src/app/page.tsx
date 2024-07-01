import { Cairo } from "@next/font/google";
import FileUpload from "./components/FileUpload";
import Transcription from "./components/Transcription";

const cairo = Cairo({
  weight: "400",
  subsets: ["latin", "arabic", "latin-ext"],
  display: "swap",
});

const audioFiles = [
  "https://utfs.io/f/54096552-d2f5-43c5-bed8-c81a356bbd54-wo77bl.mp3",
  "https://utfs.io/f/c5753e4a-95ab-4f7a-926b-a0fecd5d03e3-wo77bi.mp3",
  "https://utfs.io/f/f9332a51-2d8b-4bb1-885c-ddb65651dfe1-wo77bh.mp3",
  "https://utfs.io/f/391e2bff-2345-4d02-b806-3f87526f518d-bizmt2.wav",
];

const indexedAudioFiles = audioFiles.map((url, index) => ({
  id: index + 1,
  url,
}));

// maybe feed thru api to get the Duration and Size?

export default function HomePage() {
  return (
    <main className={cairo.className}>
      <div className="flex flex-col">
        <div className="h-50 flex flex-col">
          <div className="my-4 flex justify-center text-xl font-black drop-shadow-2xl">
            Deepgram Audio Server
          </div>
          <FileUpload />
        </div>
        <table className="mx-10 my-10 table-auto">
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
            {indexedAudioFiles.map((file) => (
              <tr
                key={file.id}
                className="border-b-2 border-solid border-gray-400"
              >
                <td className="py-3 pl-3 ">
                  <a href={file.url} target="_blank">
                    {file.url}
                  </a>
                </td>
                <td className="py-3 pl-3 ">
                  <a href={file.url} target="_blank">
                    {file.id}
                  </a>
                </td>
                <td className="py-3 pl-3 ">
                  <a href={file.url} target="_blank">
                    Yo mama
                  </a>
                </td>
                <td className="py-3 pl-3 ">
                  <a
                    href={file.url}
                    target="_blank"
                    className="text-blue font-black drop-shadow-2xl"
                  >
                    TRANSCRIBE
                  </a>
                </td>
                <td className="py-3 pl-3 ">
                  <a
                    href={file.url}
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
      <Transcription />
    </main>
  );
}
