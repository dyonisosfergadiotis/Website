# Dyonisos Fergadiotis Portfolio

Personal portfolio and project showcase for native apps, widgets, and practical software experiments.

## Projects

- **NewsFeeder**: focused RSS reader with offline support and iPhone widgets
- **PayScope**: shift, working-time, tip, and expected-earnings workspace
- **Wetterblatt**: privacy-friendly weather journal with offline-aware forecasts

Each project has its own product page under `projects/`.

## Stack

- Semantic HTML
- Responsive CSS
- Vanilla JavaScript
- Static deployment through GitHub Pages

No build step or package installation is required.

## Run Locally

From the repository root:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Structure

```text
.
├── AppIcons/       Current web exports of the app icons
├── css/            Portfolio and shared motion styles
├── icon/           Website favicons
├── js/             Navigation and motion behavior
├── projects/       Individual app case-study pages and screenshots
└── index.html      Portfolio landing page
```

## Design

The site uses an Apple-inspired product-gallery direction with restrained glass effects, generous spacing, native system typography, and reduced-motion support.

The app icon PNGs in `AppIcons/` are web-ready exports based on the current Icon Composer `.icon` bundles from the corresponding app projects.

## Deployment

Pushing to the repository's publishing branch updates the hosted static site through the configured GitHub Pages/deployment workflow.
