// TODO Export a .csv file with the report

function printReport(pages) {
  console.log('=================');
  console.log('=====REPORT======');
  console.log('=================');
  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const hits = sortedPage[1];
    console.log(`Found ${hits} links to page: ${url}`);
  }
}

function sortPages(pages) {
  // this gives the structure we want, an array of arrays
  // The Object.entries() returns an array of a given object's key-value pairs.
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    aHits = a[1];
    bHits = b[1];
    return b[1] - a[1];
  });
  return pagesArr;
}

module.exports = {
  sortPages,
  printReport,
};
