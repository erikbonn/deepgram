"use client";
import React from "react";
import type { Dispatch, SetStateAction } from "react";

import { UploadButton } from "~/utils/uploadthing";
import type {
  ClientUploadedFileData,
  UploadedFileData,
} from "uploadthing/types";

interface FileUploadProps {
  files: ClientUploadedFileData<{ file: UploadedFileData }>[];
  setFiles: Dispatch<
    SetStateAction<ClientUploadedFileData<{ file: UploadedFileData }>[]>
  >;
}

// interface UploadedFileData {
//   // Define the properties of UploadedFileData
//   // For example, you might have:
//   name: string;
//   size: number;
//   type: string;
//   blob: Blob;
// }

// async function getDuration(
//   fileData: ClientUploadedFileData<{
//     file: UploadedFileData;
//   }>[],
// ): Promise<number> {
//   if (!fileData || fileData.length === 0) {
//     throw new Error("No file provided");
//   }
//   // Assuming you are dealing with a single file, extract the first file from the array
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   const file = fileData[0]?.file;

//   if (!file) {
//     throw new Error("No file provided");
//   }

//   // Convert the file to a Blob object
//   const blob = new Blob([file]);

//   // Create a URL for the Blob object
//   const url = URL.createObjectURL(blob);

//   return new Promise((resolve) => {
//     const audio = document.createElement("audio");
//     audio.muted = true;
//     const source = document.createElement("source");
//     source.src = url; // Blob URL
//     audio.preload = "metadata";
//     audio.appendChild(source);
//     audio.onloadedmetadata = function () {
//       resolve(audio.duration);
//     };
//   });
// }

export const FileUpload: React.FC<FileUploadProps> = ({ files, setFiles }) => {
  return (
    <div className="mr-10 mt-6 grid justify-items-end">
      <UploadButton
        className="ut-label: Upload a File"
        appearance={{
          container: "text-nowrap",
          button:
            "bg-green cursor-pointer rounded px-10 py-2 text-white shadow-lg",
        }}
        content={{
          button: "Upload a File",
        }}
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          setFiles((prevFiles) => [...prevFiles, ...res]);
          //   await getDuration(res);
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>

    // My way
    // <form
    //   onSubmit={() => handleFormSubmit()}
    //   className="mr-10 mt-6 grid justify-items-end"
    // >
    //   <input id="upload-files" hidden type="file" accept="audio/*" />
    //   <label
    //     htmlFor="upload-files"
    //     className="bg-green cursor-pointer rounded px-10 py-2 text-white shadow-lg"
    //   >
    //     Upload A File
    //   </label>
    //   {/* <button
    //     type="submit"
    //     className="bg-green rounded px-10 py-1 text-white shadow-lg "
    //   >
    //     Upload A File
    //   </button> */}
    // </form>
  );
};
