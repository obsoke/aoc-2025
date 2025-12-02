import { assertEquals } from "@std/assert";
import { Instruction, spinFromNumber } from "./index.ts";

Deno.test("day 01 part 02: multiple spins around", () => {
  const instructions: Instruction[] = [
    { direction: "left", distance: 350 },
  ];
  let allZeroCounts = 0;
  const countAllZeroFunc = (num: number) => allZeroCounts += num;

  const lastNumber = spinFromNumber(
    instructions,
    50,
    undefined,
    countAllZeroFunc,
  );

  assertEquals(lastNumber, 0);
  assertEquals(allZeroCounts, 4);
});

Deno.test("day 01 part 02: moving off of 0 - left", () => {
  const instructions: Instruction[] = [
    { direction: "left", distance: 50 },
    { direction: "left", distance: 5 },
  ];
  let allZeroCounts = 0;
  const countAllZeroFunc = (num: number) => allZeroCounts += num;

  const lastNumber = spinFromNumber(
    instructions,
    50,
    undefined,
    countAllZeroFunc,
  );

  assertEquals(lastNumber, 95);
  assertEquals(allZeroCounts, 1);
});

Deno.test("day 01 part 02: moving off of 0 - right", () => {
  const instructions: Instruction[] = [
    { direction: "right", distance: 50 },
    { direction: "right", distance: 5 },
  ];
  let allZeroCounts = 0;
  const countAllZeroFunc = (num: number) => allZeroCounts += num;

  const lastNumber = spinFromNumber(
    instructions,
    50,
    undefined,
    countAllZeroFunc,
  );

  assertEquals(lastNumber, 5);
  assertEquals(allZeroCounts, 1);
});

Deno.test("day 01 part 02: moving off of 0 - odd", () => {
  const instructions: Instruction[] = [
    { direction: "left", distance: 50 },
    { direction: "left", distance: 5 },
    { direction: "right", distance: 5 },
    { direction: "right", distance: 10 },
    { direction: "left", distance: 20 },
  ];
  let allZeroCounts = 0;
  const countAllZeroFunc = (num: number) => allZeroCounts += num;

  const lastNumber = spinFromNumber(
    instructions,
    50,
    undefined,
    countAllZeroFunc,
  );

  assertEquals(lastNumber, 90);
  assertEquals(allZeroCounts, 3);
});

Deno.test("day 01 part 02 example", () => {
  const instructions: Instruction[] = [
    { direction: "left", distance: 68 },
    { direction: "left", distance: 30 },
    { direction: "right", distance: 48 },
    { direction: "left", distance: 5 },
    { direction: "right", distance: 60 },
    { direction: "left", distance: 55 },
    { direction: "left", distance: 1 },
    { direction: "left", distance: 99 },
    { direction: "right", distance: 14 },
    { direction: "left", distance: 82 },
  ];
  let allZeroCounts = 0;
  const countAllZeroFunc = (num: number) => allZeroCounts += num;

  const lastNumber = spinFromNumber(
    instructions,
    50,
    undefined,
    countAllZeroFunc,
  );

  assertEquals(lastNumber, 32);
  assertEquals(allZeroCounts, 6);
});
