<script lang="ts">
  import { cn } from '$lib/utils';
  import type { HTMLLabelAttributes } from 'svelte/elements';

  interface $$Props extends HTMLLabelAttributes {}

  $: classes = cn(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    $$props.class
  );
</script>

<label class={classes} {...$$restProps}>
  <slot />
</label>