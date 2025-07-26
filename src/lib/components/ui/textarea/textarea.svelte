<script lang="ts">
  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<textarea
  class={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900 ${className || ''}`}
  {...$$restProps}
/>
