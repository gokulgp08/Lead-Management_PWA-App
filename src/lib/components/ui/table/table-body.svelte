<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLTbodyAttributes } from 'svelte/elements';

	type $$Props = HTMLTbodyAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<tbody class={cn('[&_tr:last-child]:border-0', className)} {...$$restProps}>
	<slot />
</tbody>
