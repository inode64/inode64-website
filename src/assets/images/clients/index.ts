import { toImageMap } from "@/utils/images";

const raw = import.meta.glob<{ default: ImageMetadata }>("./*.{png,jpg,jpeg,svg,gif,webp}", { eager: true });

export const clientLogos = toImageMap(raw);
