import type { File } from "../page";

type TranscriptionPropTypes = {
  transcription: string | null;
  selectedFile: File | undefined;
};

export const Transcription: React.FC<TranscriptionPropTypes> = ({
  transcription,
  selectedFile,
}) => {
  return (
    <div className="mx-10 my-6 flex flex-col">
      <label className="my-2 ml-3">
        Transcript: {selectedFile?.name ?? selectedFile?.name}
      </label>
      <textarea
        readOnly
        className={`h-80 resize-none rounded border-2 border-solid border-gray-400 p-3 ${transcription ? "text-slate-800" : "text-slate-400"}`}
        value={transcription ? transcription : "Click transcribe to view the transcription here"}
      ></textarea>
    </div>
  );
};
