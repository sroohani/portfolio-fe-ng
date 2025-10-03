export const trimmedLinkText = (href: string): string => {
  let trimmed: string;

  if (href.startsWith("https://")) {
    trimmed = href.substring(8);
  } else if (href.startsWith("http://")) {
    trimmed = href.substring(7);
  } else {
    trimmed = href;
  }

  return trimmed;
};
