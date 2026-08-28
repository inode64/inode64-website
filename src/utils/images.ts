type ImageModule = { default: ImageMetadata };

export function toImageMap(globResult: Record<string, ImageModule>): Record<string, ImageMetadata> {
  return Object.fromEntries(
    Object.entries(globResult).map(([path, mod]) => {
      const name = path.split("/").pop()?.split(".")[0] ?? "";
      return [name, mod.default];
    }),
  );
}
