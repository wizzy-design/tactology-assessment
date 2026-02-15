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
import { PiCaretDownBold, PiUsersThree } from "react-icons/pi";
import PlannerControlsHeader from "./planner-controls-header";
import { useState } from "react";
import { LuFilter, LuLock } from "react-icons/lu";
import {
  MenuContent,
  MenuItem,
  MenuItemText,
  MenuRoot,
  MenuTrigger,
} from "../ui/menu";

const PlannerControls = () => {
  const [isLive, setIsLive] = useState<boolean>(true);
  const [isDayMenuOpen, setIsDayMenuOpen] = useState(false);

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

      {/* Date & Action */}
      <HStack justify="space-between" px={"30px"}>
        <HStack gap="3">
          <HStack
            bg="gray.50"
            px="3"
            py="2"
            borderRadius="20px"
            border="1px solid"
            borderColor="app.neutralOutline"
            gap={"6px"}
            alignItems="center"
          >
            <Text fontSize="sm" color="app.neutralGrey">
              Mon
            </Text>
            <Text fontSize="sm" fontWeight="semibold" color="app.customBlack">
              8
            </Text>
          </HStack>

          <Text fontSize={20} fontWeight="semibold" color="app.customBlack">
            Sept, 2025
          </Text>
        </HStack>

        <HStack gap={3}>
          <HStack gap={2}>
            <Button
              w={38}
              h={38}
              border={"1px solid"}
              borderColor={"app.neutralOutline"}
              borderRadius={"8px"}
            >
              <Icon as={PiUsersThree} color={"app.customBlack"} />
            </Button>

            <Button
              w={38}
              h={38}
              border={"1px solid"}
              borderColor={"app.neutralOutline"}
              borderRadius={"8px"}
            >
              <Icon as={LuFilter} color={"app.customBlack"} />
            </Button>
          </HStack>

          <HStack
            border="1px solid"
            borderColor="app.neutralOutline"
            borderRadius={"8px"}
            h={"38px"}
            overflow={"hidden"}
            p={0}
          >
            <Button
              variant="ghost"
              color={"app.neutralGrey"}
              _hover={{
                bg: "app.neutralLight",
                borderRadius: "none",
                color: "brand.primary",
              }}
              w={"34px"}
              borderLeft={"0"}
              borderRadius={"none"}
              borderStyle={"solid"}
              borderColor={"app.neutralOutline"}
            >
              <Icon as={ArrowLeft2} boxSize={18} />
            </Button>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              px="3"
              color={"app.customBlack"}
            >
              Current day
            </Text>
            <Button
              variant="ghost"
              color={"app.neutralGrey"}
              _hover={{
                bg: "app.neutralLight",
                borderRadius: "none",
                color: "brand.primary",
              }}
              w={"34px"}
              borderRadius={"none"}
              borderLeft={"1px solid"}
              borderRight={"0"}
              borderColor={"app.neutralOutline"}
            >
              <Icon as={ArrowRight2} boxSize={18} />
            </Button>
          </HStack>

          <MenuRoot onOpenChange={(e) => setIsDayMenuOpen(e.open)}>
            <MenuTrigger asChild>
              <Button
                h="38px"
                borderColor="app.neutralOutline"
                borderRadius="8px"
                px="3"
                gap="2"
              >
                <Box
                  boxSize="9px"
                  bg="#0CA740"
                  borderRadius="full"
                  flexShrink={0}
                />
                <Text fontSize="sm" fontWeight="medium" color="app.customBlack">
                  This day
                </Text>
                <Icon
                  as={PiCaretDownBold}
                  color="app.neutralGrey"
                  rotate={isDayMenuOpen ? "180deg" : "0deg"}
                  transition="transform 0.2s"
                />
              </Button>
            </MenuTrigger>

            <MenuContent
              minW="121px"
              borderRadius="12px"
              p="2"
              bg="white"
              color="app.customBlack"
              shadow="0px 4px 16px 0px #6464641A"
              border="1px solid"
              borderColor={"app.neutralOutline"}
            >
              {dayPresets.map((item) => (
                <MenuItem
                  key={item.value}
                  value={item.value}
                  py="2.5"
                  px="2"
                  borderRadius="8px"
                  cursor="pointer"
                  _hover={{
                    bg: "app.neutralLight",
                    borderRadius: "8px",
                    color: "brand.primary",
                  }}
                >
                  <MenuItemText
                    fontWeight="medium"
                    color="app.customBlack"
                    flex="none"
                  >
                    {item.label}
                  </MenuItemText>
                  {item.icon && (
                    <Icon as={item.icon} boxSize="4" color="app.neutralGrey" />
                  )}
                </MenuItem>
              ))}
            </MenuContent>
          </MenuRoot>

          <Button
            color="app.customBlack"
            borderRadius={8}
            borderColor="app.neutralOutline"
            fontSize={"14px"}
            fontWeight={600}
            p={3}
          >
            Publish All
          </Button>
          <Button
            fontSize={"14px"}
            fontWeight={600}
            color="app.customBlack"
            borderRadius={8}
            borderColor="app.neutralOutline"
            p={3}
            gap={2}
          >
            <Icon as={LuLock} boxSize={18} color={"app.neutralGrey"} />
            Lock Shift
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default PlannerControls;

const dayPresets = [
  { value: "day", label: "Deze daag" },
  { value: "week", label: "Deze week" },
  { value: "month", label: "Maand" },
  { value: "custom", label: "Custom", icon: FiPlus },
];
