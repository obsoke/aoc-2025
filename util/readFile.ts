export async function getFileLines(
  path: string,
  splitter = "\n",
): Promise<string[]> {
  const input = await Deno.readTextFile(path);
  return input.split(splitter).filter((v) => v);
}
