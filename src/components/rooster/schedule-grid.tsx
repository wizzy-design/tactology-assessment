import { Box, Grid, HStack, Text } from "@chakra-ui/react";
import { DEPARTMENTS, TIME_SLOTS } from "@/lib/constants";
import ScheduleCard from "./schedule-card";
import { MOCK_SCHEDULES } from "@/lib/mock-data";
import { Schedule } from "@/lib/types";
import ScheduleDetailsPopover from "./schedule-details-popover";
import RoosterSidebar from "./rooster-sidebar";

const ROW_HEIGHT = 120; // Represents 30 minutes
const START_HOUR = 8; // Roster starts at 08:00

const ScheduleGrid = () => {
  const date = "2025-09-08";
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
    MOCK_SCHEDULES.filter((s) => s.department === dept && s.date === date);

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
    // Column width configuration
    const personWidth = hasOverflow ? 42 : 100 / Math.max(1, lanes.length);
    const overflowWidth = 16;
    const elements = [];

    // Render columns 0 and 1
    lanes.slice(0, 2).forEach((lane, laneIndex) => {
      lane.forEach((schedule) => {
        const leftPercent = laneIndex * personWidth;

        elements.push(
          <Box
            key={schedule.id}
            position="absolute"
            top={`${getTimeOffset(schedule.startTime) + 1}px`}
            left={`${leftPercent}%`}
            width={`${personWidth}%`}
            height={`${getScheduleHeight(schedule.startTime, schedule.endTime) - 1}px`}
            px="1px"
            pointerEvents="auto"
          >
            <ScheduleDetailsPopover
              date={date}
              department={dept}
              startTime={schedule.startTime}
            >
              <Box w="full" h="full">
                <ScheduleCard
                  schedule={schedule}
                  variant="relative"
                  isStacked={lanes.length > 1}
                />
              </Box>
            </ScheduleDetailsPopover>
          </Box>,
        );
      });
    });

    // Render overflow button (Lane 2)
    if (hasOverflow) {
      const overflowCount = lanes
        .slice(2)
        .reduce((acc, lane) => acc + lane.length, 0);
      const overflowStart = lanes[2][0].startTime;
      const overflowEnd = lanes[2][0].endTime;
      const leftPercent = 2 * personWidth;

      elements.push(
        <Box
          key="see-all"
          position="absolute"
          top={`${getTimeOffset(overflowStart) + 1}px`}
          left={`${leftPercent}%`}
          width={`${overflowWidth}%`}
          height={`${getScheduleHeight(overflowStart, overflowEnd) - 1}px`}
          px="1px"
          pointerEvents="auto"
        >
          <ScheduleDetailsPopover date={date} department={dept}>
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
              <Text color="app.neutralGrey" fontSize="xs" fontWeight="bold">
                +{overflowCount}
              </Text>
            </Box>
          </ScheduleDetailsPopover>
        </Box>,
      );
    }

    return elements;
  };

  return (
    <HStack align="stretch" gap="14px" flex="1" overflow="hidden" mx={"30px"}>
      <RoosterSidebar />
      <Box
        bg="white"
        borderRadius="xl"
        border="1px solid"
        borderColor="app.neutralOutline"
        overflowX="auto"
        overflowY="hidden"
      >
        {/* Header Row */}
        <Grid
          templateColumns={`120px repeat(${DEPARTMENTS.length}, minmax(240px, 1fr))`}
          borderBottom="1px solid"
          borderTop="none"
          borderColor="brand.main"
          w="fit-content"
          minW="full"
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
          w="fit-content"
          minW="full"
          css={{
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-track": { bg: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              bg: "#D5DCE9",
              borderRadius: "full",
            },
          }}
        >
          {/* Background Grid Lines */}
          {TIME_SLOTS.map((time) => (
            <Grid
              key={time}
              templateColumns={`120px repeat(${DEPARTMENTS.length}, minmax(240px, 1fr))`}
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
                <Text
                  fontSize="sm"
                  fontWeight={"medium"}
                  color="app.neutralGrey"
                >
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
            <Grid
              templateColumns={`repeat(${DEPARTMENTS.length}, minmax(240px, 1fr))`}
              h="full"
            >
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
    </HStack>
  );
};

export default ScheduleGrid;
