function writeText(
    view: DataView, 
    offset: number,
    text: string
) {
    for (let i = 0; i < text.length; i++) {
        view.setUint8(offset + i, text.charCodeAt(i));
    }
}

export function encodeWav(
    buffer: AudioBuffer
): Blob {
    const channelCount = 1;
    const sampleRate = buffer.sampleRate;
    const samples = buffer.getChannelData(0);
    const bytesPerSample = 2;
    const dataSize = samples.length * bytesPerSample;

    const arrayBuffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(arrayBuffer);

    writeText(view, 0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeText(view, 8, "WAVE");
    writeText(view, 12, "fmt");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channelCount, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * channelCount * bytesPerSample, true);
    view.setUint16(32, channelCount * bytesPerSample, true);
    view.setUint16(34, 16, true);
    writeText(view, 36, "data");
    view.setUint32(40, dataSize, true);

    for (let i = 0; i < samples.length; i++) {
        const sample = Math.max(-1, Math.min(1, samples[i]));
        const integer = sample < 0 ? sample * 0x8000 : sample * 0x7fff;

        view.setInt16(44 + i * 2, integer, true);
    }
    
    return new Blob([arrayBuffer], { type: "audio/wav" });
}