"use client";

import { Box, HStack, VStack, Text, Avatar, Badge } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { User } from "@/lib/types";
import { getIndicatorColor } from "@/lib/utils";

interface DraggableUserCardProps {
  user: User;
  id: string;
}

interface UserCardProps {
  user: User;
  isDragging?: boolean;
}

export const UserCard = ({ user, isDragging }: UserCardProps) => {
  return (
    <Box
      p="10px"
      borderRadius="12px"
      border="1px solid"
      borderColor="app.neutralOutline"
      bg="white"
      transition="box-shadow 0.2s"
      opacity={isDragging ? 0.3 : 1}
      shadow={isDragging ? "lg" : "none"}
      cursor="grab"
      _active={{ cursor: "grabbing" }}
      _hover={{ shadow: "md" }}
      w="100%"
    >
      <HStack align="start" gap="10px">
        <Avatar.Root bg="#F3F5F7" width="40px" height="40px">
          <Avatar.Fallback fontSize="xs" fontWeight="600" color="#4E5D69">
            {user.initials}
          </Avatar.Fallback>
        </Avatar.Root>

        <VStack align="stretch" gap="1" flex="1">
          <HStack justify="space-between" align="start">
            <Text fontSize="14px" fontWeight="600" color="app.customBlack">
              {user.name}
            </Text>
            <Badge
              bg="#FEECEC"
              color="#EF2E2E"
              fontSize="10px"
              fontWeight="500"
              borderRadius="full"
              px="8px"
              h="18px"
              textTransform="none"
              display="flex"
              alignItems="center"
            >
              • On leave
            </Badge>
          </HStack>

          <HStack gap="4px" mt="6px">
            <Box bg="app.neutralLight" px="8px" py="4px" borderRadius="6px">
              <Text fontSize="10px" fontWeight="500" color="app.neutralGrey">
                {user.totalHours}
              </Text>
            </Box>
            <Box bg="app.neutralLight" px="8px" py="4px" borderRadius="6px">
              <Text fontSize="10px" fontWeight="500" color="app.neutralGrey">
                {user.weeklyHours}
              </Text>
            </Box>
          </HStack>

          <HStack justify="space-between" align="center" mt="8px">
            <Badge
              bg="#FEECEC"
              color="#EF2E2E"
              fontSize="10px"
              fontWeight="500"
              borderRadius="4px"
              px="6px"
              py="4px"
              textTransform="none"
            >
              {user.leaveRange}
            </Badge>

            <HStack gap="4px">
              {user.indicators.map((ind) => {
                const colors = getIndicatorColor(ind);
                return (
                  <Box
                    key={ind}
                    boxSize="18px"
                    bg={colors.bg}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="9px" fontWeight="500" color={colors.color}>
                      {ind}
                    </Text>
                  </Box>
                );
              })}
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

const DraggableUserCard = ({ user, id }: DraggableUserCardProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id,
    data: {
      user: user,
    },
  });

  return (
    <Box ref={setNodeRef} {...listeners} {...attributes}>
      <UserCard user={user} isDragging={isDragging} />
    </Box>
  );
};

export default DraggableUserCard;
