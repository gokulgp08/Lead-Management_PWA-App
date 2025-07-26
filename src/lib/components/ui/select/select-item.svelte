<script lang="ts">
  import { getContext } from "svelte";
  import { melt } from "@melt-ui/svelte";

  const { item } = getContext("select");

  export let value: string;
  export let label: string | undefined = undefined;

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<div
  use:melt={$item({ value, label })}
  class={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 ${className || ''}`}
>
  <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
    <!-- Checkmark will be handled by Melt UI -->
  </span>
  <slot />
</div>
