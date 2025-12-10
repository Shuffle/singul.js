import type { CSSProperties, HTMLAttributes, JSX, Ref } from 'react';
import { defineCustomElements } from '../../loader';
import React from 'react';

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

type CustomStylesInput = CSSProperties | { [key: string]: any };

export interface SingulJSProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  authToken: string;
  placeholder?: string;
  customStyles?: CustomStylesInput;
  testingProp?: string;
  onAppSelected?: (detail: unknown, event: CustomEvent) => void;
}

let hasDefinedElements = false;

const ensureCustomElements = () => {
  if (hasDefinedElements || typeof window === 'undefined') {
    return;
  }
  hasDefinedElements = true;
  defineCustomElements(window);
};

// For the custom styles that user will add to customise the component, we need to normalize the styles to make sure they are in the correct format
const normalizeCustomStyles = (styles?: CustomStylesInput): CustomStylesInput | undefined => {
  if (!styles || typeof styles !== 'object') {
    return undefined;
  }
  const styleKeys = Object.keys(styles);
  const matchesExpectedShape = styleKeys.some(key => STYLE_KEYS.includes(key));
  if (matchesExpectedShape) {
    return styles;
  }
  return { container: styles };
};

if (!React) {
  throw new Error('React is required. Please install react in your project.');
}

// This is the main component that is exported to the user (From @singulio/singul/react)
type SingulJSComponent = (
  props: SingulJSProps & { ref?: Ref<HTMLElement> }
) => JSX.Element | null;

const SingulJSImpl = React.forwardRef<HTMLElement, SingulJSProps>(function SingulJS(
  { authToken,
    placeholder,
    customStyles,
    onAppSelected,
    testingProp,
    ...rest
  }: SingulJSProps,
  forwardedRef: Ref<HTMLElement>,
) {
  React.useEffect(() => {
    ensureCustomElements();
  }, []);

  React.useEffect(() => {
    if (onAppSelected && typeof window !== 'undefined') {
      const win = window as any;
      win.onAppSelected = onAppSelected;
    }
    return () => {
      if (typeof window !== 'undefined') {
        const win = window as any;
        delete win.onAppSelected;
      }
    };
  }, [onAppSelected]);

  const handleAppSelected = React.useCallback(
    (event: CustomEvent) => {
      if (onAppSelected) {
        onAppSelected(event.detail, event);
      }
    },
    [onAppSelected],
  );

  console.log(`The testing prop is: ${testingProp}`);

  const elementProps = {
    ...rest,
    ref: forwardedRef,
    auth: authToken,
    placeholder,
    testingProp: testingProp,
    ['custom-styles']: customStyles ? JSON.stringify(normalizeCustomStyles(customStyles)) : undefined,
    onAppSelected: handleAppSelected,
  };

  return React.createElement('singul-js', elementProps);
});

export const SingulJS = SingulJSImpl as SingulJSComponent;
