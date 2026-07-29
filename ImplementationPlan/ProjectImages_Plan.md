# Project Card Images — Implementation Plan

## Overview

The portfolio's **Featured Projects** section (in both `ProjectsPage.tsx` and `ProjectsScreen.tsx`) already supports a single `image` field per project card and renders it in two layouts:

- **Desktop**: Left-side column (`w-48`, full-height, `object-cover` with gradient overlay)
- **Mobile**: Top banner (`aspect-[16/9]`, full-width)

Currently, images are loaded as **local static imports** from `src/photo/`. The goal is to switch to **backend-hosted URLs** and optionally support multiple images per project.

---

## Current Image Structure

```ts
// Current — local static import
import jansamparkPhoto from '../photo/jansampark.png';

const projects: Project[] = [
  {
    title: "JanSampark",
    image: jansamparkPhoto,  // ? local file
    ...
  }
];
```

**Files affected:**
- `src/pages/ProjectsPage.tsx`
- `src/components/ProjectsScreen.tsx`

---

## Current Card Layout (Desktop)

```
+---------------------------------------------------------+
¦  +----------+  Title + Badge                            ¦
¦  ¦          ¦  Subtitle                                 ¦
¦  ¦  IMAGE   ¦                                           ¦
¦  ¦  (w-48)  ¦  Description text...                     ¦
¦  ¦          ¦                                           ¦
¦  +----------+  • Highlights                             ¦
¦                Tech pills  |  [GitHub]  [Demo]          ¦
+---------------------------------------------------------+
```

---

## Option A — Single Hero Image (Simple Swap)

**What changes:**
- Remove local `import` statements for photos
- Replace `image: localVar` with `image: "https://your-backend.com/uploads/..."` in the project data array
- No UI/rendering changes needed

**Interface stays the same:**
```ts
interface Project {
  image: string; // now a URL instead of a local import
  ...
}
```

**Change in project data:**
```ts
// BEFORE
import jansamparkPhoto from '../photo/jansampark.png';
image: jansamparkPhoto

// AFTER
image: "https://your-backend.com/uploads/projects/jansampark.png"
```

? Zero rendering work. Images load from backend URLs directly in the existing `<img src={project.image} />` tags.

---

## Option B — Multiple Images Per Project (Gallery/Carousel)

**What changes:**
- Extend `Project` interface to include `images: string[]`
- Replace the single image panel with a mini carousel / clickable image strip
- Add prev/next navigation or dot indicators inside the image panel
- Optionally add a full-screen lightbox on click

**Interface update:**
```ts
interface Project {
  images: string[];  // array of backend URLs
  // image?: string;  // keep as fallback if needed
  ...
}
```

**UI enhancement ideas for the image panel:**
1. **Image strip** — show thumbnails below the main image (click to switch)
2. **Prev/Next arrows** — simple carousel inside the `w-48` left panel (desktop) or the 16:9 banner (mobile)
3. **Dot indicators** — subtle pagination dots at the bottom of the image panel
4. **Lightbox** — click the image to open a full-screen modal gallery

---

## Recommended Approach

| | Option A | Option B |
|---|---|---|
| **Effort** | Minimal (data only) | Medium (UI + data) |
| **Visual impact** | Low | High |
| **Best for** | Single screenshot / cover image | Apps with multiple UI screenshots |

> **Recommended**: Start with **Option A** to wire up the backend URLs, then evolve to **Option B** if you want to showcase multiple screenshots per project.

---

## Image Loading Best Practices

When switching to remote URLs, add these quality-of-life improvements:

1. **Skeleton placeholder** while image loads
2. **Error fallback** for broken URLs:
   ```tsx
   <img onError={(e) => e.currentTarget.src = '/fallback.png'} ... />
   ```
3. **Lazy loading** — already implemented (`loading="lazy"` present in both files ?)

---

## Files to Edit

| File | Change |
|---|---|
| `src/pages/ProjectsPage.tsx` | Remove local photo imports ? add backend URL strings to project data |
| `src/components/ProjectsScreen.tsx` | Same as above |
| `src/photo/` directory | Can be removed once backend URLs are live (optional) |

---

## Open Questions

1. **Single or multiple images per project?** — Determines whether to use Option A or B
2. **Backend URL format** — What is the base URL and path structure for uploaded images?
3. **Image dimensions** — What size/resolution will the backend serve? (Affects aspect ratio choices)
4. **Fallback behavior** — Should there be a placeholder if an image URL is missing or broken?
