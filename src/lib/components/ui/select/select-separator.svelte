<script lang="ts">
  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<div class={`-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-800 ${className || ''}`} />
