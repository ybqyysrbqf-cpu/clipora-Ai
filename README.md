# Clipora AI — starter website

This is a responsive front-end prototype containing:
- `index.html`: public Clipora AI landing/upload interface.
- `studio.html`: separate Studio-style admin dashboard mock-up.

## Run locally
Open `index.html` in a modern browser. Open `studio.html` for the admin mock-up.
For local development, you can also run `python -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Important: prototype limitations
This is a UI starter, not a production AI clipping service. The upload selector currently selects a local file and displays its name; it does not upload or process video. AI moment detection, transcription/captions, reframing, export, user accounts, database persistence and admin permissions require a backend and external services. Studio settings are saved only in the current browser's local storage and are not secure controls.

Before public launch:
1. Build a backend upload pipeline with storage, file-size/type validation and job status.
2. Add a video-processing worker using FFmpeg.
3. Integrate speech-to-text and a clip-ranking workflow.
4. Add authentication and database row-level security.
5. Protect Studio with server-verified admin roles; never rely on hiding a page link.
6. Add quotas/rate limits and privacy/retention policies.
7. Configure hosting, domain and HTTPS.

The main website and Studio can later be deployed as `clipora.ai` and `studio.clipora.ai` (or equivalent domains).
