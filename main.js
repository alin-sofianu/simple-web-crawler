const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

// takes as input a website and crawls it. Takes the input from command line, command example: "npm start https://example.com"
async function main() {
  // 3 because first is the program node itself, second is this program, and 3rd is the input argument from terminal, https://example.com
  if (process.argv.length < 3) {
    console.log('No website provisioned');
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log('Too many args');
    process.exit(1);
  }
  const baseUrl = process.argv[2];
  console.log(`Starting crawl for website: ${baseUrl}`);
  const pages = await crawlPage(baseUrl, baseUrl, {});

  printReport(pages);
}
main();
