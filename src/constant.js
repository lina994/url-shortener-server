// 100 new links per min * 60min * 24h * 365d * 10y < 600 million
// postgresql - The maximum number of available ids given the int constraint is +2,147,483,627
// 62^6 ~ 56-57 billion possible strings
// 62^5 ~ 900 million possible strings

export const SHORT_LINK_LEN = 5;
export const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // 26 * 2 + 10 = 62
export const BASE = CHARS.length; // 62

