import { createDropdownMenu, type CreateDropdownMenuProps } from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import Root from "./dropdown-menu.svelte";
import Content from "./dropdown-menu-content.svelte";
import Item from "./dropdown-menu-item.svelte";
import Label from "./dropdown-menu-label.svelte";
import Separator from "./dropdown-menu-separator.svelte";
import Trigger from "./dropdown-menu-trigger.svelte";

const NAME = "DropdownMenu";

export type DropdownMenu = ReturnType<typeof createDropdownMenu>;

export const setCtx = (props: CreateDropdownMenuProps) => {
	const dropdownMenu = createDropdownMenu(props);
	setContext(NAME, dropdownMenu);
	return dropdownMenu;
};

export const getCtx = () => {
	return getContext<DropdownMenu>(NAME);
};

export {
    Root,
    Content,
    Item,
    Label,
    Separator,
    Trigger
}
