<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLTfootAttributes } from 'svelte/elements';

	type $$Props = HTMLTfootAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<tfoot
	class={cn('bg-primary font-medium text-primary-foreground', className)}
	{...$$restProps}
>
	<slot />
</tfoot>
