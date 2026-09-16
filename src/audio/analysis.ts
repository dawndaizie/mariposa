export function getRms(
  samples: Float32Array,
  start: number,
  end: number
): number {
  const safeStart = Math.max(0, start);
  const safeEnd = Math.min(end, samples.length);

  const sampleCount = safeEnd - safeStart;

  if (sampleCount <= 0) {
    return 0;
  }

  let sumOfSquares = 0;

  for (let i = safeStart; i < safeEnd; i++) {
    const sample = samples[i];

    sumOfSquares += sample * sample;
  }

  return Math.sqrt(sumOfSquares / sampleCount);
}