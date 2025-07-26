<script lang="ts">
  import { getContext } from "svelte";
  import { melt } from "@melt-ui/svelte";

  const { menu } = getContext("select");

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<div use:melt={$menu} class={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-gray-900 shadow-md animate-in fade-in-80 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 ${className || ''}`}>
  <slot />
</div>
