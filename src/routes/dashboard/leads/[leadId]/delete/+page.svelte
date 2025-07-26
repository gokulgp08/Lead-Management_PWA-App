<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/components/ui/Button.svelte';

  export let data;
  export let form;
</script>

<svelte:head>
  <title>Delete Lead: {data.lead.name}</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
  <div class="max-w-md w-full p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Confirm Deletion</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Are you sure you want to permanently delete the lead <strong class="text-gray-800 dark:text-gray-200">{data.lead.name}</strong>?
      </p>
      <p class="mt-1 text-sm text-gray-500">This action cannot be undone.</p>
    </div>

    <form method="POST" use:enhance class="space-y-4">
      {#if form?.error}
        <p class="text-sm text-red-500 text-center">{form.error}</p>
      {/if}

      <div class="flex justify-center space-x-4">
        <Button href="/dashboard" variant="outline">Cancel</Button>
        <Button type="submit" variant="destructive">Delete Lead</Button>
      </div>
    </form>
  </div>
</div>
