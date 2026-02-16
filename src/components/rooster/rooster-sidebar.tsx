"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Input,
  Separator,
} from "@chakra-ui/react";
import { Filter, Maximize4 } from "iconsax-reactjs";
import { useState } from "react";
import { MOCK_USERS } from "@/lib/mock-data";
import { CiSearch } from "react-icons/ci";
import DraggableUserCard from "./draggable-user-card";

const RoosterSidebar = () => {
  const [activeTab, setActiveTab] = useState("On Leave");

  const tabs = [
    { label: "All", count: 32 },
    { label: "Available", count: 30 },
    { label: "On Leave", count: 4 },
  ];

  return (
    <Box
      w="345px"
      bg="white"
      h="100%"
      border="2px solid"
      borderRadius={"16px"}
      borderColor="#F3F4F6"
      display="flex"
      flexDirection="column"
      p="24px"
    >
      {/* Header */}
      <HStack gap="3" mb="5">
        <Icon as={Maximize4} boxSize="18px" color="#6C7278" />
        <Separator orientation="vertical" h="24px" borderColor="#BAC1CC" />
        <Text fontSize="18px" fontWeight="700" color="#141B34">
          Roster
        </Text>
      </HStack>

      {/* Search and Filter */}
      <HStack gap="8px" mb="24px">
        <Box position="relative" flex="1">
          <Input
            placeholder="Search"
            pl="10"
            h="44px"
            borderRadius="12px"
            border="1px solid"
            borderColor="app.neutralOutline"
            fontSize="16px"
            _placeholder={{ color: "app.neutralSubtle" }}
          />
          <Box
            position="absolute"
            left="10px"
            top="46%"
            transform="translateY(-50%)"
          >
            <Icon as={CiSearch} boxSize="20px" color="app.neutralGrey" />
          </Box>
        </Box>
        <Box
          h="44px"
          w="44px"
          borderRadius="12px"
          border="1px solid"
          borderColor="app.neutralOutline"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={Filter} boxSize="20px" color="app.neutralGrey" />
        </Box>
      </HStack>

      {/* Tabs */}
      <HStack
        gap="30px"
        mb="24px"
        borderBottom="1px solid"
        borderColor="#E9EAEB"
        pb="0"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <Box
              key={tab.label}
              position="relative"
              pb="12px"
              cursor="pointer"
              onClick={() => setActiveTab(tab.label)}
            >
              <HStack gap="5px">
                <Text
                  textWrap={"nowrap"}
                  fontSize="14px"
                  fontWeight={isActive ? "600" : "500"}
                  color={isActive ? "brand.secondary" : "#717680"}
                >
                  {tab.label}
                </Text>
                <Box
                  bg={isActive ? "brand.secondaryLight" : "gray.50"}
                  px="8px"
                  py="2px"
                  borderRadius="full"
                  border="1px solid"
                  borderColor={"app.neutralOutline"}
                >
                  <Text
                    fontSize="12px"
                    fontWeight="600"
                    color={isActive ? "brand.secondary" : "#414651"}
                  >
                    {tab.count}
                  </Text>
                </Box>
              </HStack>
              {isActive && (
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  h="2px"
                  bg="brand.secondary"
                />
              )}
            </Box>
          );
        })}
      </HStack>

      {/* Roster List */}
      <VStack
        gap="20px"
        align="stretch"
        overflowY="auto"
        flex="1"
        pr="4px"
        css={{
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-track": { bg: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            bg: "gray.100",
            borderRadius: "full",
          },
        }}
      >
        {/* Repeating mock users to fill space as in screenshot */}
        {[...MOCK_USERS, ...MOCK_USERS].map((user, idx) => (
          <DraggableUserCard
            key={`${user.id}-${idx}`}
            id={`sidebar-user-${user.id}-${idx}`}
            user={user}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default RoosterSidebar;
