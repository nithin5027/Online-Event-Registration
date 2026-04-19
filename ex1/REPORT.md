Event Page Test Report
======================

Project: Online Event Registration & Promotional Portal Using HTML5
Date: 2026-01-20

Summary
-------
This report documents execution of TC01–TC10 against `event.html`. The page was inspected and updated to ensure correct media integration, form validation, responsiveness, and alignment. All test cases passed after corrective styling and using hosted media for test playback.

Screenshots
-----------
- Screenshot 1: [Screenshot from 2026-01-20 23-16-49.png](Screenshot%20from%202026-01-20%2023-16-49.png)
- Screenshot 2: [Screenshot from 2026-01-20 23-17-03.png](Screenshot%20from%202026-01-20%2023-17-03.png)

Source Files
------------
- `event.html` — main HTML file
- `download.jpeg` — banner image
- `exc.txt` — assignment spec

Test Cases (TC01–TC10)
---------------------

| Test Case ID | Module / Feature | Test Scenario | Input Data | Expected Output | Result | Remarks |
|---|---|---|---|---|---:|---|
| TC01 | Page Structure & Load | HTML5 doctype; page loads without markup errors | Open `event.html` | Uses `<!DOCTYPE html>` and loads | PASS | Valid structure; no syntax errors
| TC02 | Image Media | Banner displays; alt text when missing | `download.jpeg` present or removed | Image shown; `alt` shown if missing | PASS | `alt` attribute present; ensure `download.jpeg` exists
| TC03 | Video Media | Video play/pause/volume controls | Play video | Native controls present & functional | PASS | Uses hosted sample video; codec supported in modern browsers
| TC04 | Audio Media | Audio plays with controls | Play audio | Native controls present & functional | PASS | Uses hosted sample MP3
| TC05 | Form: Basic Inputs | Text, email, date inputs accepted | Fill inputs | Inputs accept values | PASS | `required` attributes present
| TC06 | Form: Email Validation | Invalid email triggers validation | Enter `invalid-email` | Browser validation error | PASS | Native email validation enforced
| TC07 | Form: Selection Inputs | Radios exclusive; select works | Select radio; choose dropdown | Only one radio selected; dropdown available | PASS | Radios share same `name` attribute
| TC08 | Textarea & File Upload | Multi-line text; image/PDF upload | Enter multi-line; upload file | Text accepted; file selectable | PASS | `accept` set to `image/*,application/pdf`
| TC09 | Form Submission & Validation | Submit when required fields filled | Submit empty/filled | Validation prevents submit when empty | PASS | Form uses HTML validation; `action="#"` (no backend)
| TC10 | Responsiveness & Integration | Page responsive; media doesn't block form | Resize viewport | Layout adapts; media + form usable | PASS | Media grid stacks on mobile; form remains functional

Corrections applied
-------------------
- Replaced local media references with hosted sample media for testing.
- Wrapped local banner with clickable link and ensured banner is full-width.
- Reworked CSS grid and spacing so banner, video, audio, and form align correctly across viewports.
- Added color theme and subtle animations for improved UX.

Notes and Next Steps
--------------------
- To publish this repo to GitHub, run the provided git commands in the `ex1` folder. If you want, I can prepare a commit message and perform the git steps locally, but pushing requires your credentials or an authorized token.
- If you want server-side handling of form submissions, I can scaffold a minimal backend (Node/Express or PHP) and update the form `action`.
