import { crawlURl } from "./crawl.js";

function main() {
  if (process.argv.length < 3) {
    console.log("No website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("Too many command line arguments");
    process.exit(1);
  }

  const baseURL = process.argv[2];
  console.log(`Start to crawl ${baseURL}`);
  crawlURl(baseURL);
}

main();
