# Website Project Setup Log

## Tech Stack
- React 19
- Vite 7
- Tailwind CSS v4
- TypeScript

---

## Setup Steps

### Step 1: Initialize Vite Project
```bash
npm create vite@latest . -- --template react-ts
```
- Creates React + TypeScript project using Vite as the build tool
- Vite provides fast HMR (Hot Module Replacement) and optimized builds

**Status:** ✅ Complete

---

### Step 2: Install Dependencies
```bash
npm install
npm install -D tailwindcss postcss autoprefixer
```
- `tailwindcss` - utility-first CSS framework
- `postcss` - transforms CSS with plugins
- `autoprefixer` - adds vendor prefixes automatically

**Status:** ✅ Complete

---

### Step 3: Install Tailwind Vite Plugin
```bash
npm install -D @tailwindcss/vite
```
- Tailwind v4 uses a Vite plugin instead of PostCSS config files
- Note: `npx tailwindcss init` no longer exists in v4

**Status:** ✅ Complete

---

### Step 4: Configure Vite
Update `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**Status:** ✅ Complete

---

### Step 5: Configure CSS Entry Point
Replace all contents of `src/index.css` with:
```css
@import "tailwindcss";
```
- Tailwind v4 uses a single import instead of `@tailwind base/components/utilities`
- This imports all Tailwind's base styles, components, and utilities

**Status:** ✅ Complete

---

### Step 6: Test the Setup
```bash
npm run dev
```
- Open `http://localhost:5173` in browser
- Test Tailwind by adding classes like `text-blue-500` to elements in `App.tsx`

**Status:** ✅ Complete

---

### Step 7: Clean Up Default Files
Deleted unused Vite template files:
- `src/App.css` - not needed (using Tailwind)
- `src/assets/react.svg` - default logo not used
- `public/vite.svg` - default favicon (can replace later)

**Status:** ✅ Complete

---

### Step 8: Create Initial App
Replaced default `src/App.tsx` with minimal "Building new" page:
```tsx
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-500">Building new</h1>
    </div>
  )
}

export default App
```

**Status:** ✅ Complete

---

## Git Conventions

### Commit Message Format
```
<type>: <short description>
```

Types:
- `feat:` - new feature
- `fix:` - bug fix
- `refactor:` - code restructure without changing behavior
- `chore:` - maintenance (deps, config, cleanup)
- `docs:` - documentation changes
- `style:` - formatting, no code change

### Workflow
```bash
git status                  # review changes
git add <files>             # stage specific files (or git add . for related changes)
git commit -m "type: description"
git push
```

---

## Branching Strategy

```
main (production - deployed)
  └── dev (integration branch)
        ├── feat/feature-name
        └── fix/bug-name
```

### Branch Types
- **`main`** - always deployable, only receives merges from `dev`
- **`dev`** - integration branch where features come together
- **`feat/*`** - new features
- **`fix/*`** - bug fixes

### Workflow
```bash
# Start new feature (from dev)
git checkout dev
git pull
git checkout -b feat/feature-name

# Work, commit changes...
git add <files>
git commit -m "feat: description"

# Merge to dev when done
git checkout dev
git merge feat/feature-name
git push
git branch -d feat/feature-name    # delete feature branch

# Deploy: merge dev to main
git checkout main
git merge dev
git push
```

### Useful Flags
- `git push -u origin <branch>` - the `-u` (or `--set-upstream`) links local branch to remote, so future `git push`/`git pull` commands don't need branch name

---

## Notes
- Document created: 2026-01-14
- Using Tailwind v4 (new setup process, no config files needed)
- Vite auto-generated `.gitignore` covers: node_modules, dist, logs, editor files
