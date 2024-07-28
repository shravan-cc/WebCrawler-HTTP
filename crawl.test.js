import { normalize, getUrlsFromHtml } from "./crawl";
import { test, expect, describe } from "vitest";

describe("Tests blocks for normalizing the urls", () => {
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
});

describe("Tests blocks for getting urls from html elements", () => {
  test("Tests for getting url from html body for absolute path", () => {
    const inputHTMLBody = `
    <html>
      <body>
        <a href="https://blog.boot.dev">Blog boot.dev</a>
      </body>
    </html>
    `;
    const baseURL = "https://blog.boot.dev";
    const expected = getUrlsFromHtml(inputHTMLBody, baseURL);
    const result = ["https://blog.boot.dev/"];
    expect(expected).toEqual(result);
  });

  test("Tests for getting url from html body for relative path", () => {
    const inputHTMLBody = `
    <html>
      <body>
        <a href="/path/">Blog boot.dev</a>
      </body>
    </html>
    `;
    const baseURL = "https://blog.boot.dev";
    const expected = getUrlsFromHtml(inputHTMLBody, baseURL);
    const result = ["https://blog.boot.dev/path/"];
    expect(expected).toEqual(result);
  });

  test("Tests for getting multiple urls from html body for both relative and absolute path", () => {
    const inputHTMLBody = `
    <html>
      <body>
        <a href="https://blog.boot.dev/">Blog boot.dev</a>
         <a href="/path/">Blog boot.dev</a>
      </body>
    </html>
    `;
    const baseURL = "https://blog.boot.dev";
    const expected = getUrlsFromHtml(inputHTMLBody, baseURL);
    const result = ["https://blog.boot.dev/", "https://blog.boot.dev/path/"];
    expect(expected).toEqual(result);
  });

  test("Tests for getting url which is invalid", () => {
    const inputHTMLBody = `
    <html>
      <body>
        <a href="invalid">Blog boot.dev</a>
      </body>
    </html>
    `;
    const baseURL = "https://blog.boot.dev";
    const expected = getUrlsFromHtml(inputHTMLBody, baseURL);
    const result = [];
    expect(expected).toEqual(result);
  });
});
