"use client";

import { Menu as ChakraMenu, Portal } from "@chakra-ui/react";
import * as React from "react";

export interface MenuContentProps extends ChakraMenu.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
}

export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  function MenuContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraMenu.Positioner>
          <ChakraMenu.Content ref={ref} {...rest} />
        </ChakraMenu.Positioner>
      </Portal>
    );
  },
);

export const MenuArrow = ChakraMenu.Arrow;
export const MenuArrowTip = ChakraMenu.ArrowTip;
export const MenuRoot = ChakraMenu.Root;
export const MenuTrigger = ChakraMenu.Trigger;
export const MenuItem = ChakraMenu.Item;
export const MenuItemText = ChakraMenu.ItemText;
export const MenuItemCommand = ChakraMenu.ItemCommand;
export const MenuTriggerItem = ChakraMenu.TriggerItem;
export const MenuItemGroup = ChakraMenu.ItemGroup;
export const MenuItemGroupLabel = ChakraMenu.ItemGroupLabel;
export const MenuSeparator = ChakraMenu.Separator;
export const MenuCheckboxItem = ChakraMenu.CheckboxItem;
export const MenuRadioItem = ChakraMenu.RadioItem;
export const MenuRadioItemGroup = ChakraMenu.RadioItemGroup;
export const MenuContextTrigger = ChakraMenu.ContextTrigger;
