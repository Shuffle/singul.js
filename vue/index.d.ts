import type { CSSProperties, DefineComponent, HTMLAttributes } from 'vue';

export interface SingulJSProps extends Omit<HTMLAttributes, 'onChange'> {
  authToken: string;
  placeholder?: string;
  customStyles?: Record<string, unknown> | CSSProperties | string;
}

export type SingulJSEmits = {
  (event: 'appSelected', detail: unknown, nativeEvent: CustomEvent): void;
};

export const SingulJS: DefineComponent<SingulJSProps, any, any, any, any, any, any, SingulJSEmits>;

