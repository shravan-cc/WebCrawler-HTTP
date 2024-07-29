import { test, expect, describe } from "vitest";
import { sortPages } from "./report";

test("Tests to normalize url", () => {
  const actual = {
    "https://wagslane.dev": 3,
    "https://wagslane.dev/path": 1,
  };
  const result = [
    ["https://wagslane.dev", 3],
    ["https://wagslane.dev/path", 1],
  ];
  const expected = sortPages(actual);
  expect(result).toEqual(expected);
});
