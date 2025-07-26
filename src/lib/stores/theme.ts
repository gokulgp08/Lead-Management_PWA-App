import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

function createThemeStore() {
  const { subscribe, set, update } = writable<Theme>('system');

  return {
    subscribe,
    set: (theme: Theme) => {
      if (browser) {
        localStorage.setItem('theme', theme);
        applyTheme(theme);
      }
      set(theme);
    },
    init: () => {
      if (browser) {
        const stored = localStorage.getItem('theme') as Theme;
        const theme = stored || 'system';
        applyTheme(theme);
        set(theme);
      }
    }
  };
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.classList.toggle('dark', systemTheme === 'dark');
  } else {
    root.classList.toggle('dark', theme === 'dark');
  }
}

export const theme = createThemeStore();

export const resolvedTheme = derived(theme, ($theme) => {
  if (!browser) return 'light';
  
  if ($theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  return $theme;
});