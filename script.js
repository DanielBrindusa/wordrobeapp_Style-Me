const projectData = [
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
              { type: "file", name: "StatsScreen.kt", description: "Wardrobe insights and usage statistics. 'Insights' tab currently" },
              { type: "file", name: "ToWearScreen.kt", description: "Planned outfits list. 'Outfits' tab currently" },
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
              { type: "file", name: "WelcomePreferences.kt", description: "SharedPreferences helper for welcome screen state" }
            ]
          }
        ]
      }
    ]
  }
];

function createNode(node, isChild = false) {
  const wrapper = document.createElement("div");
  wrapper.className = `tree-node${isChild ? " child" : ""}${node.open ? " open" : ""}`;

  const header = document.createElement("button");
  header.className = "tree-header";

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
  desc.textContent = node.description || "";

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

    node.children.forEach(child => {
      childrenWrap.appendChild(createNode(child, true));
    });

    wrapper.appendChild(childrenWrap);

    header.addEventListener("click", () => {
      wrapper.classList.toggle("open");
      chevron.textContent = wrapper.classList.contains("open") ? "▼" : "▶";
    });
  } else {
    header.disabled = true;
    header.style.cursor = "default";
  }

  return wrapper;
}

function renderTree() {
  const tree = document.getElementById("projectTree");
  tree.innerHTML = "";
  projectData.forEach(node => tree.appendChild(createNode(node)));
}

function toggleAll(open) {
  document.querySelectorAll(".tree-node").forEach(node => {
    const hasChildren = node.querySelector(":scope > .tree-children");
    if (hasChildren) {
      node.classList.toggle("open", open);
      const chevron = node.querySelector(":scope > .tree-header .chevron");
      if (chevron) chevron.textContent = open ? "▼" : "▶";
    }
  });
}

renderTree();

document.getElementById("expandAllBtn").addEventListener("click", () => toggleAll(true));
document.getElementById("collapseAllBtn").addEventListener("click", () => toggleAll(false));
