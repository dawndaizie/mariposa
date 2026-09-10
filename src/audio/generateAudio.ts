export function generateAudio(
    context: AudioContext,
    input: AudioBuffer
): AudioBuffer {
    const sampleRate = input.sampleRate;
    const duration = input.duration;
    const output = context.createBuffer(1, input.length, sampleRate);

    const inputSamples = input.getChannelData(0);
    const outputSamples = output.getChannelData(0);

    const beepDuration = 0.1;
    const pauseDuration = 0.05;
    const cycleDuration = beepDuration + pauseDuration;

    for (let i = 0; i < outputSamples.length; i++) {
        

    }

    return output;
}