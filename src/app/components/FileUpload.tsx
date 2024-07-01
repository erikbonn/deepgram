"use client";
import React from "react";

const handleFormSubmit = () => {
  return "hellooo";
};

export default function FileUpload() {
  return (
    <form
      onSubmit={() => handleFormSubmit()}
      className="mr-10 mt-6 grid justify-items-end"
    >
      <input id="upload-files" hidden type="file" accept="audio/*" />
      <label
        htmlFor="upload-files"
        // className="bg-green rounded px-10 py-1 text-white shadow-lg"
      >
        <button
          type="submit"
          className="bg-green rounded px-10 py-1 text-white shadow-lg "
        >
          Upload A File
        </button>
      </label>
      {/* <input type="file" name="audio file" title="Upload file" /> */}
      {/* <button>Upload file</button> */}
    </form>
  );
}
