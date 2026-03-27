# 🗂️ WardrobeApp — Project Structure Reference

A static reference site built to visually map and document the package structure of the **Style Me** Android Studio project (`WardrobeApp`). Designed to serve as a living guide while splitting, refactoring, and maintaining the Kotlin/Compose codebase.

---

## 🌐 Live Site

> Deploy via [GitHub Pages](https://pages.github.com/) by enabling it on the `main` branch root.  
> Once live, your reference will be accessible at:  
> `https://<your-username>.github.io/<repository-name>/`

---

## 📁 Repository Contents

| File | Purpose |
|------|---------|
| `index.html` | Page structure and layout |
| `style.css` | Visual theming (dark mode, cards, tree) |
| `script.js` | Interactive tree rendering and expand/collapse logic |

---

## 🧭 What This Site Shows

The site provides a structured visual reference for the **Style Me** Android app, covering:

- **Interactive folder tree** — expandable/collapsible view of the full package hierarchy
- **"What goes where" legend** — explains the responsibility of each file and folder
- **Maintenance rules** — guidelines to keep the codebase clean and consistent
- **Suggested splitting order** — a safe, step-by-step refactoring sequence
- **Target structure preview** — a plain-text snapshot of the full intended layout

---

## 🏗️ Target Package Structure

```
com.example.wardrobeapp
│
├── MainActivity.kt           # App entry point — keep it minimal
├── WardrobeApp.kt            # Navigation host and screen wiring
│
├── navigation
│   └── AppRoute.kt           # All route definitions
│
├── ui
│   ├── components
│   │   ├── Cards.kt              # Clothing and outfit card UIs
│   │   ├── ColorPickers.kt       # Color picker composables
│   │   ├── CommonComponents.kt   # Headers, empty states, toggles, stats
│   │   └── Dialogs.kt            # Filter and picker dialog composables
│   │
│   ├── screens
│   │   ├── AddItemScreen.kt       # Add / edit a wardrobe item
│   │   ├── CreateOutfitScreen.kt  # Outfit planning screen
│   │   ├── ItemDetailsScreen.kt   # Single clothing item detail view
│   │   ├── SettingsScreen.kt      # Theme, notifications, app info
│   │   ├── StatsScreen.kt         # Wardrobe insights ("Insights" tab)
│   │   ├── ToWearScreen.kt        # Planned outfits list ("Outfits" tab)
│   │   ├── WardrobeScreen.kt      # Main wardrobe grid with filters
│   │   └── WelcomeScreen.kt       # First-time onboarding screen
│   │
│   └── utils
│       ├── AppConstants.kt         # Categories, seasons, occasions, colors
│       └── WelcomePreferences.kt   # SharedPreferences helper for welcome state
```

---

## ✅ Maintenance Rules

- Keep **one screen per file** whenever possible.
- Move all reusable UI into `ui/components`.
- Keep constants and utility functions in `ui/utils`.
- Do **not** let `MainActivity.kt` grow — it should only handle startup.
- **Build after each split** when refactoring to catch errors early.
- Remove `private` from top-level declarations that need to be accessed across files.

---

## 🔀 Suggested Splitting Order

When refactoring or extracting code from a large file, follow this sequence to minimise build-breaking changes:

1. **Navigation + utils** — routes, constants, and welcome preferences first
2. **Common components** — shared UI widgets before touching screens
3. **Dialogs and pickers** — keep modal UI grouped together
4. **Cards** — extract repeated card layouts into the components folder
5. **Screens one by one** — move each screen separately and build after each move

---

## 🛠️ Local Development

No build tools or dependencies required. Open `index.html` directly in any browser:

```bash
# Clone the repository
git clone https://github.com/<your-username>/<repository-name>.git

# Open in browser
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

---

## 📌 About

This reference site was created alongside the development of **Style Me**, a personal Android wardrobe management app built with **Kotlin** and **Jetpack Compose**. As the codebase grew, this site became a useful tool for keeping the architecture intentional and easy to navigate.

---

## ⚖️ License

This project is proprietary. See [LICENSE](./LICENSE.md) for details.

© 2025–present **Daniel-Cristian Brindusa**. All Rights Reserved.

---

*Maintained by [Daniel-Cristian Brindusa](https://github.com/daniel-cristian-brindusa).*
