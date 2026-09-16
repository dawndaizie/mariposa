export function estimatePitchZeroCrossing(
  samples: Float32Array,
  start: number,
  end: number,
  sampleRate: number
): number | null {
  let crossings = 0;
  let previous = samples[start] ?? 0;

  for (let i = start + 1; i < end; i++) {
    const current = samples[i];

    if (previous <= 0 && current > 0) {
      crossings += 1;
    }

    previous = current;
  }

  const durationSeconds = (end - start) / sampleRate;

  if (durationSeconds <= 0 || crossings < 2) {
    return null;
  }

  const frequency = crossings / durationSeconds;

  if (frequency < 80 || frequency > 1000) {
    return null;
  }

  return frequency;
}