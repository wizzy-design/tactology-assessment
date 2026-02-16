import { Box, Grid, Text, HStack } from "@chakra-ui/react";
import { DEPARTMENTS, TIME_SLOTS } from "@/lib/constants";
import ScheduleCard from "./schedule-card";
import { MOCK_SCHEDULES } from "@/lib/mock-data";
import { Schedule } from "@/lib/types";

const ROW_HEIGHT = 120; // Represents 30 minutes
const START_HOUR = 8; // Roster starts at 08:00

const ScheduleGrid = () => {
  // Calculate top offset from 08:00
  const getTimeOffset = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = (hours - START_HOUR) * 60 + minutes;
    return (totalMinutes / 30) * ROW_HEIGHT;
  };

  // Calculate height based on duration
  const getScheduleHeight = (start: string, end: string) => {
    const [startH, startM] = start.split(":").map(Number);
    let [endH, endM] = end.split(":").map(Number);

    // If end is 00:00 (midnight), treat as 24:00
    if (endH === 0) endH = 24;

    const durationMinutes = endH * 60 + endM - (startH * 60 + startM);
    return (durationMinutes / 30) * ROW_HEIGHT;
  };

  const DEPARTMENTS_SCHEDULES = (dept: string) =>
    MOCK_SCHEDULES.filter(
      (s) => s.department === dept && s.date === "2025-09-08",
    );

  const renderSchedules = (dept: string) => {
    const deptSchedules = DEPARTMENTS_SCHEDULES(dept);
    const lanes: Schedule[][] = [];

    deptSchedules.forEach((s) => {
      let placed = false;
      for (let i = 0; i < lanes.length; i++) {
        const lastInLane = lanes[i][lanes[i].length - 1];
        if (s.startTime >= lastInLane.endTime) {
          lanes[i].push(s);
          placed = true;
          break;
        }
      }
      if (!placed) lanes.push([s]);
    });

    const hasOverflow = lanes.length > 2;
    const displayLanesCount = hasOverflow ? 3 : lanes.length;
    const elements = [];

    // Render columns 0 and 1
    lanes.slice(0, 2).forEach((lane, laneIndex) => {
      lane.forEach((schedule) => {
        const widthPercent = 100 / displayLanesCount;
        const leftPercent = laneIndex * widthPercent;

        elements.push(
          <Box
            key={schedule.id}
            position="absolute"
            top={`${getTimeOffset(schedule.startTime) + 1}px`}
            left={`${leftPercent}%`}
            width={`${widthPercent}%`}
            height={`${getScheduleHeight(schedule.startTime, schedule.endTime) - 1}px`}
            px="1px"
            pointerEvents="none"
          >
            <ScheduleCard
              schedule={schedule}
              variant="relative"
              isStacked={displayLanesCount > 1}
            />
          </Box>,
        );
      });
    });

    // Render "See all" for overflow (Lane 2)
    if (hasOverflow) {
      const overflowStart = lanes[2][0].startTime;
      const overflowEnd = lanes[2][0].endTime;
      const widthPercent = 100 / displayLanesCount;
      const leftPercent = 2 * widthPercent;

      elements.push(
        <Box
          key="see-all"
          position="absolute"
          top={`${getTimeOffset(overflowStart) + 1}px`}
          left={`${leftPercent}%`}
          width={`${widthPercent}%`}
          height={`${getScheduleHeight(overflowStart, overflowEnd) - 1}px`}
          px="1px"
        >
          <Box
            bg="app.neutralLight"
            h="full"
            borderRadius="8px"
            border="1px solid"
            borderColor="app.neutralOutline"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            _hover={{ bg: "gray.50" }}
          >
            <Text color="app.neutralGrey" fontSize="sm" fontWeight="semibold">
              See all
            </Text>
          </Box>
        </Box>,
      );
    }

    return elements;
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="app.neutralOutline"
      mx={"30px"}
      overflow="hidden"
    >
      {/* Header Row */}
      <Grid
        templateColumns={`120px repeat(${DEPARTMENTS.length}, 1fr)`}
        borderBottom="1px solid"
        borderTop="none"
        borderColor="brand.main"
        overflow="hidden"
      >
        <Box
          p="3"
          borderRight="1px solid"
          borderColor="app.neutralOutline"
          bg={"brand.secondaryLight"}
          textAlign={"center"}
          w="120px"
        >
          <Text fontSize="sm" fontWeight="medium" color="brand.secondary">
            Days
          </Text>
        </Box>

        {DEPARTMENTS.map((dept) => (
          <Box
            key={dept}
            p="3"
            textAlign="center"
            borderRight="1px solid"
            borderColor="app.neutralOutline"
            bg={"#F3F5F7"}
          >
            <Text fontSize="sm" fontWeight="medium" color="app.grey">
              {dept}
            </Text>
          </Box>
        ))}
      </Grid>

      {/* Grid Body */}
      <Box
        h="700px"
        overflowY="auto"
        position="relative"
        css={{
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-track": { bg: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            bg: "neutralLight",
            borderRadius: "full",
          },
        }}
      >
        {/* Background Grid Lines */}
        {TIME_SLOTS.map((time) => (
          <Grid
            key={time}
            templateColumns={`120px repeat(${DEPARTMENTS.length}, 1fr)`}
            height={`${ROW_HEIGHT}px`}
            borderBottom="1px solid"
            borderColor="brand.main"
          >
            {/* Time Column */}
            <Box
              px="4"
              py="2"
              borderRight="1px solid"
              borderColor="brand.main"
              display="flex"
              justifyContent="start"
              w="120px"
            >
              <Text fontSize="sm" fontWeight={"medium"} color="app.neutralGrey">
                {time}
              </Text>
            </Box>
            {DEPARTMENTS.map((dept) => (
              <Box
                key={`${dept}-${time}`}
                borderRight="1px solid"
                borderColor="brand.main"
                h="full"
              />
            ))}
          </Grid>
        ))}

        {/* Schedules Overlay */}
        <Box
          position="absolute"
          top={0}
          left="120px"
          right={0}
          bottom={0}
          pointerEvents="none"
        >
          <Grid templateColumns={`repeat(${DEPARTMENTS.length}, 1fr)`} h="full">
            {DEPARTMENTS.map((dept) => (
              <Box
                key={dept}
                position="relative"
                h="full"
                borderRight="1px solid"
                borderColor="transparent"
              >
                {renderSchedules(dept)}
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ScheduleGrid;
