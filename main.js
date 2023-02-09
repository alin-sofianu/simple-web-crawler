const { crawlPage } = require('./crawl.js');

// takes as input a website and crawl it. Takes the input from command line
async function main() {
  // 3 because first is the program node itself, second is this program, and 3rd is the input argument from terminal
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

  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}
main();
