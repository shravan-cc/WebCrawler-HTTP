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

export async function crawlURl(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedURL = normalize(currentURL);
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  pages[normalizedURL] = 1;

  console.log(`Actively Crawling: ${currentURL}`);
  try {
    const response = await fetch(currentURL);

    if (response.status > 399) {
      console.log(
        `Error in url with status code ${response.status} on ${currentURL}`
      );
      return pages;
    }

    if (!response.headers.get("content-type").includes("text/html")) {
      console.log(`Content not in html on ${currentURL}`);
      return pages;
    }

    const htmlBody = await response.text();
    const nextUrls = getUrlsFromHtml(htmlBody, baseURL);

    for (const urls of nextUrls) {
      pages = await crawlURl(baseURL, urls, pages);
    }
  } catch (error) {
    console.log(`Fetch Failed on ${currentURL}`);
  }
  return pages;
}
