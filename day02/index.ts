import { getFileLines } from "../util/readFile.ts";
import { assertEquals } from "@std/assert";
import { chunk } from "@std/collections/chunk";

export async function run() {
  const input = await getFileLines("./day02/input_01.txt", ",");
  const ranges = createRangesFromInput(input);
  const invalidIds = findInvalidIdsFromRanges(ranges);
  const answer = sum(invalidIds);
  assertEquals(answer, 23534117921);

  const invalidIds2 = findMultipleInvalidIdsFromRanges(ranges);
  const answer2 = sum(invalidIds2);
  assertEquals(answer2, 31755323497);
}

export type IdRange = {
  start: number;
  end: number;
};

function createRangesFromInput(input: string[]): IdRange[] {
  return input.map((i) => {
    const ranges = i.split("-");
    return {
      start: Number.parseInt(ranges[0], 10),
      end: Number.parseInt(ranges[1], 10),
    };
  });
}

export function findInvalidIdsFromRanges(ranges: IdRange[]): number[] {
  const start = performance.now();
  const invalidIds: number[] = [];
  for (const { start, end } of ranges) {
    let now = start;
    while (now <= end) {
      const nowStr = now.toString();
      const nowNum = now;
      now++;
      if (nowStr.charAt(0) === "0") continue;
      if (nowStr.length % 2 !== 0) continue;
      const halfLength = nowStr.length / 2;
      const lastHalf = nowStr.substring(halfLength);
      if (nowStr.startsWith(lastHalf)) invalidIds.push(nowNum);
    }
  }
  console.log(`took ${performance.now() - start}ms`);
  return invalidIds;
}

// hi i'm slow af
// (well not *that* slow but not instant so might as well be slow af)
export function findMultipleInvalidIdsFromRanges(ranges: IdRange[]): number[] {
  const start = performance.now();
  const invalidIds: number[] = [];
  for (const { start, end } of ranges) {
    let now = start;
    while (now <= end) {
      const nowStr = now.toString();
      const nowNum = now;
      now++;

      // rules
      if (nowStr.charAt(0) === "0") continue; // does this even happen? why was this called out?!
      // NOTE: odd-digit numbers are allowed here, unlike pt1

      // prep. work
      const halfLength = Math.floor(nowStr.length / 2);
      const nowSplit = nowStr.split("");

      // oh no, 3 nested loops!
      let chunkNum = 1;
      while (chunkNum < halfLength + 1) {
        const chunks = chunk(nowSplit, chunkNum);
        const first = chunks[0].join("");
        const doAllMatch = chunks.every((c) => c.join("") === first);
        if (doAllMatch) {
          invalidIds.push(nowNum);
          break;
        }
        chunkNum++;
      }
    }
  }
  console.log(`took ${performance.now() - start}ms`);
  return invalidIds;
}

export function sum(vals: number[]): number {
  return vals.reduce((prev, cur) => prev + cur, 0);
}
