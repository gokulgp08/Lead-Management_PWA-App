<script lang="ts">
  import { Moon, Sun, Monitor } from 'lucide-svelte';
  import Button from './ui/Button.svelte';
  import { theme } from '$lib/stores/theme';

  function toggleTheme() {
    theme.update(current => {
      switch (current) {
        case 'light': return 'dark';
        case 'dark': return 'system';
        case 'system': return 'light';
        default: return 'light';
      }
    });
  }
</script>

<Button variant="ghost" size="icon" on:click={toggleTheme} title="Toggle theme">
  {#if $theme === 'light'}
    <Sun class="h-4 w-4" />
  {:else if $theme === 'dark'}
    <Moon class="h-4 w-4" />
  {:else}
    <Monitor class="h-4 w-4" />
  {/if}
</Button>