export default function Transcription({}) {
  return (
    <div className="mx-10 my-6 flex flex-col">
      <label className="my-2 ml-3">File Name (replace)</label>
      <textarea
        className="h-80 resize-none rounded border-2 border-solid border-gray-400 p-3 text-slate-400"
        defaultValue="Transcribing..."
      ></textarea>
    </div>
  );
}
