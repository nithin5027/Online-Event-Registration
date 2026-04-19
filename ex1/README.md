# EX-1-AIWEB

Project: Online Event Registration & Promotional Portal Using HTML5

Author: shahiil

Overview
--------
This repository contains a single-page HTML5 event registration portal (`event.html`) that demonstrates integration of media (banner image, promotional video, background audio) and an HTML5 registration form (text, email, date, radio, select, textarea, file upload). The page is styled with plain CSS (no external frameworks) and includes small animations and responsive layout tweaks.

Files
-----
- `event.html` — Main HTML file (media + registration form).
- `download.jpeg` — Banner image used by `event.html` (place your own image here).
- `Screenshot from 2026-01-20 23-16-49.png` — Screenshot showing improved layout (media + form).
- `Screenshot from 2026-01-20 23-17-03.png` — Additional screenshot.
- `exc.txt` — Original assignment / instructions.
- `REPORT.md` — Test case results and notes (this repository).

How to view locally
-------------------
1. Ensure all files are in the same folder (`ex1`).
2. Open `event.html` in a browser by double-clicking it or serving the folder with a simple HTTP server.

Optional: serve with Python (recommended to avoid video/audio CORS issues):

```bash
cd ex1
python3 -m http.server 8000
# then open http://localhost:8000/event.html in your browser
```

Screenshots
-----------
Layout and styling screenshots (click to open full size):

![Event page layout - media & form](Screenshot%20from%202026-01-20%2023-16-49.png)

![Event page layout - responsive view](Screenshot%20from%202026-01-20%2023-17-03.png)




Notes
-----
- If your `download.jpeg` is large, optimize it for web to speed page load.
- Browsers will perform native form validation for `type="email"` and `required` fields.
- If audio or video do not autoplay, use the native controls to play them; some browsers restrict autoplay.
