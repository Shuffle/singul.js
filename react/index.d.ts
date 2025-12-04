import type {
  CSSProperties,
  HTMLAttributes,
  Ref,
} from 'react';

export interface SingulJSProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  authToken: string;
  placeholder?: string;
  customStyles?: Record<string, unknown> | CSSProperties;
  testingProp?: string;
  onAppSelected?: (detail: unknown, event: CustomEvent) => void;
}

export type SingulJSComponent = (
  props: SingulJSProps & { ref?: Ref<HTMLElement> }
) => JSX.Element | null;

export const SingulJS: SingulJSComponent;