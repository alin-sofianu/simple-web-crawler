const { JSDOM } = require('jsdom');

// this is a recursive function
async function crawlPage(baseURL, currentURL, pages) {
  // make sure CurrentURL is on the same domain as baseURL. I want to crawl 1 single website, no external links.
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;
  console.log(`Actively crawling: ${currentURL}`);

  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(`Error in fetch with status code: ${resp.status}`);
      return pages;
    }
    // check to see if what we get from a website is valid html, by checking it's content-type header
    const contentType = await resp.headers.get('content-type');
    // i use .include here, because there might be some other info in the string, like charset
    if (!contentType.includes('text/html')) {
      console.log(
        `Non html response, content type ${contentType}, on page: ${currentURL}`
      );
      return pages;
    }

    const htmlBody = await resp.text();

    const nextURLs = getURLsFromHTML(htmlBody, baseURL);
    // recursively crawl pages
    // for...of for arrays and for...in for objects
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (error) {
    console.log(`Error in fetch: ${error.message}`);
  }
  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  //urls, the returned value, is an array of strings
  const urls = [];

  const dom = new JSDOM(htmlBody);
  // get all anchor tags
  const linkElements = dom.window.document.querySelectorAll('a');
  for (const link of linkElements) {
    // if first character is slash, it's a relative URL
    if (link.href.slice(0, 1) === '/') {
      // relative
      try {
        // we wrap this in a try/catch because the URL constructor itself does some checking on the URL's and throws an error if necessary
        const urlObj = new URL(`${baseURL}${link.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`Error with relative url: ${error.message}`);
      }
    } else {
      // absolute
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`Error with relative absolute: ${error.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}
module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
