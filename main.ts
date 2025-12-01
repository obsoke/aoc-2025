import { parseArgs } from "@std/cli/parse-args";

if (import.meta.main) {
  const flags = parseArgs(Deno.args, {
    string: ["day"],
  });
  if (!flags.day) {
    console.error("ERROR: Must supply --day=N flag.");
    Deno.exit(1);
  }
  const dayNum = Number.parseInt(flags.day, 10);
  if (isNaN(dayNum)) {
    console.error("ERROR: Invalid day value provided.");
    Deno.exit(1);
  }
  const dayStr = dayNum.toString().padStart(2, "0");
  const dayPath = `day${dayStr}`;
  const module = await import(`./${dayPath}/index.ts`);
  await module.run();
}
