export async function getFileLines(path: string): Promise<string[]> {
  const input = await Deno.readTextFile(path);
  return input.split("\n").filter((v) => v);
}
