import type { PROJECT_TEMPLATES, UI_SIDEBAR_VIEWS, UI_THEMES, UI_VIEWS } from './constants';

export interface Project {
  title: string;
  description: string;
  /**
   * The project’s template name tells StackBlitz how to compile and run project files.
   *
   * Template values supported on https://stackblitz.com include:
   * - EngineBlock environment: `angular-cli`, `create-react-app`, `javascript`, `polymer`, `typescript`, `vue`
   * - WebContainers environment: `node`
   *
   * @see https://developer.stackblitz.com/guides/user-guide/available-environments
   */
  template: ProjectTemplate;
  /**
   * Provide project files, as code strings.
   *
   * Binary files and blobs are not supported.
   */
  files: ProjectFiles;
  /**
   * Define npm dependencies for EngineBlock projects.
   *
   * For WebContainers-based projects (when using `template: 'node'`), this is ignored,
   * and dependencies must be defined in the `package.json` file in the `files` object.
   */
  dependencies?: ProjectDependencies;
  settings?: ProjectSettings;
  /**
   * @deprecated Tags are ignored by the StackBlitz SDK since v1.5.4
   */
  tags?: string[];
}

export type ProjectTemplate = (typeof PROJECT_TEMPLATES)[number];

export interface ProjectDependencies {
  [name: string]: string;
}

export interface ProjectFiles {
  [path: string]: string;
}

export interface ProjectSettings {
  compile?: {
    trigger?: 'auto' | 'keystroke' | 'save' | string;
    action?: 'hmr' | 'refresh' | string;
    clearConsole?: boolean;
  };
}

export interface ProjectOptions {
  /**
   * Show a UI dialog asking users to click a button to run the project.
   */
  clickToLoad?: boolean;
  /**
   * Height of the Console panel below the preview page (as a percentage number, between `0` and `100`).
   *
   * By default, the Console will appear collapsed, and can be opened by users.
   * This option is ignored in WebContainers-based projects.
   */
  devToolsHeight?: number;
  /**
   * Use the “embed” layout of the editor.
   *
   * Defaults to `true` for `embedProject*` methods, and `false` for `openProject*` methods.
   *
   * @deprecated May be removed in a future release.
   */
  forceEmbedLayout?: boolean;
  /**
   * Completely hide the Console panel below the preview page.
   *
   * This option is ignored in WebContainers-based projects.
   */
  hideDevTools?: boolean;
  /**
   * Hide the ActivityBar (sidebar icons).
   */
  hideExplorer?: boolean;
  /**
   * Select one or several project files to open initially.
   *
   * Example usage:
   *
   *     // open a single file
   *     openFile: 'src/index.js'
   *
   *     // open three files in three editor tabs
   *     openFile: 'package.json,src/index.js,src/components/App.js'
   *
   *     // open three files in two side-by-side editor panes
   *     openFile: ['package.json,src/index.js', 'src/components/App.js']
   */
  openFile?: OpenFileOption;
  /**
   * Set the origin URL of your StackBlitz EE server.
   *
   * Defaults to `https://stackblitz.com`.
   */
  origin?: string;
  /**
   * Show the sidebar as open or closed on page load.
   *
   * This might be ignored on narrow viewport widths (mobile and/or tablets).
   *
   * On larger viewports, defaults to `false` for `embedProject*` methods, and `true` for `openProject*` methods.
   */
  showSidebar?: boolean;
  /**
   * Choose the sidebar view to open on project load.
   *
   * Available views: `project` (default), `search`, `ports` (for WebContainers-based projects only) and `settings`.
   */
  sidebarView?: UiSidebarView;
  /**
   * Name of the npm script to run on project load.
   *
   * The name must match an existing key of the `scripts` object in a `package.json` file at the root of the project.
   *
   * Defaults to looking for a `dev` script or a `start` script in WebContainers-based project. Ignored in EngineBlock projects.
   */
  startScript?: string;
  /**
   * Height of the Terminal panel below the editor (as a percentage number).
   *
   * Values such as `0` and `100` may not be applied as-is, but result instead in the minimum or maximum height allowed for the Terminal.
   *
   * The Terminal only appears in WebContainers-based projects.
   */
  terminalHeight?: number;
  /**
   * Select the color theme for the editor UI.
   *
   * Available themes: `dark` (default) and `light`.
   */
  theme?: UiThemeOption;
  /**
   * Show only the code editor or only the preview page.
   *
   * Defaults to showing both the editor and the preview.
   */
  view?: UiViewOption;
}

export interface OpenOptions extends ProjectOptions {
  /**
   * Opens the project in a new browser tab.
   * Defaults to `true`; use `false` to open in the current tab.
   */
  newWindow?: boolean;
  /**
   * Opens the project with the editor in “zen mode” (minified UI).
   * Defaults to `false`.
   */
  zenMode?: boolean;
}

export interface EmbedOptions extends ProjectOptions {
  /**
   * Height of the embed iframe
   */
  height?: number | string;
  /**
   * Width of the embed iframe (defaults to `100%`)
   */
  width?: number | string;
  /**
   * Hide the preview URL in embeds.
   */
  hideNavigation?: boolean;
}

export type OpenFileOption = string | string[];

export type UiSidebarView = 'default' | (typeof UI_SIDEBAR_VIEWS)[number];

export type UiThemeOption = 'default' | (typeof UI_THEMES)[number];

export type UiViewOption = 'default' | (typeof UI_VIEWS)[number];
