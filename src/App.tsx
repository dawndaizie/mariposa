import { useState } from 'react';
import { generateAudio } from './audio/generateAudio';
import { encodeWav } from './audio/encodeWav';
import './App.css'


function App() {
  const [file, setFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".wav")) {
      setError("Please choose a WAV file.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  }

  async function handleProcess() {
    if (!file) return;

    try {
      setError("");

      const arrayBuffer = await file.arrayBuffer();
      const audioContext = new AudioContext();

      const inputBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const outputBuffer = generateAudio(audioContext, inputBuffer);

      const wavBlob = encodeWav(outputBuffer);
      const url = URL.createObjectURL(wavBlob);

      setResultUrl(url);

      await audioContext.close();
    } catch {
      setError("The file could not be processed.");
    }
  }

  return (
    <main className="">
      <h1 className="">mariposa</h1>

      <input
        type="file"
        accept=".wav, audio/wav"
        onChange={handleFileChange}
      />

      <button
        type="button"
        disabled={!file}
        onClick={handleProcess}
      >
        maripose
      </button>

      {error && <p>{error}</p>}

      {resultUrl && (
        <div>
          <audio controls src={resultUrl} />
          <a href={resultUrl} download="mariposa-audio.wav">
            Download file
          </a>
        </div>
      )}
    </main>
  )
}

export default App
