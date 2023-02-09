const { normalizeURL, getURLsFromHTML } = require('./crawl');
const { test, expect } = require('@jest/globals');

test('normalizeUrl strip protocol', () => {
  const input = 'https://blog.boot.dev/path';
  const actualOutput = normalizeURL(input);
  const expectedOutput = 'blog.boot.dev/path';
  expect(actualOutput).toEqual(expectedOutput);
});

test('normalizeUrl strip trailing slash', () => {
  const input = 'https://blog.boot.dev/path/';
  const actualOutput = normalizeURL(input);
  const expectedOutput = 'blog.boot.dev/path';
  expect(actualOutput).toEqual(expectedOutput);
});

test('normalizeUrl Capitals', () => {
  const input = 'https://BLOG.boot.dev/path/';
  const actualOutput = normalizeURL(input);
  const expectedOutput = 'blog.boot.dev/path';
  expect(actualOutput).toEqual(expectedOutput);
});

test('normalizeUrl strip http', () => {
  const input = 'http://blog.boot.dev/path/';
  const actualOutput = normalizeURL(input);
  const expectedOutput = 'blog.boot.dev/path';
  expect(actualOutput).toEqual(expectedOutput);
});

test('getURLsFromHTML absolute URLs', () => {
  const inputHTMLBody = `<html><body><a href="https://blog.boot.dev/">Boot.dev Blog</a></body></html>`;
  const inputBaseURL = 'https://blog.boot.dev';
  const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expectedOutput = ['https://blog.boot.dev/'];
  expect(actualOutput).toEqual(expectedOutput);
});

// a relative url does not include the protocol and domain, it has just the path
test('getURLsFromHTML absolute and relative URLs', () => {
  const inputHTMLBody = `<html><body><a href="/path1/">Boot.dev Blog 1</a><a href="https://blog.boot.dev/path2/">Boot.dev Blog 2</a></body></html>`;
  const inputBaseURL = 'https://blog.boot.dev';
  const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expectedOutput = [
    'https://blog.boot.dev/path1/',
    'https://blog.boot.dev/path2/',
  ];
  expect(actualOutput).toEqual(expectedOutput);
});

test('getURLsFromHTML invalid URL', () => {
  const inputHTMLBody = `<html><body><a href="invalid">Boot.dev Blog</a></body></html>`;
  const inputBaseURL = 'https://blog.boot.dev';
  const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expectedOutput = [];
  expect(actualOutput).toEqual(expectedOutput);
});
