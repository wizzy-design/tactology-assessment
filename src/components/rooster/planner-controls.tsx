"use client";

import { Box, HStack, Text, Button, Icon, Badge } from "@chakra-ui/react";
import {
  ArrowLeft2,
  ArrowRight2,
  Filter,
  Setting4,
  People,
} from "iconsax-reactjs";
import { FiPlus } from "react-icons/fi";
import { PiCaretDownBold } from "react-icons/pi";
import PlannerControlsHeader from "./planner-controls-header";
import { useState } from "react";

export const PlannerControls = () => {
  const [isLive, setIsLive] = useState<boolean>(true);

  const handleLiveToggle = () => {
    setIsLive(!isLive);
  };

  return (
    <Box w="full" spaceY={5}>
      {/* Header */}
      <PlannerControlsHeader />

      {/* Live/Planner Toggle */}
      <HStack
        mx={"32px"}
        p={1}
        gap={4}
        bgColor={isLive ? "#FFF5F5" : "#F0F0FF"}
        borderRadius="full"
        borderWidth="1px"
        borderStyle="solid"
        borderColor={isLive ? "#FF6669" : "#BAB9FE"}
      >
        <HStack bg="white" p={1} borderRadius="full">
          <Button
            h={6}
            w={"66px"}
            onClick={handleLiveToggle}
            borderRadius="20px"
            bg={isLive ? "#FF383C" : ""}
            color={isLive ? "white" : "app.neutralSubtle"}
            px="6"
            fontSize="12px"
            fontWeight={isLive ? 700 : 500}
          >
            Live
          </Button>

          <Button
            h={6}
            w={"66px"}
            onClick={handleLiveToggle}
            borderRadius="20px"
            px="6"
            color={isLive ? "app.neutralSubtle" : "white"}
            bg={isLive ? "" : "brand.secondary"}
            fontWeight={isLive ? 500 : 700}
            fontSize="12px"
          >
            Planner
          </Button>
        </HStack>

        <Text fontWeight={500} fontSize="12px" color="app.customBlack">
          Description of the {isLive ? "live" : "planner view"}
        </Text>
      </HStack>
    </Box>
  );
};
