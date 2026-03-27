# Wardrobe App Project Map Generator

This project map page now supports two working ways to use JSON:

1. **Automatic JSON loading** on page load.
2. **Manual JSON upload** by click or drag and drop.

## Automatic JSON loading

When the page opens, it tries to load one of these files from the same folder as `index.html`:

- `project-data.json`
- `project-map.json`
- `project-structure.json`
- `sample-project-structure.json`

The first file that exists and contains supported JSON will be rendered automatically.

You can also force a specific file through the URL:

```text
index.html?json=project-data.json
```

## Manual JSON upload

You can still:

- click the upload area and choose a `.json` file
- drag and drop a `.json` file onto the upload area

The imported JSON is stored locally in the browser and restored on refresh until you clear it.

## Supported JSON shapes

### 1. Tree array

```json
[
  {
    "type": "folder",
    "name": "com.example.wardrobeapp",
    "children": [
      {
        "type": "file",
        "name": "MainActivity.kt"
      }
    ]
  }
]
```

### 2. Wrapped tree object

```json
{
  "projectName": "WardrobeApp",
  "tree": [
    {
      "type": "folder",
      "name": "app",
      "children": []
    }
  ]
}
```

### 3. Flat entries export

```json
{
  "projectName": "WardrobeApp",
  "entries": [
    { "path": "app/src/main/java/com/example/wardrobeapp/MainActivity.kt", "type": "file" },
    { "path": "app/src/main/java/com/example/wardrobeapp/ui", "type": "folder" }
  ]
}
```

## Recommended setup for GitHub

If you want the site to always use your real exported data automatically, place your export file in the repo root with this name:

```text
project-data.json
```

That is the safest default for GitHub Pages.

## Files included

- `index.html`
- `style.css`
- `script.js`
- `sample-project-structure.json`
- `project-data.json`

## Notes

- If no JSON file is found automatically, the page falls back to the built-in reference map.
- If a saved browser import exists, that saved import is restored first.
