const raw = import.meta.glob<{ default: ImageMetadata }>("./*.{png,jpg,jpeg,svg,gif,webp}", { eager: true });

export const porfolioImages = Object.fromEntries(
  Object.entries(raw).map(([path, mod]) => {
    const name = path.split("/").pop()?.split(".")[0] ?? "";
    return [name, mod.default];
  }),
);
