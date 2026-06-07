# Anil Cavale — Personal Portfolio

A responsive, SEO-optimized GitHub Pages portfolio for **Anil Cavale**, Senior Data Analyst specializing in credit risk analytics, PSI/CSI drift monitoring, and decisioning systems.

---

## File Structure

```
/
├── index.html          ← Main HTML (SEO meta, structured data, all sections)
├── styles.css          ← Full responsive stylesheet (dark/light mode)
├── script.js           ← GitHub API, theme toggle, scroll animations
├── sitemap.xml         ← XML sitemap for search engines
├── robots.txt          ← Search engine crawl rules
├── README.md           ← This file
└── assets/
    ├── profile-photo.jpg       ← REPLACE with your actual photo
    └── Anil_Cavale_Resume.pdf  ← REPLACE with your actual resume PDF
```

---

## Deployment: GitHub Pages (Step by Step)

### 1. Create the Repository

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `anilcavale.github.io`
   - This exact name triggers GitHub Pages automatically.
   - Your site will be live at `https://anilcavale.github.io/`
3. Set to **Public**.
4. Click **Create repository**.

### 2. Upload the Files

**Option A — GitHub Web UI (easiest):**
1. In your new repo, click **Add file → Upload files**.
2. Drag and drop all the project files (index.html, styles.css, script.js, sitemap.xml, robots.txt).
3. Create the `assets/` folder and upload `profile-photo.jpg` and `Anil_Cavale_Resume.pdf`.
4. Commit directly to `main`.

**Option B — Git CLI:**
```bash
git clone https://github.com/anilcavale/anilcavale.github.io.git
cd anilcavale.github.io

# Copy all portfolio files into this directory
# Then:
git add .
git commit -m "Initial portfolio deploy"
git push origin main
```

### 3. Enable GitHub Pages

1. In your repo, go to **Settings → Pages**.
2. Under **Source**, select **Deploy from a branch**.
3. Choose branch: `main`, folder: `/ (root)`.
4. Click **Save**.
5. Within ~2 minutes, your site is live at `https://anilcavale.github.io/`.

---

## Required Replacements (Checklist)

Search for these placeholder strings and update them:

| Placeholder | File(s) | Replace With |
|---|---|---|
| `ADD_LINKEDIN_URL_HERE` | `index.html` (2 places) | Your actual LinkedIn profile URL |
| `https://anilcavale.github.io/` | `index.html`, `sitemap.xml`, `robots.txt` | Your actual GitHub Pages URL (likely the same) |
| `assets/profile-photo.jpg` | `index.html` | Place your photo file in `assets/` folder |
| `assets/Anil_Cavale_Resume.pdf` | `index.html` | Place your resume PDF in `assets/` folder |

---

## Adding Your Profile Photo

1. Prepare a professional headshot, ideally square (e.g. 400×400px or 600×600px).
2. Name it `profile-photo.jpg`.
3. Upload to the `assets/` folder in your repository.
4. The site will display it automatically; if missing, it gracefully shows initials "AC".

---

## Adding Your Resume

1. Export or save your resume as `Anil_Cavale_Resume.pdf`.
2. Upload to the `assets/` folder in your repository.
3. The "Download Resume / Hire Me" button will trigger a download automatically.

---

## Updating Your LinkedIn URL

Open `index.html` and replace both instances of `ADD_LINKEDIN_URL_HERE` with your LinkedIn profile URL, for example:
```
https://www.linkedin.com/in/anilcavale/
```

---

## SEO Notes

- The site includes full Open Graph and Twitter Card meta tags for professional link previews on LinkedIn and other platforms.
- JSON-LD structured data (schema.org Person) is included for Google's knowledge graph.
- Submit your sitemap to [Google Search Console](https://search.google.com/search-console) after deploying:
  `https://anilcavale.github.io/sitemap.xml`
- Google typically indexes new GitHub Pages sites within 1–7 days.

---

## Customization

### Dark/Light Mode
The site defaults to dark mode (or respects the user's OS preference on first visit). The toggle in the top-right corner switches themes; the preference is saved in `localStorage`.

### Hiding Forked Repos
In `script.js`, the GitHub repos fetch filters out forks by default:
```js
.filter(r => !r.fork)
```
Remove that line to include forked repos in the projects section.

### Adding Custom Projects
If you want to pin specific repos at the top of the Projects section, you can sort by name or add a manual override array in `script.js`.

---

## Tech Stack

- Pure HTML5, CSS3, Vanilla JavaScript — no frameworks, no build tools
- Deployed on GitHub Pages (free, static hosting)
- GitHub Public API for live repository data
- Google Fonts: DM Serif Display + DM Sans
- Fully responsive, mobile-first layout
- WCAG-aware semantic HTML with ARIA labels

---

*Portfolio built for: Anil Cavale · Senior Data Analyst · Credit Risk Analytics · Data Science*
