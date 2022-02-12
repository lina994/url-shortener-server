import { SHORT_LINK_LEN } from '../constant.js';

export function isValidChars(shortLink) {
  return /^[A-Za-z\d]*$/.test(shortLink);
}

export function isValidShortLink(shortLink) {
  return shortLink.length === SHORT_LINK_LEN && isValidChars(shortLink);
}

