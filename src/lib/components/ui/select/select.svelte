<script lang="ts">
  import { createSelect, type CreateSelectProps } from "@melt-ui/svelte";
  import { setContext } from "svelte";

  type $$Props = CreateSelectProps;

  const { elements, states, options } = createSelect($$props);

  setContext("select", { elements, states, options });
</script>

<slot />
