<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div
	role="region"
	class={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
	{...$$restProps}
	
>
	<slot />
</div>
