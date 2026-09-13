function writeAscii(
    view: DataView,
    offset: number,
    text: string
): void {
    for (let i = 0; i < text.length; i++) {
        view.setUint8(
            offset + i,
            text.charCodeAt(i)
        );
    }
}

export function encodeWav(
    buffer: AudioBuffer
): Blob {
    const channelCount = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const frames = buffer.length;
    const bitsPerSample = 16;
    const bytesPerSample = bitsPerSample / 8;
    const blockAlign = channelCount * bytesPerSample;
    const dataSize = frames * blockAlign;

    const output = new ArrayBuffer(44 + dataSize);
    const view = new DataView(output);

    writeAscii(view, 0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeAscii(view, 8, "WAVE");

    writeAscii(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channelCount, true);
    view.setUint32(24, sampleRate, true);

    const byteRate = sampleRate * blockAlign;
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);

    writeAscii(view, 36, "data");
    view.setUint32(40, dataSize, true);

    let offset = 44;

    for (let frame = 0; frame < frames; frame++) {
        for (let channel = 0; channel < channelCount; channel++) {
            const samples = buffer.getChannelData(channel);
            const sample = Math.max(-1, Math.min(1, samples[frame]));

            const value =
                sample < 0
                    ? sample * 0x8000
                    : sample * 0x7fff;

            view.setInt16(offset, value, true);
            offset += 2;
        }
    }

    return new Blob([output], {
        type: "audio/wav",
    });
}

