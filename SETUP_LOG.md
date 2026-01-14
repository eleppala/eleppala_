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

**Status:** ⏳ In Progress

---

## Notes
- Document created: 2026-01-14
- Using Tailwind v4 (new setup process, no config files needed)
