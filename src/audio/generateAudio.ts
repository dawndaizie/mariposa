import { getRms } from "./analysis";
import { estimatePitchZeroCrossing } from "./pitch";

export function generateAudio(
    context: AudioContext,
    input: AudioBuffer
): AudioBuffer {
  const sampleRate = input.sampleRate;
  const inputSamples = input.getChannelData(0);

  const output = context.createBuffer(
    1,
    input.length,
    sampleRate
  );

  const outputSamples = output.getChannelData(0);

  const windowDuration = 0.04;
  const windowSize = Math.floor(
    sampleRate * windowDuration
  );

  const threshold = 0.02;

  for (
    let start = 0;
    start < inputSamples.length;
    start += windowSize
  ) {
    const end = Math.min(
      start + windowSize,
      inputSamples.length
    );

    const rms = getRms(inputSamples, start, end);

    if (rms < threshold) {
      continue;
    }

    const pitch = estimatePitchZeroCrossing(
      inputSamples,
      start,
      end,
      sampleRate
    );

    if (!pitch) {
      continue;
    }

    const volume = Math.min(rms * 5, 0.35);

    writeBeep(
      outputSamples,
      start,
      end,
      sampleRate,
      pitch,
      volume
    );
  }

    return output;
}

function writeBeep(
  output: Float32Array,
  start: number,
  end: number,
  sampleRate: number,
  frequency: number,
  volume: number
): void {
  const length = end - start;

  for (let i = start; i < end; i++) {
    const localIndex = i - start;
    const time = localIndex / sampleRate;
    const progress = localIndex / length;

    const envelope = Math.sin(Math.PI * progress);

    output[i] =
      Math.sin(2 * Math.PI * frequency * time) *
      envelope *
      volume;
  }
}