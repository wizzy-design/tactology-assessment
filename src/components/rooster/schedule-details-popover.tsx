"use client";

import {
  PopoverRoot,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverCloseTrigger,
  PopoverTrigger,
} from "../ui/popover";
import { Box, VStack, HStack, Text, Avatar, Icon } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import { Schedule } from "@/lib/types";
import { MOCK_SCHEDULES } from "@/lib/mock-data";
import { getScheduleColors } from "@/lib/utils";

interface ScheduleDetailsPopoverProps {
  children: React.ReactNode;
  date: string;
  department?: string;
  startTime?: string;
}

const ScheduleDetailsPopover = ({
  children,
  date,
  department,
  startTime,
}: ScheduleDetailsPopoverProps) => {
  // Filter schedules for this date and department
  const daySchedules = MOCK_SCHEDULES.filter(
    (s) =>
      s.date === date &&
      (department ? s.department === department : true) &&
      (startTime ? s.startTime === startTime : true),
  );

  // Group by start time
  const groupSchedulesByTime = () => {
    const groups: { [key: string]: Schedule[] } = {};
    daySchedules.forEach((s) => {
      if (!groups[s.startTime]) groups[s.startTime] = [];
      groups[s.startTime].push(s);
    });
    return groups;
  };

  const grouped = groupSchedulesByTime();
  const sortedTimes = Object.keys(grouped).sort();

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
  });

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        borderRadius="12px"
        shadow="0px 0px 16px 2px #4E5D6929"
        border="1px solid"
        borderColor="gray.100"
        bg="white"
        w="340px"
        zIndex="popover"
      >
        <PopoverHeader
          borderBottom="none"
          p="4"
          borderBottomColor={"app.neutralOutline"}
          borderBottomWidth={"0.8px"}
          borderBottomStyle={"solid"}
        >
          <HStack justify="space-between" align="center">
            <Text fontSize="18px" fontWeight="semibold" color="app.customBlack">
              {formattedDate}
            </Text>
            <PopoverCloseTrigger
              position="relative"
              top="0"
              right="0"
              bg="transparent"
              color="app.grey"
              _hover={{ color: "gray.600" }}
              cursor="pointer"
            >
              <Icon as={LuX} boxSize="20px" />
            </PopoverCloseTrigger>
          </HStack>
        </PopoverHeader>

        <PopoverBody
          p="4"
          maxH="400px"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-track": { bg: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              bg: "#D5DCE9",
              borderRadius: "full",
            },
          }}
        >
          <VStack align="stretch" gap="6">
            {sortedTimes.map((time) => (
              <VStack key={time} align="stretch" gap="3">
                <Text
                  fontSize="md"
                  fontWeight="semibold"
                  color="app.customBlack"
                >
                  {time}
                </Text>
                <VStack align="stretch" gap="2">
                  {grouped[time].map((schedule) => {
                    const colors = getScheduleColors(schedule.color);
                    return (
                      <Box
                        key={schedule.id}
                        p="3"
                        bg={colors.bg}
                        border="1px solid"
                        borderColor={colors.border}
                        borderRadius="12px"
                      >
                        <HStack gap="3" align="start">
                          <Avatar.Root
                            bg="white"
                            width="32px"
                            height="32px"
                            flexShrink={0}
                          >
                            <Avatar.Fallback
                              fontSize="xs"
                              color="app.neutralSubtle"
                              fontWeight="semibold"
                            >
                              {schedule.userInitials}
                            </Avatar.Fallback>
                          </Avatar.Root>
                          <Box flex="1">
                            <HStack
                              justify="start"
                              gap="6px"
                              alignItems="center"
                            >
                              <Text
                                fontSize="14px"
                                fontWeight="semibold"
                                color="app.customBlack"
                              >
                                {schedule.title}
                              </Text>
                              <Text
                                fontSize="12px"
                                color="app.neutralGrey"
                                whiteSpace="nowrap"
                                fontWeight="medium"
                              >
                                {schedule.startTime} - {schedule.endTime}
                              </Text>
                            </HStack>
                            <Text
                              fontSize="11px"
                              color={colors.border}
                              fontWeight="medium"
                              mt="0.5"
                            >
                              {schedule.userName}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                    );
                  })}
                </VStack>
              </VStack>
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default ScheduleDetailsPopover;
