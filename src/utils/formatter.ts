export function stripTag(string: string) {
  const tagRegex = /<\/?[^>]*>/gi;
  return string.replaceAll(tagRegex, '');
}
