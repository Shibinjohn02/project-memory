export const textReader = {
  read(buffer: Buffer): string {
    return buffer.toString("utf-8");
  },
};