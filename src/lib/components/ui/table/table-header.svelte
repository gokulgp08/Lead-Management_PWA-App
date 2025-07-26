<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLTheadAttributes } from 'svelte/elements';

	type $$Props = HTMLTheadAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<thead class={cn('[&_tr]:border-b', className)} {...$$restProps}>
	<slot />
</thead>
