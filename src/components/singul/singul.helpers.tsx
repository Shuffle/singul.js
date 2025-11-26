
export interface AlgoliaSearchApp {
  name: string;
  description: string;
  objectID: string;
  creator: string;
  app_version: string;
  image_url: string;
  time_edited: number;
  generated: boolean;
  invalid: boolean;
  priority: number;
  actions: number;
  tags: string[];
  accessible_by: string[];
  categories: string[];
  action_labels: string[];
  triggers: string[];
  verified: boolean;
}

export interface AppSelectedEvent {
  app: AlgoliaSearchApp;
  authUrl: string;
}
