# Clipora AI — website preview

This is a deployable frontend preview for Clipora AI.

## Deploy to Netlify from GitHub
1. Upload the contents of this folder to the root of your private `clipora-ai` GitHub repository (or a new repository).
2. In Netlify, choose **Add new project → Import an existing project**.
3. Connect GitHub and select `clipora-ai`.
4. Set the base directory to blank, build command to blank, and publish directory to `.`.
5. Deploy.

## What works in this build
- Responsive landing/dashboard interface
- Choose a video from the phone or computer
- In-browser video preview
- Set clip title and start/end timestamps
- Choose Original or 9:16 as a saved output preference
- Save clip project settings in the current browser

## Important limitations
This is a frontend preview, not the complete AI product. It does **not** yet render/export a new video, detect highlights with AI, generate subtitles, upload files to Supabase, sync projects across devices, or provide accounts/payments. Those require a working backend and processing service. Existing Railway/Supabase resources are not called by this frontend.

Video files are selected locally and are not uploaded to a server. Project metadata is saved in browser localStorage. Clearing browser data can remove saved project entries.
