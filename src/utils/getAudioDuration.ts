export async function getAudioDuration(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.onloadedmetadata = () => {
      const duration = audio.duration;
      resolve(formatDuration(duration));
    };
    audio.onerror = () => reject(new Error("Error loading audio file"));
    audio.src = URL.createObjectURL(file);
  });
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const parts = [
    hours.toString().padStart(1, "0"),
    minutes.toString().padStart(2, "0"),
    remainingSeconds.toString().padStart(2, "0"),
  ];

  return parts.join(":");
}
