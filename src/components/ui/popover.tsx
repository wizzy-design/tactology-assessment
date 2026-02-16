import { Popover as ChakraPopover, Portal } from "@chakra-ui/react";
import * as React from "react";

export const PopoverRoot = ChakraPopover.Root;
export const PopoverTrigger = ChakraPopover.Trigger;
export const PopoverHeader = ChakraPopover.Header;
export const PopoverBody = ChakraPopover.Body;
export const PopoverFooter = ChakraPopover.Footer;
export const PopoverTitle = ChakraPopover.Title;
export const PopoverDescription = ChakraPopover.Description;
export const PopoverCloseTrigger = ChakraPopover.CloseTrigger;

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  ChakraPopover.ContentProps
>(function PopoverContent(props, ref) {
  const { children, ...rest } = props;
  return (
    <Portal>
      <ChakraPopover.Positioner>
        <ChakraPopover.Content ref={ref} {...rest}>
          {children}
        </ChakraPopover.Content>
      </ChakraPopover.Positioner>
    </Portal>
  );
});

export const PopoverArrow = React.forwardRef<
  HTMLDivElement,
  ChakraPopover.ArrowProps
>(function PopoverArrow(props, ref) {
  return (
    <ChakraPopover.Arrow ref={ref} {...props}>
      <ChakraPopover.ArrowTip />
    </ChakraPopover.Arrow>
  );
});
