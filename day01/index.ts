import { getFileLines } from "../util/readFile.ts";
import { assertEquals } from "@std/assert";

export async function run() {
  const input = await getFileLines("./day01/input_01.txt");
  const instructions = parseInstructions(input);
  let zeroCount = 0;
  const countZeroFunc = (n: number) => n === 0 ? zeroCount += 1 : null;
  spinFromNumber(instructions, 50, countZeroFunc);
  assertEquals(zeroCount, 1040);

  let allZeroCounts = 0;
  const countAllZeroFunc = (num: number) => allZeroCounts += num;
  spinFromNumber(instructions, 50, undefined, countAllZeroFunc);
  assertEquals(allZeroCounts, 6027);
}

export type Instruction = {
  direction: "left" | "right";
  distance: number;
};

function parseInstructions(input: string[]): Instruction[] {
  return input
    .map((i) => {
      const directionChar = i[0];
      const direction = directionChar === "L" ? "left" : "right";
      const distanceStr = i.substring(1);
      const distance = Number.parseInt(distanceStr, 10);
      return { direction, distance };
    });
}

export function spinFromNumber(
  instructions: Instruction[],
  startingAt: number,
  onPostIter?: (n: number) => void,
  onFullRotation?: (n: number) => void,
): number {
  let currentNum = startingAt;
  for (let i = 0; i < instructions.length; i++) {
    const { distance, direction } = instructions[i];
    const distanceValue = distance % 100;
    onFullRotation?.(Math.floor(distance / 100));

    const differ = direction === "left" ? -distanceValue : distanceValue;
    const nextValue = currentNum + differ;
    if (nextValue >= 100) {
      if (currentNum !== 0) onFullRotation?.(1);
      currentNum = nextValue % 100;
    } else if (nextValue <= 0) {
      if (currentNum !== 0) onFullRotation?.(1);
      currentNum = (100 - Math.abs(nextValue)) % 100;
    } else {
      currentNum = nextValue;
    }

    onPostIter?.(currentNum);
  }

  return currentNum;
}
