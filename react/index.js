/* eslint-disable @typescript-eslint/no-var-requires */
let React = require('react');

// Fallback if require returns null (for some bundler configurations)
if (!React && typeof window !== 'undefined' && window.React) {
  React = window.React;
}

if (!React) {
  throw new Error('React is required. Please install react in your project.');
}


const CUSTOM_STYLES_ATTR = 'custom-styles';

const STYLE_KEYS = [
  'container',
  'inputWrapper',
  'input',
  'searchIcon',
  'loadingSpinner',
  'spinner',
  'dropdown',
  'dropdownItem',
  'selectedItem',
  'appInfo',
  'appIcon',
  'appDetails',
  'appName',
  'emptyState',
];

let hasDefinedElements = false;

const ensureCustomElements = () => {
  if (hasDefinedElements || typeof window === 'undefined') {
    return;
  }

  hasDefinedElements = true;
  // Lazy load to avoid requiring React users to import the loader separately.
  // eslint-disable-next-line global-require
  const { defineCustomElements } = require('../loader');
  defineCustomElements(window);
};

const normalizeCustomStyles = (styles) => {
  if (!styles || typeof styles !== 'object') {
    return undefined;
  }

  const styleKeys = Object.keys(styles);
  const matchesExpectedShape = styleKeys.some((key) => STYLE_KEYS.includes(key));

  if (matchesExpectedShape) {
    return styles;
  }

  return { container: styles };
};

const SingulJS = React.forwardRef(function SingulJS(
  {
    authToken,
    placeholder,
    customStyles,
    onAppSelected,
    testingProp,
    ...rest
  },
  forwardedRef,
) {
  React.useEffect(() => {
    ensureCustomElements();
  }, []);

// Store custom handler on window
React.useEffect(() => {
  if (onAppSelected) {
    window.onAppSelected = onAppSelected;
  }
  return () => { 
    delete window.onAppSelected; 
  };
}, [onAppSelected]);

  const handleAppSelected = React.useCallback(
    (event) => {
      if (onAppSelected) {
        onAppSelected(event.detail, event);
      }
    },
    [onAppSelected],
  );

  console.log("The testing prop is: " + testingProp);
  const elementProps = {
    ...rest,
    ref: forwardedRef,
    auth: authToken,
    placeholder,
    testingProp: testingProp,
    [CUSTOM_STYLES_ATTR]: customStyles
      ? JSON.stringify(normalizeCustomStyles(customStyles))
      : undefined,
    onAppSelected: handleAppSelected,
  };

  return React.createElement('singul-js', elementProps);
});

module.exports = {
  SingulJS,
};

