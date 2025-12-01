import { getFileLines } from "../util/readFile.ts";

export async function run() {
  const input = await getFileLines("./day01/input.txt");
  console.log("input: ");
  console.log(input);
}
