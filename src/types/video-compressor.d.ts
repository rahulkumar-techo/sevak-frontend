declare module 'video-compressor' {
  interface VideoCompressorOptions {
    quality?: number; // 0 to 1
    maxWidth?: number;
    maxHeight?: number;
    bitrate?: number;
  }

  export default class VideoCompressor {
    constructor(file: File, options?: VideoCompressorOptions);
    compress(): Promise<Blob>;
  }
}
