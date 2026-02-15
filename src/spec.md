# Specification

## Summary
**Goal:** Build a single-page literary portal (“Amar Ghumontovilla”) with section navigation, consistent floral heroes, per-section comments, a persisted contact form, Google Translate widget integration, SEO/social metadata, and a calm floral reading theme.

**Planned changes:**
- Create a single-page layout with top navigation for Home, Poems, Stories, Essays, and Contact; switch visible sections client-side and highlight the active section.
- Add a consistent hero banner to each section (local floral image + section title) with responsive layout.
- Implement per-section comments (Home/Poems/Stories/Essays): form + list, backend persistence, load-on-refresh, and empty-comment validation.
- Implement Contact section: display `contact@amarghumontovilla.in`, add Name/Email/Message form, validate inputs (including email), persist messages in the backend, and show a clear success state (clear/disable after send).
- Add a `google_translate_element` container and load the Google Translate element script defensively so failures don’t break the app.
- Configure SEO and social metadata: title, description, keywords, author, Open Graph tags, and canonical URL for `https://www.amarghumontovilla.in`, including a correct OG image path to the local static hero image.
- Apply a coherent nature-inspired floral theme across navigation, hero, content, buttons, and forms for long-form readability.
- Generate and include required static images under `frontend/public/assets/generated` and use them in the UI instead of external image links.

**User-visible outcome:** Users can navigate between sections without page reloads, read themed hero sections, leave comments per section that persist across refreshes, send a stored contact message with confirmation, use an embedded Google Translate widget (when available), and the site presents proper SEO/OG metadata and locally served floral imagery.
