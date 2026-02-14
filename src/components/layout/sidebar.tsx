"use client";

import LogoIcon from "@/assets/logo";
import RoosterIcon from "@/assets/rooster-icon";
import { Box, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import {
  DocumentText,
  HamburgerMenu,
  Category2,
  MenuBoard,
  Notepad2,
  Document,
  Stickynote,
} from "iconsax-reactjs";
import { PiCaretDownLight } from "react-icons/pi";

const Sidebar = () => {
  const activeLabel = "Planner";

  return (
    <Box
      as="aside"
      w="260px"
      h="100vh"
      bg="white"
      borderRight="1px solid"
      borderColor="app.neutralOutline"
      px="13px"
      py={6}
      position="fixed"
      left="0"
      top="0"
      spaceY={"37px"}
    >
      {/* Logo and Hamburger Menu */}
      <HStack justify={"space-between"}>
        <LogoIcon />
        <Icon
          as={HamburgerMenu}
          color="brand.800"
          boxSize="36px"
          border={"1px solid"}
          p={2}
          borderColor="app.neutralOutline"
          borderRadius={"8px"}
        />
      </HStack>

      {/* Navigation Items */}
      <VStack gap={2}>
        {navItems.map((item) => (
          <Box key={item.label} width={"100%"}>
            <Flex
              width={"100%"}
              align={"center"}
              gap={3}
              p={"11px"}
              pr={"0"}
              justify={"space-between"}
              cursor={"pointer"}
            >
              <HStack>
                <Icon as={item.icon} color="#292D32" boxSize="5" />
                <Text
                  fontWeight={"medium"}
                  fontSize={"16px"}
                  color={
                    activeLabel === item.label ? "brand.800" : "app.neutralGray"
                  }
                >
                  {item.label}
                </Text>
              </HStack>

              {item.children && (
                <Icon as={PiCaretDownLight} color="#292D32" boxSize="5" />
              )}
            </Flex>

            {/* Sub-nav items */}
            {item.children && (
              <VStack gap={0} pl={4}>
                {item.children.map((child) => (
                  <Flex
                    key={child.label}
                    width={"100%"}
                    gap={3}
                    justify={"start"}
                    align={"center"}
                    p={"11px"}
                    pr={"0"}
                    cursor={"pointer"}
                    borderLeft={
                      activeLabel === child.label ? "2px solid" : "1px solid"
                    }
                    borderColor={
                      activeLabel === child.label
                        ? "brand.secondary"
                        : "app.neutralLight"
                    }
                  >
                    <Icon
                      as={child.icon}
                      color={
                        activeLabel === child.label
                          ? "brand.secondary"
                          : "#292D32"
                      }
                      boxSize="5"
                    />
                    <Text
                      fontWeight={"medium"}
                      fontSize={"16px"}
                      color={
                        activeLabel === child.label
                          ? "brand.secondary"
                          : "app.neutralGray"
                      }
                    >
                      {child.label}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;

const navItems = [
  { label: "Startpagina", icon: Category2 },
  {
    label: "Rooster",
    icon: RoosterIcon,

    children: [
      { label: "Mijn Rooster", icon: DocumentText },
      { label: "Planner", icon: Stickynote },
      { label: "Instellingen", icon: Stickynote },
    ],
  },
  { label: "My to do Protocols", icon: Stickynote },
  { label: "Document Management", icon: Document },
  { label: "Department News", icon: Notepad2 },
  { label: "Knowledge Base", icon: MenuBoard },
  { label: "General News", icon: DocumentText },
];
