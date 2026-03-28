const defaultProjectData = [
  {
    type: "folder",
    name: "com.example.wardrobeapp",
    description: "Root package for the app",
    open: true,
    children: [
      {
        type: "file",
        name: "MainActivity.kt",
        description: "App entry point and startup setup"
      },
      {
        type: "file",
        name: "WardrobeApp.kt",
        description: "Navigation host and screen wiring"
      },
      {
        type: "folder",
        name: "navigation",
        description: "App navigation layer",
        children: [
          {
            type: "file",
            name: "AppRoute.kt",
            description: "All route definitions"
          }
        ]
      },
      {
        type: "folder",
        name: "ui",
        description: "All UI-related code",
        children: [
          {
            type: "folder",
            name: "components",
            description: "Reusable composables",
            children: [
              { type: "file", name: "Cards.kt", description: "Reusable clothing and outfit card UIs" },
              { type: "file", name: "ColorPickers.kt", description: "Color picker composables" },
              { type: "file", name: "CommonComponents.kt", description: "Headers, sections, empty states, stats, toggles" },
              { type: "file", name: "Dialogs.kt", description: "Dialog composables such as filter and picker dialogs" }
            ]
          },
          {
            type: "folder",
            name: "screens",
            description: "One screen per file",
            children: [
              { type: "file", name: "AddItemScreen.kt", description: "Add or edit wardrobe item screen" },
              { type: "file", name: "CreateOutfitScreen.kt", description: "Outfit planning screen" },
              { type: "file", name: "ItemDetailsScreen.kt", description: "Details page for one clothing item" },
              { type: "file", name: "SettingsScreen.kt", description: "Theme, notifications, and app info" },
              { type: "file", name: "StatsScreen.kt", description: "Wardrobe insights and usage statistics. 'Insights' tab currently. Currently 'Insights' tab" },
              { type: "file", name: "ToWearScreen.kt", description: "Planned outfits list. 'Outfits' tab currently. Currently 'Outfits' tab" },
              { type: "file", name: "WardrobeScreen.kt", description: "Main wardrobe grid and filters" },
              { type: "file", name: "WelcomeScreen.kt", description: "First-time welcome screen" }
            ]
          },
          {
            type: "folder",
            name: "utils",
            description: "Constants and helper functions",
            children: [
              { type: "file", name: "AppConstants.kt", description: "Categories, seasons, occasions, colors, helpers" },
              { type: "file", name: "BackgroundRemover.kt", description: "Remove background with AI deeplab_metadata.tflite" },
              { type: "file", name: "WelcomePreferences.kt", description: "SharedPreferences helper for welcome screen state" }
            ]
          }
        ]
      }
    ]
  }
];

const sampleExportData = {
  projectName: "WardrobeApp",
  exportedAt: "2026-03-27T22:00:00Z",
  source: "Android Project Export",
  rootPath: "WardrobeApp",
  entries: [
    { path: "app", type: "folder", description: "Android application module" },
    { path: "app/src", type: "folder" },
    { path: "app/src/main", type: "folder" },
    { path: "app/src/main/AndroidManifest.xml", type: "file", description: "App manifest" },
    { path: "app/src/main/java", type: "folder" },
    { path: "app/src/main/java/com", type: "folder" },
    { path: "app/src/main/java/com/example", type: "folder" },
    { path: "app/src/main/java/com/example/wardrobeapp", type: "folder", description: "Main package" },
    { path: "app/src/main/java/com/example/wardrobeapp/MainActivity.kt", type: "file", description: "Entry activity" },
    { path: "app/src/main/java/com/example/wardrobeapp/WardrobeApp.kt", type: "file", description: "Navigation host" },
    { path: "app/src/main/java/com/example/wardrobeapp/navigation", type: "folder" },
    { path: "app/src/main/java/com/example/wardrobeapp/navigation/AppRoute.kt", type: "file" },
    { path: "app/src/main/java/com/example/wardrobeapp/ui", type: "folder" },
    { path: "app/src/main/java/com/example/wardrobeapp/ui/components", type: "folder" },
    { path: "app/src/main/java/com/example/wardrobeapp/ui/components/Cards.kt", type: "file" },
    { path: "app/src/main/java/com/example/wardrobeapp/ui/screens", type: "folder" },
    { path: "app/src/main/java/com/example/wardrobeapp/ui/screens/WardrobeScreen.kt", type: "file" },
    { path: "app/src/main/java/com/example/wardrobeapp/ui/utils", type: "folder" },
    { path: "app/src/main/java/com/example/wardrobeapp/ui/utils/AppConstants.kt", type: "file" },
    { path: "gradle", type: "folder" },
    { path: "gradle/libs.versions.toml", type: "file", description: "Version catalog" },
    { path: "build.gradle.kts", type: "file" },
    { path: "settings.gradle.kts", type: "file" }
  ]
};

const LOCAL_STORAGE_KEY = "wardrobe-project-map-import";
const SOURCE_DEFAULT = "Built-in reference";
const SOURCE_IMPORTED = "Imported JSON";
const AUTO_JSON_CANDIDATES = [
  "project-data.json",
  "project-map.json",
  "project-structure.json",
  "sample-project-structure.json"
];

const tree = document.getElementById("projectTree");
const searchInput = document.getElementById("treeSearchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const searchSummary = document.getElementById("searchSummary");
const emptySearchState = document.getElementById("emptySearchState");
const structurePreview = document.getElementById("structurePreview");
const sourceValue = document.getElementById("sourceValue");
const foldersValue = document.getElementById("foldersValue");
const filesValue = document.getElementById("filesValue");
const depthValue = document.getElementById("depthValue");
const metadataPills = document.getElementById("metadataPills");
const treeTitle = document.getElementById("treeTitle");
const treeDescription = document.getElementById("treeDescription");
const importStatus = document.getElementById("importStatus");
const jsonFileInput = document.getElementById("jsonFileInput");
const dropZone = document.getElementById("dropZone");
const useDefaultBtn = document.getElementById("useDefaultBtn");
const clearImportedBtn = document.getElementById("clearImportedBtn");
const downloadSampleBtn = document.getElementById("downloadSampleBtn");

let currentTreeData = cloneNodes(defaultProjectData);
let currentMetadata = {
  projectName: "Wardrobe App Reference",
  sourceLabel: SOURCE_DEFAULT,
  description: "Showing the built-in reference structure.",
  exportedAt: null,
  rootPath: null,
  entryCount: null,
  jsonFileName: null
};

function cloneNodes(nodes = []) {
  return nodes.map((node) => ({
    ...node,
    open: typeof node.open === "boolean" ? node.open : false,
    children: node.children ? cloneNodes(node.children) : []
  }));
}

function sanitizeNode(node) {
  const children = Array.isArray(node.children)
    ? node.children.map(sanitizeNode)
    : [];

  const explicitType = typeof node.type === "string" ? node.type.toLowerCase() : "";
  const normalizedType = explicitType === "folder" || children.length > 0 ? "folder" : "file";

  return {
    type: normalizedType,
    name: String(node.name || node.path || node.label || (normalizedType === "folder" ? "Unnamed folder" : "Unnamed file")),
    description: typeof node.description === "string" ? node.description : "",
    open: Boolean(node.open),
    children
  };
}

function sortNodes(nodes) {
  nodes.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "folder" ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  nodes.forEach((node) => {
    if (node.children?.length) {
      sortNodes(node.children);
    }
  });
}

function buildTreeFromEntries(entries, rootName = "Project") {
  const root = {
    type: "folder",
    name: rootName,
    description: "Imported project root",
    open: true,
    children: []
  };

  const normalizedEntries = entries
    .filter((entry) => entry && typeof entry.path === "string" && entry.path.trim())
    .map((entry) => ({
      path: entry.path.replace(/^\/+|\/+$/g, "").trim(),
      type: entry.type,
      description: entry.description,
      open: entry.open
    }))
    .sort((a, b) => a.path.localeCompare(b.path));

  normalizedEntries.forEach((entry) => {
    const segments = entry.path.split(/[\\/]+/).filter(Boolean);
    if (!segments.length) return;

    let current = root;

    segments.forEach((segment, index) => {
      const isLastSegment = index === segments.length - 1;
      const inferredFile = /\.[a-z0-9]+$/i.test(segment);
      const nodeType = isLastSegment
        ? ((entry.type || "").toLowerCase() === "folder" ? "folder" : inferredFile ? "file" : "folder")
        : "folder";

      if (!Array.isArray(current.children)) {
        current.children = [];
      }

      let next = current.children.find((child) => child.name === segment);
      if (!next) {
        next = {
          type: nodeType,
          name: segment,
          description: "",
          open: false,
          children: []
        };
        current.children.push(next);
      }

      if (isLastSegment) {
        next.type = nodeType;
        if (typeof entry.description === "string") {
          next.description = entry.description;
        }
        if (typeof entry.open === "boolean") {
          next.open = entry.open;
        }
      }

      current = next;
    });
  });

  sortNodes(root.children);
  return [root];
}

function extractMetadata(rawData, fallback = {}) {
  return {
    projectName: rawData.projectName || rawData.name || rawData.project?.name || fallback.projectName || "Imported project",
    sourceLabel: rawData.source || rawData.generator || rawData.generatedBy || fallback.sourceLabel || SOURCE_IMPORTED,
    description: rawData.description || fallback.description || "Showing the structure loaded from your JSON file.",
    exportedAt: rawData.exportedAt || rawData.generatedAt || rawData.project?.exportedAt || fallback.exportedAt || null,
    rootPath: rawData.rootPath || rawData.projectRoot || rawData.project?.rootPath || fallback.rootPath || null,
    entryCount: null,
    jsonFileName: fallback.jsonFileName || rawData.jsonFileName || null
  };
}

function normalizeImportedData(rawData, options = {}) {
  if (Array.isArray(rawData)) {
    const nodes = rawData.map(sanitizeNode);
    sortNodes(nodes);
    return {
      tree: nodes,
      metadata: {
        ...extractMetadata({}, options),
        entryCount: countStats(nodes).files + countStats(nodes).folders
      }
    };
  }

  if (!rawData || typeof rawData !== "object") {
    throw new Error("The uploaded JSON is not in a supported format.");
  }

  const wrappedTree =
    rawData.tree ||
    rawData.projectTree ||
    rawData.nodes ||
    rawData.structure ||
    rawData.project?.tree ||
    rawData.data?.tree ||
    rawData.data?.projectTree;

  const entries =
    rawData.entries ||
    rawData.files ||
    rawData.paths ||
    rawData.project?.entries ||
    rawData.data?.entries;

  const treeArrayCandidates = [rawData.items, rawData.children]
    .filter(Array.isArray);

  const metadata = extractMetadata(rawData, options);

  if (Array.isArray(wrappedTree)) {
    const nodes = wrappedTree.map(sanitizeNode);
    sortNodes(nodes);
    const stats = countStats(nodes);
    metadata.entryCount = stats.files + stats.folders;
    return { tree: nodes, metadata };
  }

  if (treeArrayCandidates.length > 0) {
    const nodes = treeArrayCandidates[0].map(sanitizeNode);
    sortNodes(nodes);
    const stats = countStats(nodes);
    metadata.entryCount = stats.files + stats.folders;
    return { tree: nodes, metadata };
  }

  if (Array.isArray(entries)) {
    metadata.entryCount = entries.length;
    const builtTree = buildTreeFromEntries(entries, metadata.projectName || "Project");
    return { tree: builtTree, metadata };
  }

  if (typeof rawData.path === "string" && Array.isArray(rawData.children)) {
    const nodes = [sanitizeNode(rawData)];
    sortNodes(nodes);
    const stats = countStats(nodes);
    metadata.entryCount = stats.files + stats.folders;
    return { tree: nodes, metadata };
  }

  throw new Error("Supported shapes are: tree array, wrapped tree object, nested root object, or flat entries array.");
}

function nodeMatches(node, searchTerm) {
  const normalizedTerm = searchTerm.toLowerCase();
  const searchableText = `${node.name} ${node.description || ""}`.toLowerCase();
  return searchableText.includes(normalizedTerm);
}

function filterTree(nodes, searchTerm) {
  const filteredNodes = [];
  let matchCount = 0;

  nodes.forEach((node) => {
    const matchingChildren = node.children?.length
      ? filterTree(node.children, searchTerm)
      : { filteredNodes: [], matchCount: 0 };

    const selfMatches = nodeMatches(node, searchTerm);
    const shouldKeepNode = selfMatches || matchingChildren.filteredNodes.length > 0;

    if (shouldKeepNode) {
      filteredNodes.push({
        ...node,
        open: searchTerm ? true : Boolean(node.open),
        children: matchingChildren.filteredNodes
      });
    }

    if (selfMatches) {
      matchCount += 1;
    }

    matchCount += matchingChildren.matchCount;
  });

  return { filteredNodes, matchCount };
}

function createNode(node, isChild = false, level = 0) {
  const wrapper = document.createElement("div");
  wrapper.className = `tree-node${isChild ? " child" : ""}${node.open ? " open" : ""}`;
  wrapper.dataset.level = String(level);

  const header = document.createElement("button");
  header.className = "tree-header";
  header.type = "button";
  header.setAttribute("aria-expanded", node.children?.length ? String(Boolean(node.open)) : "false");

  const left = document.createElement("div");
  left.className = "tree-left";

  const icon = document.createElement("span");
  icon.className = `icon-badge ${node.type === "folder" ? "icon-folder" : "icon-file"}`;
  icon.textContent = node.type === "folder" ? "📁" : "📄";

  const meta = document.createElement("div");
  meta.className = "node-meta";

  const title = document.createElement("h3");
  title.textContent = node.name;

  const desc = document.createElement("p");
  desc.textContent = node.description || (node.type === "folder" ? "Folder" : "File");

  meta.appendChild(title);
  meta.appendChild(desc);
  left.appendChild(icon);
  left.appendChild(meta);

  const chevron = document.createElement("span");
  chevron.className = "chevron";
  chevron.textContent = node.children?.length ? (wrapper.classList.contains("open") ? "▼" : "▶") : "•";

  header.appendChild(left);
  header.appendChild(chevron);
  wrapper.appendChild(header);

  if (node.children?.length) {
    const childrenWrap = document.createElement("div");
    childrenWrap.className = "tree-children";

    node.children.forEach((child) => {
      childrenWrap.appendChild(createNode(child, true, level + 1));
    });

    wrapper.appendChild(childrenWrap);

    header.addEventListener("click", () => {
      const isOpen = wrapper.classList.toggle("open");
      header.setAttribute("aria-expanded", String(isOpen));
      chevron.textContent = isOpen ? "▼" : "▶";
    });
  } else {
    header.disabled = true;
    header.style.cursor = "default";
  }

  return wrapper;
}

function updateSearchSummary(searchTerm, matchCount) {
  if (!searchTerm) {
    searchSummary.textContent = "Showing full structure.";
    return;
  }

  if (matchCount === 1) {
    searchSummary.textContent = `1 matching item for “${searchTerm}”.`;
    return;
  }

  searchSummary.textContent = `${matchCount} matching items for “${searchTerm}”.`;
}

function countStats(nodes, level = 1) {
  return nodes.reduce(
    (stats, node) => {
      if (node.type === "folder") {
        stats.folders += 1;
      } else {
        stats.files += 1;
      }

      stats.deepestLevel = Math.max(stats.deepestLevel, level);

      if (node.children?.length) {
        const childStats = countStats(node.children, level + 1);
        stats.folders += childStats.folders;
        stats.files += childStats.files;
        stats.deepestLevel = Math.max(stats.deepestLevel, childStats.deepestLevel);
      }

      return stats;
    },
    { folders: 0, files: 0, deepestLevel: 0 }
  );
}

function buildStructurePreview(nodes, prefix = "") {
  return nodes
    .map((node, index) => {
      const lastNode = index === nodes.length - 1;
      const connector = prefix ? (lastNode ? "└── " : "├── ") : "";
      const line = `${prefix}${connector}${node.name}`;
      const nextPrefix = prefix ? `${prefix}${lastNode ? "    " : "│   "}` : "";
      const childrenText = node.children?.length ? `\n${buildStructurePreview(node.children, nextPrefix)}` : "";
      return `${line}${childrenText}`;
    })
    .join("\n");
}

function updateStatsAndPreview() {
  const stats = countStats(currentTreeData);
  foldersValue.textContent = String(stats.folders);
  filesValue.textContent = String(stats.files);
  depthValue.textContent = String(stats.deepestLevel);
  sourceValue.textContent = currentMetadata.sourceLabel || SOURCE_DEFAULT;
  structurePreview.textContent = buildStructurePreview(currentTreeData);
}

function renderMetadataPills() {
  metadataPills.innerHTML = "";
  const pills = [];

  if (currentMetadata.projectName) pills.push(currentMetadata.projectName);
  if (currentMetadata.jsonFileName) pills.push(`JSON: ${currentMetadata.jsonFileName}`);
  if (currentMetadata.exportedAt) pills.push(`Exported: ${formatDate(currentMetadata.exportedAt)}`);
  if (currentMetadata.rootPath) pills.push(`Root: ${currentMetadata.rootPath}`);
  if (currentMetadata.entryCount) pills.push(`Entries: ${currentMetadata.entryCount}`);

  pills.forEach((pillText) => {
    const pill = document.createElement("span");
    pill.className = "metadata-pill";
    pill.textContent = pillText;
    metadataPills.appendChild(pill);
  });
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function renderTree() {
  const searchTerm = searchInput.value.trim();
  const { filteredNodes, matchCount } = searchTerm
    ? filterTree(currentTreeData, searchTerm)
    : { filteredNodes: currentTreeData, matchCount: 0 };

  tree.innerHTML = "";

  filteredNodes.forEach((node) => {
    tree.appendChild(createNode(node));
  });

  const hasResults = filteredNodes.length > 0;
  emptySearchState.hidden = hasResults;
  tree.hidden = !hasResults;

  updateSearchSummary(searchTerm, matchCount);
}

function toggleAll(open) {
  document.querySelectorAll(".tree-node").forEach((node) => {
    const hasChildren = node.querySelector(":scope > .tree-children");
    if (hasChildren) {
      node.classList.toggle("open", open);
      const header = node.querySelector(":scope > .tree-header");
      const chevron = node.querySelector(":scope > .tree-header .chevron");
      if (header) header.setAttribute("aria-expanded", String(open));
      if (chevron) chevron.textContent = open ? "▼" : "▶";
    }
  });
}

function persistImportedData(payload) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
}

function clearPersistedImportedData() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function setCurrentTree(treeData, metadata, importMessage) {
  currentTreeData = cloneNodes(treeData);
  currentMetadata = metadata;
  treeTitle.textContent = metadata.projectName || "Project structure";
  treeDescription.textContent = metadata.description || "Search the imported project structure.";
  importStatus.textContent = importMessage;
  renderMetadataPills();
  updateStatsAndPreview();
  renderTree();
}

function loadDefaultTree(message = "Using the built-in reference structure.") {
  setCurrentTree(
    defaultProjectData,
    {
      projectName: "Wardrobe App Reference",
      sourceLabel: SOURCE_DEFAULT,
      description: "Showing the built-in reference structure.",
      exportedAt: null,
      rootPath: null,
      entryCount: null,
      jsonFileName: null
    },
    message
  );
}

function applyImportedData(rawData, options = {}) {
  const normalized = normalizeImportedData(rawData, options);
  setCurrentTree(
    normalized.tree,
    normalized.metadata,
    options.importMessage || `Imported ${normalized.metadata.projectName || "project"} successfully.`
  );

  if (options.persist !== false) {
    persistImportedData({
      rawData,
      fileName: options.fileName || normalized.metadata.jsonFileName || null
    });
  }
}

function handleJsonText(jsonText, options = {}) {
  let parsed;

  try {
    parsed = JSON.parse(jsonText);
  } catch (error) {
    throw new Error("The selected file is not valid JSON.");
  }

  applyImportedData(parsed, options);
}

function readSelectedFile(file) {
  if (!file) return;

  const isJsonByName = file.name.toLowerCase().endsWith(".json");
  const isJsonByType = !file.type || file.type.includes("json") || file.type === "application/octet-stream";

  if (!isJsonByName && !isJsonByType) {
    importStatus.textContent = "Please choose a JSON file.";
    return;
  }

  const reader = new FileReader();
  importStatus.textContent = `Loading ${file.name}...`;

  reader.onload = () => {
    try {
      handleJsonText(String(reader.result || ""), {
        fileName: file.name,
        importMessage: `Imported ${file.name} successfully.`
      });
      jsonFileInput.value = "";
    } catch (error) {
      importStatus.textContent = error.message;
    }
  };

  reader.onerror = () => {
    importStatus.textContent = "The file could not be read.";
  };

  reader.readAsText(file);
}

function downloadSampleJson() {
  const blob = new Blob([JSON.stringify(sampleExportData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sample-project-structure.json";
  link.click();
  URL.revokeObjectURL(url);
}

function setupDragAndDrop() {
  ["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropZone.classList.add("drag-over");
    });
  });

  ["dragleave", "dragend", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      if (eventName !== "drop") {
        dropZone.classList.remove("drag-over");
      }
    });
  });

  dropZone.addEventListener("drop", (event) => {
    dropZone.classList.remove("drag-over");
    const file = event.dataTransfer?.files?.[0];
    readSelectedFile(file);
  });

  dropZone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      jsonFileInput.click();
    }
  });
}

function getJsonUrlFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const value = params.get("json") || params.get("data") || params.get("file");
  return value ? value.trim() : "";
}

async function fetchJsonFromUrl(url, options = {}) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not load ${url}.`);
  }

  const text = await response.text();
  handleJsonText(text, {
    fileName: options.fileName || url.split("/").pop() || "external.json",
    persist: options.persist !== false,
    importMessage: options.importMessage || `Loaded ${url.split("/").pop() || "JSON file"} automatically.`
  });
}

async function tryAutoLoadJsonFile() {
  const queryUrl = getJsonUrlFromQuery();
  if (queryUrl) {
    await fetchJsonFromUrl(queryUrl, { persist: false });
    return true;
  }

  for (const candidate of AUTO_JSON_CANDIDATES) {
    try {
      await fetchJsonFromUrl(candidate, {
        persist: false,
        importMessage: `Loaded ${candidate} automatically.`
      });
      return true;
    } catch (error) {
      // Try next candidate.
    }
  }

  return false;
}

searchInput.addEventListener("input", renderTree);

clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  renderTree();
});

jsonFileInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  readSelectedFile(file);
});

document.getElementById("expandAllBtn").addEventListener("click", () => toggleAll(true));
document.getElementById("collapseAllBtn").addEventListener("click", () => toggleAll(false));
useDefaultBtn.addEventListener("click", () => {
  clearPersistedImportedData();
  loadDefaultTree();
});
clearImportedBtn.addEventListener("click", () => {
  jsonFileInput.value = "";
  clearPersistedImportedData();
  loadDefaultTree("Imported JSON cleared. Using the built-in reference structure.");
});
downloadSampleBtn.addEventListener("click", downloadSampleJson);

(async function init() {
  setupDragAndDrop();

  const savedImport = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedImport) {
    try {
      const parsedSavedImport = JSON.parse(savedImport);
      applyImportedData(parsedSavedImport.rawData || parsedSavedImport, {
        persist: false,
        fileName: parsedSavedImport.fileName || null,
        importMessage: `Restored ${parsedSavedImport.fileName || "saved JSON"} from this browser.`
      });
      return;
    } catch (error) {
      clearPersistedImportedData();
    }
  }

  const autoLoaded = await tryAutoLoadJsonFile();
  if (!autoLoaded) {
    loadDefaultTree();
  }
})();
