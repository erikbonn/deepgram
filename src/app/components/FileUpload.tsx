"use client";
import React from "react";
import type { Dispatch, SetStateAction } from "react";

import { UploadButton } from "~/utils/uploadthing";
// import type File from "../page";
import type {
  ClientUploadedFileData,
  UploadedFileData,
} from "uploadthing/types";

interface FileUploadProps {
  files: ClientUploadedFileData<{ file: UploadedFileData }>[] | undefined;
  setFiles: Dispatch<
    SetStateAction<
      ClientUploadedFileData<{ file: UploadedFileData }>[] | undefined
    >
  >;
}

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
        onClientUploadComplete={(res) => {
          if (files) {
            setFiles([...files, ...res]);
          }
          setFiles([...res]);
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
