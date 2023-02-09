const { normalizeURL } = require('./crawl');
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
