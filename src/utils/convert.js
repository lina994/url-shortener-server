import { SHORT_LINK_LEN, CHARS, BASE } from '../constant.js'

function _paddingArr(c, arr, len) {
  while (arr.length < len) {
    arr.unshift(c);
  }
}

// Function to generate a short link (string) from id (number)
// base 62: a-z, A-Z, 0-9
export function idToShortLink(id) {
  const shortLink = [];
  while (id) {
    shortLink.unshift(CHARS.charAt(id % BASE));
    id = Math.floor(id / BASE);
  }
  _paddingArr('a', shortLink, SHORT_LINK_LEN);
  return shortLink.join('');
}

function _symbolToNum(c) {
  if (c >= 'a' && c <= 'z') {
    return c.charCodeAt(0) - 'a'.charCodeAt(0);
  } else if (c >= 'A' && c <= 'Z') {
    return c.charCodeAt(0) - 'A'.charCodeAt(0) + 26;
  }
  return c.charCodeAt(0) - '0'.charCodeAt(0) + 52;
}

// Function to get id (number) from a short link (string)
export function slugToId(shortLink) {
  return shortLink.split('').reduce((prev, c) => _symbolToNum(c) + prev * BASE, 0);
}

