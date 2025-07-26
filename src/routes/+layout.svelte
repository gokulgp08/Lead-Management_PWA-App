<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';
  import { company } from '$lib/stores/company';
  import { user } from '$lib/stores/user';
  import { page } from '$app/stores';

  export let data;
  
  onMount(() => {
    theme.init();
    
    // Initialize stores with server data if available
    if (data.user) {
      user.set(data.user);
    }
    
    if (data.company) {
      company.set(data.company);
    }
  });
</script>

<main class="min-h-screen bg-background">
  <slot />
</main>