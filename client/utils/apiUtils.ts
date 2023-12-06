export function formatEndpoint(
  endpoint: string,
  replacements: Record<string, string>
): string {
  let formatEndpoint = endpoint;
  for (const placeholder in replacements) {
    formatEndpoint = formatEndpoint.replace(
      `{${placeholder}}`,
      replacements[placeholder]
    );
  }

  return formatEndpoint;
}
