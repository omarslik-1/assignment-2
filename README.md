# Assignment 2 – Interactive Features (React + Vite)

**Omar Slik – Interactive Profile (Light Blue Theme)**

## ✨ What’s inside
- **Edit Profile**: change your name and upload a profile image (persisted in `localStorage`).
- **Add Project (NEW)**: create your own project cards from the UI. Projects are saved locally and can be deleted.
- **Projects**: search, filter (type), sort (recent/title) + loading/error/empty + retry.
- **Dynamic Greeting**: time‑aware, greets you by name.
- **Theme & Reading Mode**: light/dark toggle + calm reading mode (both persisted).
- **Contact Form**: inline validation + success message.
- **Back to Top** + subtle **reveal animations**.

## 🚀 Run locally
```bash
npm i
npm run dev
```
Open the printed `http://localhost:...`.

## ⬆️ Deploy (GitHub Pages)
If deploying under `/assignment-2/`, open `vite.config.js` and uncomment:
```js
// base: '/assignment-2/',
```
Then:
```bash
npm run build
```
Upload the `dist/` folder.

## 📂 Structure
```
src/
  components/ (Navbar, Hero, Projects, Contact, ProfileEditor, Footer, BackToTop)
  hooks/ (useLocalStorage, useReveal)
  styles.css
public/
  projects.json, favicon.svg
docs/
  ai-usage-report.md
  technical-documentation.md
```

## 🧠 AI Usage (summary)
- ChatGPT used for feature planning, components structure, and docs wording.
- I customized logic for local project CRUD using `localStorage`.
