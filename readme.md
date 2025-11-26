<h1 align="center">

[<img src="https://shuffler.io/images/logos/singul.svg" alt="Singul Logo" width="100"/>](https://singul.io)

Singul Frontend Library

</h1>
<h4 align="center">
A Singul frontend function for app search, control and authentication.
</h4>


## Table of Contents

- [Installation](#installation)
- [Framework Integration](#framework-integration)
  - [React](#react-integration)
  - [Vue](#vue-integration)
- [Component Properties](#component-properties)
- [Events](#events)
- [Styling Options](#styling-options)
- [Troubleshooting](#troubleshooting)

## Installation

First, install the package in your project:

```bash
npm install @singulio/app-auth-search
```

or

```bash
yarn add @singulio/app-auth-search
```

## Framework Integration

### React Integration

React integration is straightforward with a simple wrapper component:

#### Step 1: Install the library

```bash
npm install @singulio/app-auth-search
```

#### Step 2: Create a wrapper component

Create a new component to wrap the web component:

```jsx
import React, { useEffect } from 'react';
import '@singulio/app-auth-search'; // Import the package

function SearchBar({ authToken }) {
  return (
    <div
    style={{width: "400px"}}
    >
    <app-search-bar
      auth={authToken}
      placeholder="Search apps..."
    ></app-search-bar>
    </div>
  );
}

export default SearchBar;
```

#### Step 3: Use the component in your application

```jsx
import AppSearchBar from './AppSearchBarWrapper';

function App() {
  return (
    <div className="App">
      <h1>App Auth Search</h1>
      <SearchBar 
        auth="your-auth-token" 
        placeholder="Find an app..."
      />
    </div>
  );
}

export default App;
```

### Vue Integration

Vue integration requires registering the custom elements and then using them directly in templates.

#### Step 1: Install the library

```bash
npm install @singulio/app-auth-search
```

#### Step 2: Register the custom elements

In your App.vue file, add:

```javascript
import { defineCustomElements } from '@singulio/app-auth-search/loader';

// Register the custom elements
defineCustomElements();
```

#### Step 3: Use the component in any Vue template

```vue
<template>
  <div>
    <h1>App Search</h1>
    <app-search-bar
      auth="your-auth-token"
      placeholder="Find an app..."
    ></app-search-bar>
  </div>
</template>
```



## Component Properties

The `app-search-bar` component accepts the following properties:

| Property      | Type                  | Description                                     | Default          |
|---------------|------------------------|------------------------------------------------|------------------|
| auth          | string (required)      | Auth token for the URL                          | undefined        |
| customStyles  | string or object       | Custom styles object for complete customization | {}               |
| placeholder   | string                 | Placeholder text for the search input           | 'Search apps...' |

## Events

The component emits the following events:

| Event        | Description                     | Event Detail Type    |
|--------------|----------------------------------|----------------------|
| appSelected  | Emitted when an app is selected | AppSelectedEvent     |

## Styling Options

For styling options, refer to the [Customization Guide](CUSTOMIZATION_GUIDE.md) which provides detailed information on:

- CSS Variables
- Direct Styles
- CSS Classes

## Troubleshooting

### Common Issues

1. **Component not rendering**: Ensure you've called `defineCustomElements()` before using the component.

2. **Styling not applying**: Check that you're using the correct CSS selectors or custom style properties.

3. **Events not firing**: Verify that you've attached event listeners correctly for your framework.

### Framework-Specific Notes

- **React**: React passes all props as strings, so objects like `customStyles` need to be stringified.
- **Vue**: Use `:custom-styles` with `JSON.stringify()` to pass object properties.
