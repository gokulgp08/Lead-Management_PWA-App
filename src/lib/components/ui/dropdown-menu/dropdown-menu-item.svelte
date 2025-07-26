<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { getCtx } from './index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	const { elements: { item } } = getCtx();

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		asChild?: boolean;
	};

	export let asChild = false;
</script>

{#if asChild}
	<slot builder={$item} />
{:else}
	<div 
		use:melt={$item} 
		{...$$restProps}
		class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full"
	>
		<slot />
	</div>
{/if}
