import { useState } from 'react';
import { generateAudio } from './audio/generateAudio';


function App() {

  return (
    <main className="app-shell">
      <header>
        <p className="eyebrow">Web Audio API + Rust/WASM</p>
        <h1>Audio Avatar Lab</h1>
        <p className="eyebrow">
          Upload an audio file, choose a character voice, preview the result,
          and download a WAV file. Processing stays in your browser.
        </p>
      </header>

      <section className="card" aria-pledby="upload-title">
        <h2 id="upload-title">1. Upload audio</h2>

        <p className="drop-zone">
          <input
            id="audio-file"
            type="file"
            accept=".wav,.mp3,.m4a,audio/wav,audio/mpeg,audio/mp4"
          />
          <span className="drop-title">Choose a WAV, MP3, or M4A file</span>
          <span className="drop-detail">
            The original file is decoded locally by your browser.
          </span>
        </p>

        <p id="file-status" className="status" aria-live="polite">
          No file selected.
        </p>
      </section>

      <section className="card" >
        <h2 id="voice-title">2. Select an output voice</h2>

        <div className="voice-grid" >
          <button className="voice-option selected">
            <span className="voice-icon">icon here pwease</span>
            <span>icon here pweases</span>
            
          </button>

          <button className="voice-option" >
            <span className="voice-icon">icon here pwease</span>
            <span>Villager noises</span>
            
          </button>

          <button className="voice-option">
            <span className="voice-icon"> icon here please</span>
            <span>Tomodachi-speak</span>
            
          </button>
        </div>

        <div className="controls">
          <p>
            Character intensity
            <output id="intensity-value">70%</output>
          </p>
          <input
            id="intensity"
            type="range"
            min="0"
            max="100"
            value="70"
          />

          <p>
            Pitch adjustment
            <output id="pitch-shift-value">0 semitones</output>
          </p>
          <input
            id="pitch-shift"
            type="range"
            min="-12"
            max="12"
            value="0"
          />
        </div>
      </section>

      <section className="card actions-card" >
        <h2 id="render-title">3. Render</h2>

        <div className="actions">
          <button id="render-button" className="primary" disabled>
            Create character audio
          </button>
          <button id="play-button" disabled>
            Play result
          </button>
          <button id="stop-button" disabled>
            Stop
          </button>
          <a id="download-button" className="download disabled" download="audio-avatar.wav">
            Download WAV
          </a>
        </div>

        <div className="progress-wrap">
          <progress id="progress" max="1" value="0"></progress>
          <p id="render-status" className="status" aria-live="polite">
            Upload a file to begin.
          </p>
        </div>
      </section>

      <section className="card disclosure">
        <h2 id="notes-title">What this demo does brochacho</h2>
        <p>
          This is a browser-only character-voice effect. It does not steal, datamine, 
          or use AI to create these recordings. It analyzes
          approximate pitch and loudness, then resynthesizes the timing and
          melody. PLEASE DO NOT SUE ME!!!! THIS IS AN EXPERIMENT !!!!
        </p>
      </section>
    </main>
  )
}

export default App
