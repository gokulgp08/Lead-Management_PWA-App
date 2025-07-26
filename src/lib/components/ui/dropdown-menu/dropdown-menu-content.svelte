<script lang="ts">
	import { getCtx } from './index.js';
	import { melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import type { HTMLAttributes } from 'svelte/elements';

	const { elements: { menu }, states: { open } } = getCtx();

	type $$Props = HTMLAttributes<HTMLDivElement>;
</script>

{#if $open}
	<div 
		use:melt={$menu} 
		transition:fly={{ y: -5 }} 
		class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none"
		{...$$restProps}
	>
		<slot />
	</div>
{/if}
