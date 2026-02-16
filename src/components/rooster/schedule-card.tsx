"use client";

import { Box, HStack, Text, Avatar } from "@chakra-ui/react";
import { Schedule } from "@/lib/types";

interface ScheduleCardProps {
  schedule: Schedule;
  top?: number;
  height?: number;
  variant?: "absolute" | "relative";
}

const ScheduleCard = ({
  schedule,
  top,
  height,
  variant = "absolute",
}: ScheduleCardProps) => {
  const getColors = (color: string) => {
    switch (color) {
      case "orange":
        return { bg: "#FDF5F0", border: "#E35F00" };
      case "green":
        return { bg: "#F1FBF4", border: "#19C34C" };
      case "amber":
        return { bg: "#F9F9F1", border: "#A19712" };
      default:
        return { bg: "white", border: color };
    }
  };

  const colors = getColors(schedule.color);

  const isAbsolute = variant === "absolute";

  return (
    <Box
      position={isAbsolute ? "absolute" : "relative"}
      top={isAbsolute ? `${top}px` : undefined}
      left={isAbsolute ? "4px" : undefined}
      right={isAbsolute ? "4px" : undefined}
      height={isAbsolute ? `${height}px` : "auto"}
      bg={colors.bg}
      border="1px solid"
      borderColor={colors.border}
      borderRadius="8px"
      p="2"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ transform: "scale(1.02)", zIndex: 1, shadow: "sm" }}
    >
      <HStack align="start" gap={2}>
        <Avatar.Root bg="white" width="28px" height="28px">
          <Avatar.Fallback
            fontSize="12px"
            color="app.neutralSubtle"
            fontWeight="semibold"
          >
            {schedule.userInitials}
          </Avatar.Fallback>
        </Avatar.Root>
        <Box overflow="hidden">
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color="app.customBlack"
            truncate
          >
            {schedule.title}
          </Text>
          <Text fontSize="xs" fontWeight="medium" color="app.neutralGrey">
            {schedule.startTime} - {schedule.endTime}
          </Text>
          <Text
            fontSize="xs"
            color={colors.border}
            fontWeight="medium"
            truncate
          >
            {schedule.userName}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default ScheduleCard;
