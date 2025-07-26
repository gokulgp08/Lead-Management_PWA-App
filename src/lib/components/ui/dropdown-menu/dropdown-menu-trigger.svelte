<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { getCtx } from './index.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const { elements: { trigger }, states: { open } } = getCtx();

	type $$Props = HTMLButtonAttributes & {
		asChild?: boolean;
	};

	export let asChild = false;
</script>

{#if asChild}
	<slot builder={$trigger} />
{:else}
	<button use:melt={$trigger} {...$$restProps} on:click={() => open.set(!$open)}>
		<slot />
	</button>
{/if}
