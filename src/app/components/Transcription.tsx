import type {
  ClientUploadedFileData,
  UploadedFileData,
} from "uploadthing/types";

type TranscriptionPropTypes = {
  transcription: string | null;
  selectedFile: ClientUploadedFileData<{ file: UploadedFileData }> | undefined;
};

export const Transcription: React.FC<TranscriptionPropTypes> = ({
  transcription,
  selectedFile,
}) => {
  console.log("trans should be here", transcription);
  return (
    <div className="mx-10 my-6 flex flex-col">
      <label className="my-2 ml-3">
        Transcript: {selectedFile?.name ?? selectedFile?.name}
      </label>
      <textarea
        readOnly
        className={`h-80 resize-none rounded border-2 border-solid border-gray-400 p-3 ${transcription ? "text-slate-800" : "text-slate-400"}`}
        value={transcription ? transcription : "Transcribing..."}
      ></textarea>
    </div>
  );
};
