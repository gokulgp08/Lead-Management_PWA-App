<script lang="ts">
  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<div class={`px-2 py-1.5 text-sm font-semibold ${className || ''}`}>
  <slot />
</div>
