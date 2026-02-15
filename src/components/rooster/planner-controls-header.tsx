"use client";

import { Box, HStack, Text, Button, Icon } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { PiCaretDownBold } from "react-icons/pi";

const PlannerControlsHeader = () => {
  return (
    <Box w="full">
      {/* Header */}
      <HStack
        w="full"
        borderY={"1px solid"}
        borderColor={"app.neutralOutline"}
        px={"30px"}
        justifyContent="space-between"
        alignItems="center"
        h="70px"
      >
        <Text fontSize={"24px"} color={"app.customBlack"} fontWeight={700}>
          Planner
        </Text>

        <HStack gap="2">
          <Button
            border={"1px solid"}
            borderColor={"app.neutralOutline"}
            borderRadius={8}
            px={"12px"}
            py={"10px"}
          >
            <Icon
              as={PiCaretDownBold}
              boxSize={5}
              px={"1.2px"}
              color={"app.neutralGrey"}
            />
            Open Days
          </Button>

          <Button
            borderRadius={8}
            border={"1px solid"}
            borderColor={"app.neutralOutline"}
            px={"12px"}
            py={"10px"}
          >
            <Icon as={FiPlus} color={"app.neutralGrey"} />
            <Text fontSize={"14px"} color={"app.customBlack"}>
              Nieuw
            </Text>
            <Icon
              as={PiCaretDownBold}
              boxSize={5}
              px={"1.2px"}
              color={"app.neutralGrey"}
            />
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default PlannerControlsHeader;
