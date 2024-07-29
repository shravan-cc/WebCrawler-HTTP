export function printPages(pages) {
  console.log("=========================");
  console.log("---------REPORT----------");
  console.log("=========================");
  const sortedPages = sortPages(pages);
  for (const sortPage of sortedPages) {
    const url = sortPage[0];
    const hits = sortPage[1];
    console.log(`Found hits ${hits} on ${url}`);
  }
  console.log("=========================");
  console.log("-------END REPORT--------");
  console.log("=========================");
}

export function sortPages(pages) {
  const pageArray = Object.entries(pages);
  pageArray.sort((a, b) => {
    const aHits = a[1];
    const bHits = b[1];
    return b[1] - a[1];
  });
  return pageArray;
}
