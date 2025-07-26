/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/configuration#env
// for more info about environment variables in SvelteKit
declare namespace App {
  interface PrivateEnv {
    // Server-side only environment variables
    SERVICE_ROLE_KEY: string;
  }
  
  interface PublicEnv {
    // Public (client-side) environment variables
    PUBLIC_SUPABASE_URL: string;
    PUBLIC_SUPABASE_ANON_KEY: string;
  }
}

// Augment the global namespace for Node.js
declare namespace NodeJS {
  interface ProcessEnv extends App.PrivateEnv, App.PublicEnv {}
}

// Augment the import.meta.env type
interface ImportMetaEnv extends App.PublicEnv {}

// Make sure TypeScript knows about the types
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
