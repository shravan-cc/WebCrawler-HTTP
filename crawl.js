import { JSDOM } from "jsdom";

export function normalize(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

export function getUrlsFromHtml(htmlBody, baseURL) {
  const url = [];
  const htmlDomElement = new JSDOM(htmlBody);
  const linkElements = htmlDomElement.window._document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        url.push(urlObj.href);
      } catch (error) {
        console.log(`Error while fetching relative path: ${error.message}`);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        url.push(urlObj.href);
      } catch (error) {
        console.log(`Error while fetching absolute path: ${error.message}`);
      }
    }
  }
  return url;
}

export async function crawlURl(baseURL) {
  try {
    const response = await fetch(baseURL);

    if (response.status > 399) {
      console.log(
        `Error in url with status code ${response.status} on ${baseURL}`
      );
      return;
    }

    if (response.headers.get("content-type") !== "text/html") {
      console.log(`Content not in html on ${baseURL}`);
      return;
    }

    console.log(`Crawling URL: ${await response.text()}`);
  } catch (error) {
    console.log(`Fetch Failed on ${baseURL}`);
  }
}
