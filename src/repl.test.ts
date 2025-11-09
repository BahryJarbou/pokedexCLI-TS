import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: " Hello World ",
    expected: ["hello", "world"],
  },
  {
    input: "Woooo    haaaaaaH ",
    expected: ["woooo", "haaaaaah"],
  },
  {
    input: "",
    expected: [],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
