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
  - [Nextjs](#nextjs-inintegration)
  - [Vue](#vue-integration)
- [Component Properties](#component-properties)
- [Events](#events)
- [Styling Options](#styling-options)
- [Troubleshooting](#troubleshooting)

## Installation

First, install the package in your project:

```bash
npm install @singulio/singul
```

or

```bash
yarn add @singulio/singul
```

## Framework Integration

### React Integration

```jsx
import { SingulJS } from '@singulio/singul/react';

const AUTH_TOKEN = 'replace-with-your-token';
const CUSTOM_STYLES = { container: { width: '400px' } };

export default function App() {

  return (
    <section>
      <h1>Singul Search</h1>
      <SingulJS
        authToken={AUTH_TOKEN}
        placeholder="Your placeholder.."
        customStyles={CUSTOM_STYLES}
      />
    </section>
  );
}
```

### Nextjs Integration

```jsx
import { SingulJS } from '@singulio/singul/react';

const AUTH_TOKEN = 'replace-with-your-token';
const CUSTOM_STYLES = { container: { width: '400px' } };

export default function page() {

  return (
    <section>
      <h1>Singul Search</h1>
      <SingulJS
        authToken={AUTH_TOKEN}
        placeholder="Your placeholder.."
        customStyles={CUSTOM_STYLES}
      />
    </section>
  );
}
```

### Vue Integration

```vue
<template>
      <SingulJS
        authToken="dasd"
        placeholder="Search apps..."
        :customStyles="{ input: { width: '4000px' } }"
        @appSelected="handleAppSelected"
      />
</template>

<script>
import { SingulJS } from '@singulio/singul/vue';

export default {
  name: 'HelloWorld',
  props: { msg: String },
  components: { SingulJS },
  methods: {
    handleAppSelected(detail) {
      console.log('selected app', detail);
    },
  },
};
</script>
```

## Component Properties

The `app-search-bar` component accepts the following properties:

| Property      | Type                  | Description                                     | Default          |
|---------------|------------------------|------------------------------------------------|------------------|
| auth          | string (required)      | Auth token for the URL                          | undefined        |
| customStyles  | string or object       | Custom styles object for complete customization | {}               |
| placeholder   | string                 | Placeholder text for the search input           | 'Search apps...' |

## Styling Options

For styling options, refer to the [Customization Guide](CUSTOMIZATION_GUIDE.md) which provides detailed information on:

- CSS Variables
- Direct Styles
- CSS Classes

## Troubleshooting

### Common Issues

1. **Component not rendering**: Ensure you've called `defineCustomElements()` before using the component.

2. **Styling not applying**: Check that you're using the correct CSS selectors or custom style properties.

