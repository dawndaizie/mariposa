export function generateAudio(
    context: AudioContext,
    _input: AudioBuffer
): AudioBuffer {
    const sampleRate = 44100;
    const duration = 1;
    const frameCount = sampleRate * duration;

    const output = context.createBuffer(
        1,
        frameCount,
        sampleRate
    );

    const samples = output.getChannelData(0);

    for (let i = 0; i < samples.length; i++) {
        const time = i / sampleRate;

        const frequency =
            time < 0.5 ? 440 : 660;

        const envelope =
            1 - (time % 0.5) / 0.5;

        samples[i] =
            Math.sin(2 * Math.PI * frequency * time) *
            envelope *
            0.25;
    }

    return output;
}