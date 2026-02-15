"use client";

import { Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { Category, Setting2 } from "iconsax-reactjs";
import { LuBell } from "react-icons/lu";
import { PiCaretDownBold } from "react-icons/pi";

const TopNav = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      width={"100%"}
      px={6}
      py={"30px"}
      gapX={"66px"}
    >
      {/* Icons */}
      <Flex gap={"18px"}>
        {/* Category Icon */}
        <Button
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxSize={10}
          bg="#F6FAFD"
          borderRadius="8px"
        >
          <Icon as={Category} color="brand.primary" boxSize={5} />
        </Button>

        {/* Settings Icon */}
        <Button
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxSize={10}
          bg="#F6FAFD"
          borderRadius="8px"
        >
          <Icon as={Setting2} color="app.customBlack" boxSize={5} />
        </Button>

        {/* Notification Icon with Dot */}
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w={10}
          h={10}
          flexShrink={0}
          bg="#F6FAFD"
          borderRadius="8px"
          cursor="pointer"
        >
          <Icon as={LuBell} color="app.customBlack" boxSize={5} />
          <Box
            position="absolute"
            top="8px"
            right="11px"
            bg="#E30000"
            borderRadius="full"
            w="8px"
            h="8px"
            flexShrink={0}
          />
        </Box>
      </Flex>

      {/* User Details */}
      <Flex gap={4} align={"center"} gapX={7} cursor={"pointer"}>
        <VStack gap={"2px"}>
          <Text fontWeight={600} fontSize={"14px"} color="app.neutralGrey">
            Paul Cornelius
          </Text>
          <Text fontSize={"12px"} color="app.neutralSubtle">
            Paul@dstrct.com
          </Text>
        </VStack>

        <Icon as={PiCaretDownBold} color="#747C74" boxSize={4} />
      </Flex>
    </Box>
  );
};

export default TopNav;
