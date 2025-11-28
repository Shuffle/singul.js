/* eslint-disable @typescript-eslint/no-var-requires */
const { defineComponent, h, onMounted, onBeforeUnmount, ref } = require('vue');

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

const SingulJS = defineComponent({
  name: 'SingulJS',
  inheritAttrs: false,
  props: {
    authToken: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Search apps...",
    },
    customStyles: {
      type: [Object, String],
      default: undefined,
    },
  },
  emits: ['appSelected'],
  setup(props, { attrs, emit, slots, expose }) {
    const elementRef = ref(null);
    let handler;

    onMounted(() => {
      ensureCustomElements();

      handler = (event) => {
        emit('appSelected', event.detail, event);
      };

      elementRef.value?.addEventListener('appSelected', handler);
    });

    onBeforeUnmount(() => {
      elementRef.value?.removeEventListener('appSelected', handler);
    });

    expose({
      el: elementRef,
    });

    const renderChildren = () => {
      if (!slots.default) {
        return undefined;
      }
      return slots.default();
    };

    return () =>
      h(
        'singul-js',
        {
          ...attrs,
          ref: elementRef,
          auth: props.authToken,
          placeholder: props.placeholder,
          [CUSTOM_STYLES_ATTR]:
            typeof props.customStyles === 'string'
              ? props.customStyles
              : props.customStyles
              ? JSON.stringify(normalizeCustomStyles(props.customStyles))
              : undefined,
        },
        renderChildren(),
      );
  },
});

module.exports = {
  SingulJS,
};

