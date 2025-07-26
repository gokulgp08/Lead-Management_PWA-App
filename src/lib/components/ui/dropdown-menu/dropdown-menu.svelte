<script lang="ts">
	import type { CreateDropdownMenuProps } from '@melt-ui/svelte';
	import { setCtx } from './index.js';

	type $$Props = CreateDropdownMenuProps & {
		placement?: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
	};

	export let placement: $$Props['placement'] = 'bottom';

	const { ...rest } = $$props;

	const props: CreateDropdownMenuProps = {
		...rest,
		positioning: {
			placement: placement
		}
	};

	setCtx(props);
</script>

<slot />

