import { Component, Prop, State, Element, Event, EventEmitter, h } from '@stencil/core';
import { algoliasearch } from 'algoliasearch';

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

@Component({
  tag: 'app-search-bar',
  styleUrl: 'app-search-bar.css',
  shadow: true,
})
export class AppSearchBar {

  @Element() el: HTMLElement;

  @Prop() auth!: string;
  @Prop() class: string = '';
  @Prop() customStyles: string | { [key: string]: any } = {};
  @Prop() placeholder: string = 'Search apps...';

  @State() query: string = '';
  @State() results: AlgoliaSearchApp[] = [];
  @State() isLoading: boolean = false;
  @State() isOpen: boolean = false;
  @State() selectedIndex: number = -1;

  @Event() appSelected: EventEmitter<AppSelectedEvent>;

  private searchClient: any;
  private debounceTimer: NodeJS.Timeout;
  private inputRef: HTMLInputElement;

  componentWillLoad() {
    this.initializeAlgolia();
  }

  disconnectedCallback() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    document.removeEventListener('click', this.handleDocumentClick);
  }

  connectedCallback() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  private initializeAlgolia() {
    this.searchClient = algoliasearch(
      "JNSS5CFDZZ",
      "c8f882473ff42d41158430be09ec2b4e"
    );
  }

  private handleDocumentClick = (event: Event) => {
    if (!this.el.contains(event.target as Node)) {
      this.closeDropdown();
    }
  };

  private handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.query = target.value;
    this.selectedIndex = -1;

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    if (this.query.trim().length === 0) {
      this.closeDropdown();
      return;
    }

    this.debounceTimer = setTimeout(() => {
      this.performSearch();
    }, 300);
  };

  private handleInputFocus = () => {
    if (this.query.trim().length > 0 && this.results.length > 0) {
      this.isOpen = true;
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.results.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0 && this.results[this.selectedIndex]) {
          this.selectApp(this.results[this.selectedIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
        this.inputRef?.blur();
        break;
    }
  };

  private async performSearch() {
    if (!this.searchClient || !this.query.trim()) {
      return;
    }

    this.isLoading = true;

    try {
      const searchResult = await this.searchClient.searchSingleIndex({
        indexName: 'appsearch',
        searchParams: {
          query: this.query,
          hitsPerPage: 15,
        }
      });
      
      const { hits } = searchResult;

      this.results = hits as AlgoliaSearchApp[];
      this.isOpen = this.results.length > 0;
      this.selectedIndex = -1;
    } catch (error) {
      console.error('Search failed', error);
      this.results = [];
      this.isOpen = false;
    } finally {
      this.isLoading = false;
    }
  }

  private selectApp(app: AlgoliaSearchApp) {
    const authUrl = `https://shuffler.io/appauth?app_id=${app.objectID}&auth=${this.auth}`;
    
    this.appSelected.emit({ app, authUrl });
    
    // Redirect to auth URL
    window.location.href = authUrl;
    
    this.closeDropdown();
  }

  private closeDropdown() {
    this.isOpen = false;
    this.selectedIndex = -1;
  }

  private handleResultClick = (app: AlgoliaSearchApp) => {
    this.selectApp(app);
  };

  private handleResultMouseEnter = (index: number) => {
    this.selectedIndex = index;
  };

  private getParsedStyles(): { [key: string]: any } {
    if (typeof this.customStyles === 'string') {
      try {
        return JSON.parse(this.customStyles);
      } catch (error) {
        console.warn('Invalid JSON in customStyles prop:', error);
        return {};
      }
    }
    return this.customStyles || {};
  }

  render() {
    const styles = this.getParsedStyles();
    return (
      <div 
        class={`search-bar-container ${this.class}`}
        style={styles.container || {}}
      >
        <div 
          class="search-input-wrapper"
          style={styles.inputWrapper || {}}
        >
          <input
            ref={(el) => (this.inputRef = el)}
            type="text"
            class="search-input"
            style={styles.input || {}}
            placeholder={this.placeholder}
            value={this.query}
            onInput={this.handleInputChange}
            onFocus={this.handleInputFocus}
            onKeyDown={this.handleKeyDown}
            autocomplete="off"
          />
          <div 
            class="search-icon"
            style={styles.searchIcon || {}}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          {this.isLoading && (
            <div 
              class="loading-spinner"
              style={styles.loadingSpinner || {}}
            >
              <div 
                class="spinner"
                style={styles.spinner || {}}
              ></div>
            </div>
          )}
        </div>

        {this.isOpen && (
          <div 
            class="dropdown"
            style={styles.dropdown || {}}
          >
            {this.results.length > 0 ? (
              this.results.map((app, index) => (
                <div
                  key={app.objectID}
                  class={`dropdown-item ${index === this.selectedIndex ? 'selected' : ''}`}
                  style={{
                    ...(styles.dropdownItem || {}),
                    ...(index === this.selectedIndex ? (styles.selectedItem || {}) : {})
                  }}
                  onClick={() => this.handleResultClick(app)}
                  onMouseEnter={() => this.handleResultMouseEnter(index)}
                >
                  <div 
                    class="app-info"
                    style={styles.appInfo || {}}
                  >
                    {app.image_url && (
                      <img 
                        src={app.image_url} 
                        alt={app.name} 
                        class="app-icon"
                        style={styles.appIcon || {}}
                      />
                    )}
                    <div 
                      class="app-details"
                      style={styles.appDetails || {}}
                    >
                      <span 
                        class="app-name"
                        style={styles.appName || {}}
                      >
                        {app.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div 
                class="empty-state"
                style={styles.emptyState || {}}
              >
                No apps found for "{this.query}"
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}