# Search Bar Customization Guide

Customize the `app-search-bar` component in 3 simple ways:

## Method 1: CSS Variables (Easy)

Change colors and styles using CSS variables:

```css
app-search-bar {
  --search-input-bg: #f0f0f0;
  --search-input-border: 2px solid #007bff;
  --search-input-border-radius: 25px;
  --dropdown-bg: #ffffff;
  --app-name-color: #007bff;
}
```

## Method 2: Direct Styles (Advanced)

Pass styles directly to any element:

```html
<app-search-bar
  auth="your-token"
  custom-styles='{
    "input": {
      "backgroundColor": "#1a1a1a",
      "color": "#ffffff",
      "borderRadius": "30px"
    },
    "dropdown": {
      "backgroundColor": "#2d2d2d"
    },
    "appName": {
      "color": "#ffffff"
    }
  }'
></app-search-bar>
```

## Method 3: CSS Classes (Traditional)

Add custom CSS classes and override styles:

```html
<app-search-bar class="my-custom-search" auth="your-token"></app-search-bar>
```

```css
.my-custom-search .search-input {
  background-color: #1a1a1a;
  color: #ffffff;
  border-radius: 30px;
}

.my-custom-search .dropdown {
  background-color: #2d2d2d;
}

.my-custom-search .app-name {
  color: #ffffff;
}
```

## Available CSS Classes

Target these classes for styling:
- `.search-input` - Search input field
- `.dropdown` - Dropdown container  
- `.dropdown-item` - Individual dropdown items
- `.app-icon` - App icon image
- `.app-name` - App name text

## What You Can Style

**customStyles elements:**
- `container`, `input`, `dropdown`, `dropdownItem`, `selectedItem`
- `appIcon`, `appName`, `searchIcon`, `emptyState`

**CSS Variables:**
- `--search-input-bg`, `--search-input-border`, `--search-input-color`
- `--dropdown-bg`, `--dropdown-border`, `--dropdown-shadow`
- `--app-icon-size`, `--app-name-color`, `--app-name-font-size`

## Quick Examples

```html
<!-- Dark theme -->
<app-search-bar 
  auth="token"
  custom-styles='{
    "input": { "backgroundColor": "#333", "color": "#fff" },
    "dropdown": { "backgroundColor": "#444" }
  }'
></app-search-bar>

<!-- Rounded theme -->
<app-search-bar 
  auth="token"
  custom-styles='{
    "input": { "borderRadius": "50px" },
    "dropdown": { "borderRadius": "20px" }
  }'
></app-search-bar>
```

That's it! Choose the method that works best for you.