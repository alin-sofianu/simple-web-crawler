const { JSDOM } = require('jsdom');

async function crawlPage(currentURL) {
  console.log(`Actively crawling: ${currentURL}`);
  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(`Error in fetch with status code: ${resp.status}`);
      return;
    }

    const contentType = await resp.headers.get('content-type');
    if (contentType.includes('text/html')) {
      console.log(
        `non html response, content type ${contentType}, on page: ${currentURL}`
      );
      return;
    }

    console.log(await resp.text());
  } catch (error) {
    console.log(`Error in fetch: ${error.message}`);
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  //this is an array of strings
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');
  for (const link of linkElements) {
    // if first character is slash, it's a relative URL
    if (link.href.slice(0, 1) === '/') {
      // relative
      try {
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

  console.log(urlObj, hostPath);
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
