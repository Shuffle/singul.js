/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');

const DEFAULT_PLACEHOLDER = 'Search apps...';
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
    placeholder = DEFAULT_PLACEHOLDER,
    customStyles,
    onAppSelected,
    ...rest
  },
  forwardedRef,
) {
  React.useEffect(() => {
    ensureCustomElements();
  }, []);

  const handleAppSelected = React.useCallback(
    (event) => {
      if (onAppSelected) {
        onAppSelected(event.detail, event);
      }
    },
    [onAppSelected],
  );

  const elementProps = {
    ...rest,
    ref: forwardedRef,
    auth: authToken,
    placeholder,
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

