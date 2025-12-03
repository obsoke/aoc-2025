import { getFileLines } from "../util/readFile.ts";
import { assertEquals } from "@std/assert";
import { chunk } from "@std/collections/chunk";

export async function run() {
  const input = await getFileLines("./day02/input_01.txt", ",");
  const ranges = createRangesFromInput(input);
  const ids = getListOfIdsFromRanges(ranges);
  const invalidIds = findInvalidIdsFromRanges(ids);
  const answer = sum(invalidIds);
  assertEquals(answer, 23534117921);

  const invalidIds2 = findMultipleInvalidIdsFromRanges(ids);
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

export function getListOfIdsFromRanges(
  ranges: IdRange[],
): number[] {
  const ids: number[] = [];
  for (const { start, end } of ranges) {
    let now = start;
    while (now <= end) {
      ids.push(now);
      now++;
    }
  }
  return ids;
}

export function findInvalidIdsFromRanges(ids: number[]): number[] {
  const start = performance.now();
  const invalidIds: number[] = [];
  for (const id of ids) {
    const idStr = id.toString();

    if (idStr.charAt(0) === "0") continue;
    if (idStr.length % 2 !== 0) continue;

    const halfLength = idStr.length / 2;
    const lastHalf = idStr.substring(halfLength);

    if (idStr.startsWith(lastHalf)) invalidIds.push(id);
  }
  console.log(`took ${performance.now() - start}ms`);
  return invalidIds;
}

// hi i'm slow af
// (well not *that* slow but not instant so might as well be slow af)
export function findMultipleInvalidIdsFromRanges(ids: number[]): number[] {
  const start = performance.now();
  const invalidIds: number[] = [];
  for (const id of ids) {
    const idStr = id.toString();

    // rules
    if (idStr.charAt(0) === "0") continue; // does this even happen? why was this called out?!
    // NOTE: odd-digit numbers are allowed here, unlike pt1

    // prep. work
    const halfLength = Math.floor(idStr.length / 2);
    const nowSplit = idStr.split("");

    let chunkNum = 1;
    while (chunkNum < halfLength + 1) {
      const chunks = chunk(nowSplit, chunkNum);
      const first = chunks[0].join("");
      const doAllMatch = chunks.every((c) => c.join("") === first);
      if (doAllMatch) {
        invalidIds.push(id);
        break;
      }
      chunkNum++;
    }
  }
  console.log(`took ${performance.now() - start}ms`);
  return invalidIds;
}

export function sum(vals: number[]): number {
  return vals.reduce((prev, cur) => prev + cur, 0);
}
