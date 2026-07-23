// Single source of truth for gallery/slider images (files live in /public/images).
// Filenames are encoded so spaces/parentheses resolve correctly in URLs.
export const galleryFiles = [
  '287A0771.JPG.jpeg',
  'WhatsApp Image 2026-07-23 at 4.20.38 PM.jpeg',
  '287A0868.JPG.jpeg',
  'WhatsApp Image 2026-07-23 at 4.20.39 PM.jpeg',
  '287A0901.JPG.jpeg',
  'WhatsApp Image 2026-07-23 at 4.38.13 PM.jpeg',
  'WhatsApp Image 2026-07-23 at 4.38.13 PM (1).jpeg',
  'WhatsApp Image 2026-07-23 at 4.20.39 PM (1).JPG',
]

export const galleryImages = galleryFiles.map((f) => encodeURI(`/images/${f}`))
