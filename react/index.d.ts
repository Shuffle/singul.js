import type {
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react';

export interface SingulJSProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  authToken: string;
  placeholder?: string;
  customStyles?: Record<string, unknown> | CSSProperties;
  onAppSelected?: (detail: unknown, event: CustomEvent) => void;
}

export const SingulJS: ForwardRefExoticComponent<SingulJSProps & RefAttributes<HTMLElement>>;

