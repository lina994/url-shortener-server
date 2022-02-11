import { SHORT_LINK_LEN } from '../constant.js'

export function isValidShortLink(shortLink) {
  return shortLink.length === SHORT_LINK_LEN && /^[A-Za-z\d]*$/.test(shortLink);
}

