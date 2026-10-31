# Dental Emergency Learning App

A responsive educational reference for common medical emergencies that may occur in dental practice. The app organizes each topic into recognition cues, immediate actions, and decision-based response pathways, with a separate learning library for lesson videos.
It is intended for dental students and dental-care teams using the material for learning or quick reference. It is not a clinical decision system and does not replace current local protocols, professional training, or advice from emergency services.

## Project Overview

The project is a client-side single-page application (SPA) branded for MAHSA International College. Its goals are to make emergency topics easy to browse, present structured response information in a readable format, and provide an Android application through Capacitor.
There is no application backend or database in this repository. Emergency content and references are stored in JavaScript modules and bundled with the frontend.

## Key Features

- **Quick access:** The home page links to the emergency guide index and learning library.
- **Emergency index:** Browse seven topic cards, each with a category and short summary.
- **Structured emergency guides:** Guides include recognition information, ordered actions, and decision points. Most decision points let the reader reveal a pathway; pulse- and breathing-related checkpoints display both branches.
- **References and review notice:** Each guide provides a references dialog and a clinical-review notice.
- **Learning library:** Select a topic from the playlist and view its image and summary alongside a video player. The playlist remains below the lesson on mobile.
- **Responsive navigation and layouts:** Pages adapt for smaller screens and include keyboard focus styling.
- **Android wrapper:** A Capacitor Android project is included for running the web app as a native Android app.

### Emergency Guides

| Topic | Guide coverage |
| --- | --- |
| Vasovagal syncope | Recognition, conscious and unconscious patient pathways, and pulse assessment. |
| Anaphylaxis | Signs, initial actions, airway or breathing compromise, and collapse response. |
| Hypoglycemia | Recognition, conscious and unconscious pathways, glucose management, and escalation. |
| Cardiac arrest | Collapse assessment, CPR, AED use, and response during resuscitation. |
| Asthma attacks | Initial actions and pathways for adequate or inadequate breathing. |
| Epilepsy | Seizure safety, post-seizure care, prolonged or repeated seizures, and unresponsiveness. |
| Others | General pathways for conscious patients, unconscious patients, and resuscitation scenarios. |

## Technology Stack

- **React 19** for the user interface.
- **Vite 8** for local development and production builds.
- **React Router 7** for client-side routes.
- **Tailwind CSS 4** through the Vite plugin, alongside page-specific CSS.
- **Lucide React** for interface icons.
- **Capacitor 8** and the Android Gradle project for the Android application.
- **ESLint 10** with React Hooks and React Refresh rules.
- **npm** and the committed `package-lock.json` for dependency installation.

The `vite-plugin-pwa` package is present as a dependency, but the current Vite configuration does not enable it. The app should not be treated as an offline-capable PWA in its current state.

## Project Structure

```text
.
├── android/                    # Capacitor Android project and Gradle wrapper
├── public/
│   ├── images/                 # Publicly served illustrations and brand images
│   └── videos/                 # Homepage background video
├── src/
│   ├── assets/                 # Imported guide illustrations
│   ├── components/             # Shared navigation, cards, buttons, and media
│   ├── data/
│   │   ├── emergencies.js      # Emergency index, summaries, and legacy content
│   │   └── emergencyContent.js # Active guide sections and references
│   ├── pages/                  # Home, index, Learn, guide, and not-found pages
│   ├── styles/                 # Global and page-specific stylesheets
│   ├── App.jsx                 # Active React Router route table
│   ├── index.css               # Tailwind import and shared design tokens
│   └── main.jsx                # React application entry point
├── capacitor.config.json      # Capacitor app ID, name, and web output directory
├── eslint.config.js            # ESLint configuration
├── index.html                  # Vite HTML entry point and document metadata
├── package.json                # Dependencies and npm scripts
├── vercel.json                 # SPA rewrite for Vercel hosting
└── vite.config.js              # React and Tailwind Vite plugins
```

## Installation & Setup

### Prerequisites

- Node.js **20.19+** or **22.12+** and npm (required by the Vite 8 toolchain).
- Git, if cloning the repository.
- For Android development: Android Studio, Android SDK Platform 36, and JDK 17 or newer. The included Gradle wrapper downloads the configured Gradle distribution when needed.

### Local Web Setup

From the project directory (the directory containing `package.json`):

```bash
npm ci
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`. Press `Ctrl+C` in the terminal to stop the server.

## Environment Configuration

No environment variables are currently referenced by the application, and no `.env` file is required for local development or production builds.

Relevant configuration files:

- `vite.config.js` enables the React and Tailwind CSS Vite plugins.
- `capacitor.config.json` sets the app ID to `com.dentalemergencies.myapp`, the app name to `Dental App`, and the web asset directory to `dist`.
- `vercel.json` sends incoming paths to `index.html` so the client-side router can resolve them.
- `android/` contains the native Android project. Its SDK versions are defined in `android/variables.gradle`.

Do not commit passwords, signing keys, API keys, or other credentials. Android release signing is not configured in the checked-in project.

## Development Guide

Run these commands from the project directory:

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the exact dependency versions in `package-lock.json`. |
| `npm run dev` | Start the Vite development server with hot module replacement. |
| `npm run build` | Create the production web build in `dist/`. |
| `npm run preview` | Serve the built `dist/` output locally for a production-build check. |
| `npm run lint` | Run ESLint across the project. |

There is currently no test script or automated test suite defined in `package.json`.

**Linting note:** `npm run lint` currently runs `eslint .`, which also picks up generated files under the Android project (including build output) and reports errors in those generated bundles. To lint application source files only, run `npx eslint src`. Excluding generated Android files from the project-wide lint scope remains a maintenance task.

The main web routes are:

| Path | Page |
| --- | --- |
| `/` | Home |
| `/emergencies` | Emergency guide index |
| `/emergencies/:id` | Emergency guide selected by its content ID |
| `/learn` | Learning library |
| `*` | Not-found page |

## Deployment Guide

The repository includes Vercel-specific SPA routing in `vercel.json`; it does not include a deployment workflow or provider credentials. To deploy with Vercel:

1. Import the repository into Vercel. If the repository contains multiple projects, set the project root to this app directory.
2. Use `npm ci` as the install command and `npm run build` as the build command.
3. Set the output directory to `dist`.
4. Deploy. The rewrite in `vercel.json` allows direct visits to React Router paths such as `/emergencies` and `/learn`.

Alternatively, deploy the contents of `dist/` to a static host configured to rewrite application routes to `/index.html`. Build locally with `npm run build` first. The exact deployed domain and hosting account are not specified in this repository.

## Mobile Application

Capacitor wraps the built web app in the existing Android project. The Android app ID is `com.dentalemergencies.myapp`; the configured minimum SDK is API 24, with compile and target SDK 36.

After changing web code, rebuild and synchronize the native project:

```bash
npm run build
npx cap sync android
npx cap open android
```

In Android Studio, select an emulator or connected device and run the `app` configuration. To build a debug APK from Windows PowerShell, run from the project root:

```powershell
npm run build
npx cap sync android
Set-Location android
.\gradlew.bat assembleDebug
```

The debug APK is written to `android/app/build/outputs/apk/debug/app-debug.apk`. For a distributable release, configure and protect a signing key and review the Android release settings; release signing is not set up here. An iOS Capacitor project is not included.

## Design System

Shared colors are defined as CSS variables in `src/index.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--color-ink` | `#1E1E24` | Main text |
| `--color-emergency` | `#92140C` | Emergency emphasis |
| `--color-emergency-call` | `#C62828` | Urgent/emergency actions |
| `--color-cream` | `#FFF8F0` | Main page background |
| `--color-peach` | `#FFCF99` | Highlight and accent |
| `--color-navy` | `#111D4A` | Primary dark interface color |

The global sans-serif stack is Segoe UI with system fallbacks. Editorial headings use Georgia and its serif fallbacks. Layouts use fluid widths, grid/flexbox, and page-specific media queries; common responsive transitions occur around tablet and phone widths rather than relying on a single shared breakpoint. Guide pages, the emergency index, and the learning playlist each have tailored small-screen layouts.

## Project Workflow

### Add or Update an Emergency

The emergency list and the active guide content are maintained in separate data modules. Keep their IDs identical so the index, guide route, and learning library resolve the same topic.

1. Add the topic's ID, title, category, summary, and listing image to `src/data/emergencies.js`.
2. Add a matching object to `emergencyData` in `src/data/emergencyContent.js`. Use the existing section kinds (`heading`, `paragraph`, `list`, `decision`, or `pathways`) and follow nearby examples for branch fields and ordered steps.
3. Add and import an appropriately licensed image in `src/assets/` or use a file under `public/images/`. Provide descriptive `imageAlt` text for guide images.
4. Add or update citations in the `references` export and verify clinical details against current authoritative guidance before publication.
5. Run `npx eslint src` and `npm run build`, then review the guide in the browser at `/emergencies/<id>` and confirm it appears in `/emergencies` and `/learn`. See the linting note above for the current limitation of `npm run lint`.

The Learn page currently has no lesson video URLs configured (`lessonVideos` is empty in `src/pages/Learn.jsx`), so it displays its “coming soon” state. Add a video URL and any associated metadata there when a lesson is ready.

### Maintain the App

- Use `npm ci` after checking out changes to reproduce the lockfile dependency set.
- Keep `package-lock.json` in sync when changing npm dependencies.
- Keep `capacitor.config.json` and the Android native project aligned; run `npx cap sync android` after web builds before testing in Android Studio.
- Review medical content and citations whenever a guide is changed. Record clinical review ownership and dates in a future content governance update.

## Limitations & Disclaimer

This application is educational and informational. Its emergency instructions, medication names, doses, and response steps have not been independently medically validated by this software project and may not reflect current guidance in every region. References are supplied in the guide, but their inclusion is not a substitute for clinical review.

Do not use the app to diagnose or delay treatment. In an actual emergency, activate your local emergency service immediately (for example, call **999** where that is the applicable number), follow dispatcher instructions, and use current local protocols and trained clinical judgment. Verify all instructions against authoritative, up-to-date medical guidelines before relying on or publishing them.

Other current limitations:

- No backend, content management system, or server-side data storage is included.
- Learning video URLs are not configured, so lesson videos are placeholders.
- Offline/PWA behavior is not configured, and the public web manifest is empty.
- No automated test suite is defined.
- Only the Android native project is included; release signing is not configured.

## Future Improvements

These are potential improvements, not features currently implemented:

- Establish clinical governance, qualified review, source tracking, and review dates for every guide.
- Add automated tests for routing, emergency content structure, and decision pathways.
- Configure and validate lesson videos, captions, and accessible transcripts.
- Add a content-management workflow while retaining a review and approval process.
- Implement and test offline support if it is needed for clinical training environments.
- Configure secure Android release signing and evaluate whether an iOS project is required.
- Add usability and accessibility testing with dental students and clinical staff.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
