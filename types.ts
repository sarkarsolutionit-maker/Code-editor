export interface EditorState {
  code: string;
  fileName: string;
  theme: 'light' | 'dark';
  isFullscreen: boolean;
  isSearchOpen: boolean;
}

export type Theme = 'light' | 'dark';

export interface FileData {
  name: string;
  content: string;
}