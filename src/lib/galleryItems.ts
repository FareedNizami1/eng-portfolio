import type { GalleryItem } from "@/components/ProjectGallery3D";
import type { CadProjectItem } from "@/data/cadSoftware";
import type { ProjectEntry } from "@/data/portfolio";

export const DIALOG_PANEL_CLASS =
  "relative z-10 flex h-[90vh] w-[90vw] max-h-[90vh] max-w-[90vw] flex-col overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] shadow-[0_24px_80px_rgba(0,0,0,0.45)]";

export function buildProjectGalleryItems(project: ProjectEntry): GalleryItem[] {
  const items: GalleryItem[] = [];
  if (project.video) {
    items.push({ type: "video", src: project.video, poster: project.images[0] });
  }
  for (const src of project.images) {
    items.push({ type: "image", src });
  }
  return items;
}

export function buildCadGalleryItems(project: CadProjectItem): GalleryItem[] {
  const items: GalleryItem[] = [];
  const images = project.images?.length
    ? project.images
    : project.imageUrl
      ? [project.imageUrl]
      : [];

  if (project.video) {
    items.push({
      type: "video",
      src: project.video,
      poster: images[0],
    });
  }

  for (const src of images) {
    if (!items.some((item) => item.type === "image" && item.src === src)) {
      items.push({ type: "image", src });
    }
  }

  return items;
}
