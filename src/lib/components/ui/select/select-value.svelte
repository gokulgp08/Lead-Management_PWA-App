<script lang="ts">
  import { getContext } from "svelte";

  const { selectedText } = getContext("select");

  export let placeholder: string = "";
</script>

{#if $selectedText}
  <span>{$selectedText}</span>
{:else}
  <span class="text-gray-500">{placeholder}</span>
{/if}
