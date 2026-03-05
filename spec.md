# আমার ঘুমন্ত ভিলা (Amar Ghumontovilla)

## Current State
The app is a Bengali literary portal with sections for poems, stories (গল্প), and essays. Literary content is stored in the Motoko backend via `createDraft` and `publishContent` APIs. The `ContentList` component filters stories by checking if the title contains keywords like 'গল্প', 'story', or 'আশ্রয়'. The story "আশ্রয়হীন" was added previously and is filtered in because its title contains 'আশ্রয়'. A new story "ভয়হত্যা" needs to be added to the stories section.

## Requested Changes (Diff)

### Add
- A new story titled "ভয়হত্যা" to the stories (গল্প) section, with full Bengali text content
- A `useSeedContent` hook that checks if "ভয়হত্যা" exists in published content; if not, it creates and publishes it via the admin actor (runs once on admin login)
- Update `ContentList` filter so stories section shows all content that is NOT a poem (no 'কবিতা'/'poem' keyword) and NOT an essay (no 'প্রবন্ধ'/'essay' keyword) — this is a more robust fallback so any future story added without a keyword still appears

### Modify
- `ContentList.tsx`: Update stories filter to use a more inclusive approach — show content that doesn't match poem or essay keywords, in addition to content that explicitly matches story keywords
- `App.tsx` or `AdminPage.tsx`: Call the `useSeedContent` hook so the story is seeded when the admin is active

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/hooks/useSeedContent.ts` — a hook that uses `useIsAdmin`, `usePublishedContent`, `useCreateDraft`, and `usePublishContent` to check if "ভয়হত্যা" is already published; if not and user is admin, create the draft and immediately publish it
2. Update `ContentList.tsx` filter for stories: show items that match story keywords OR do not match poem/essay keywords (negative filter as fallback)
3. Call `useSeedContent` in `App.tsx` (top-level, runs once)
4. The story content should be formatted as HTML with `<p>` tags for proper rendering
