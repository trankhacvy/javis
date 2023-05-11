import cx, { ArgumentArray } from "classnames";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ArgumentArray) {
  return twMerge(cx(inputs));
}

export function timeAgo(timestamp: Date | string) {
  if (!timestamp) {
    return "";
  }
  if (typeof timestamp === "string") {
    timestamp = new Date(timestamp);
  }
  const units = [
    { name: "second", limit: 60, in_seconds: 1 },
    { name: "minute", limit: 3600, in_seconds: 60 },
    { name: "hour", limit: 86400, in_seconds: 3600 },
    { name: "day", limit: 345600, in_seconds: 86400 },
  ];
  let diff = (new Date().getTime() - timestamp.getTime()) / 1000;
  if (diff < 5) return "a few moments ago";
  let _ago;
  for (const unit of units) {
    if (diff < unit.limit) {
      diff = Math.floor(diff / unit.in_seconds);
      _ago = diff + " " + unit.name + (diff > 1 ? "s" : "");
      break;
    }
  }
  if (_ago) {
    return _ago + " ago";
  } else {
    return timestamp.toLocaleDateString();
  }
}
