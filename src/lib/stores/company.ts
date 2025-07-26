import { writable } from 'svelte/store';

interface Company {
  id: string;
  name: string;
  subdomain: string;
  primaryColor: string;
}

function createCompanyStore() {
  const { subscribe, set, update } = writable<Company | null>(null);

  return {
    subscribe,
    set,
    setPrimaryColor: (color: string) => {
      update(company => {
        if (company) {
          company.primaryColor = color;
          updateCSSVariables(color);
        }
        return company;
      });
    }
  };
}

function updateCSSVariables(primaryColor: string) {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    const hsl = hexToHsl(primaryColor);
    root.style.setProperty('--primary', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
    root.style.setProperty('--primary-foreground', hsl.l > 50 ? '0 0% 9%' : '0 0% 98%');
  }
}

function hexToHsl(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export const company = createCompanyStore();