<script lang="ts">
  import { getContext } from "svelte";
  import { melt } from "@melt-ui/svelte";
  import ChevronDown from 'lucide-svelte/icons/chevron-down';

  const { trigger } = getContext("select");

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<button
  use:melt={$trigger}
  class={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900 ${className || ''}`}
  {...$$restProps}
>
  <slot />
  <ChevronDown class="h-4 w-4 opacity-50" />
</button>
