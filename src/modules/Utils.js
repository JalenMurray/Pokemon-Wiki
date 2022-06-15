"use strict";

export function format(item) {
  if (typeof item == "string") {
    return item.charAt(0).toUpperCase() + item.slice(1);
  } else {
    if (item < 10) return `00${item}`;
    if (item < 100) return `0${item}`;
  }
}
