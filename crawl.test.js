import { normalize } from "./crawl";
import { test, expect } from "vitest";

test("Tests to normalize url", () => {
  const actual = "https://boot.dev/path";
  const result = "boot.dev/path";
  const expected = normalize(actual);
  expect(result).toEqual(expected);
});

test("Tests to normalize url if tend with /", () => {
  const actual = "https://boot.dev/path/";
  const result = "boot.dev/path";
  const expected = normalize(actual);
  expect(expected).toEqual(result);
});

test("Tests to normalize url if they are in capitals", () => {
  const actual = "https://Boot.dev/path/";
  const result = "boot.dev/path";
  const expected = normalize(actual);
  expect(expected).toEqual(result);
});
