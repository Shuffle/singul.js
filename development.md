# Singul Frontend Library 

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm start
```

This will:
- Build the library in development mode
- Watch for file changes (auto-rebuild)
- Start a local server at `http://localhost:3333`
- Open your browser automatically

### 3. Play Around

- Edit components in `src/components/`
- Changes will auto-reload in the browser
- Check `src/index.html` to see your component demo (served at `http://localhost:3333`)

## Available Scripts

| Command | What it does |
|---------|-------------|
| `npm start` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run test.watch` | Run tests in watch mode |

## Development Workflow

### Making Changes

1. **Edit Component**: Open `src/components/singul/singul.tsx` (or your component)
2. **Edit Styles**: Modify `src/components/singul/singul.css`
3. **See Changes**: Browser auto-reloads at `http://localhost:3333`

### Testing Your Component

The dev server serves the demo page (auto-generated from `src/index.html`). You can:

- Modify `src/index.html` to test different props
- Open browser DevTools to see console logs
- Test events and interactions

### Example: Testing the Component

Edit `src/index.html` to change props:

```html
<singul-search 
  auth="your-auth-token"
  placeholder="Search apps..."
></singul-search>
```

**Note:** Web components must have a dash (-) in their tag name, so we use `singul-search` instead of `singul`.

## Building for Production

```bash
npm run build
```

This creates optimized files in the `dist/` folder:
- `dist/singul/` - Main bundle files
- `dist/components/` - Individual components
- `dist/types/` - TypeScript definitions

## Project Structure

```
src/
├── components/
│   └── singul/          # Your component
│       ├── singul.tsx   # Component logic
│       └── singul.css   # Component styles
└── index.ts             # Library entry point

www/
└── index.html           # Auto-generated demo page (don't edit - edit src/index.html instead)

dist/                    # Built files (after npm run build)
```






## Publishing to NPM

### First Time Setup

If you haven't published before, you'll need to login to npm:

```bash
npm login
```

Enter your npm username, password, and email. Make sure you have access to the `@singulio` organization.

### Publishing Steps

1. **Update the version** in `package.json`. Just bump the number:
   - Bug fix? Change `0.0.4` → `0.0.5`
   - New feature? Change `0.0.4` → `0.1.0`
   - Breaking change? Change `0.0.4` → `1.0.0`

2. **Build the package**:
   ```bash
   npm run build
   ```

3. **Publish it**:
   ```bash
   npm publish
   ```

That's it! Your package is now on npm.

### Quick Check

After publishing, you can verify it worked:
- Check it on npm: https://www.npmjs.com/package/@singulio/singul
- Or try installing it: `npm install @singulio/singul`

### If Something Goes Wrong

- **Permission denied** - Make sure you're logged in (`npm whoami`) and have access to `@singulio`
- **Version already exists** - You need to use a new version number
- **Package name invalid** - Check that you're part of the `@singulio` organization

### Typical Workflow

```bash
# Update version
In package.json

# Build
npm run build

# Publish
npm publish

# Push to git
Push the latest changes to git.

