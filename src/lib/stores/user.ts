import { writable } from 'svelte/store';

interface User {
  id: string;
  email: string;
  name: string;
  companyId: string;
  role: 'admin' | 'user';
  theme: 'light' | 'dark' | 'system';
}

function createUserStore() {
  const { subscribe, set, update } = writable<User | null>(null);

  return {
    subscribe,
    set,
    clear: () => set(null),
    updateTheme: (newTheme: 'light' | 'dark' | 'system') => {
      update(user => {
        if (user) {
          user.theme = newTheme;
        }
        return user;
      });
    }
  };
}

export const user = createUserStore();