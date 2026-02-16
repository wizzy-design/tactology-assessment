import { Box, Grid, HStack, Text, Skeleton, VStack } from "@chakra-ui/react";
import { DEPARTMENTS, TIME_SLOTS } from "@/lib/constants";
import ScheduleCard from "./schedule-card";
import { MOCK_SCHEDULES } from "@/lib/mock-data";
import { Schedule, User } from "@/lib/types";
import ScheduleDetailsPopover from "./schedule-details-popover";
import RoosterSidebar from "./rooster-sidebar";
import { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import DroppableGridCell from "./droppable-grid-cell";
import { UserCard } from "./draggable-user-card";

const ROW_HEIGHT = 120;
const START_HOUR = 8;

const ScheduleGrid = ({ isLive }: { isLive: boolean }) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const date = isLive ? "2025-09-08" : "2025-09-09";

  useEffect(() => {
    const saved = localStorage.getItem("rooster_schedules");
    if (saved) {
      try {
        setSchedules(JSON.parse(saved));
      } catch (e) {
        setSchedules(MOCK_SCHEDULES);
      }
    } else {
      setSchedules(MOCK_SCHEDULES);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("rooster_schedules", JSON.stringify(schedules));
    }
  }, [schedules, isLoading]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const getTimeOffset = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = (hours - START_HOUR) * 60 + minutes;
    return (totalMinutes / 30) * ROW_HEIGHT;
  };

  const getScheduleHeight = (start: string, end: string) => {
    const [startH, startM] = start.split(":").map(Number);
    let [endH, endM] = end.split(":").map(Number);

    if (endH === 0) endH = 24;

    const durationMinutes = endH * 60 + endM - (startH * 60 + startM);
    return (durationMinutes / 30) * ROW_HEIGHT;
  };

  const DEPARTMENTS_SCHEDULES = (dept: string) =>
    schedules
      .filter((s) => s.department === dept && s.date === date)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current) {
      setActiveUser(active.data.current.user);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setActiveUser(null);

    if (over && active.data.current && over.data.current) {
      const user = active.data.current.user;
      const { dept, time } = over.data.current as {
        dept: string;
        time: string;
      };

      const [h, m] = time.split(":").map(Number);
      const endH = h + 1;
      const endHStr = endH.toString().padStart(2, "0");
      const endTime = `${endHStr}:${m.toString().padStart(2, "0")}`;

      const newSchedule: Schedule = {
        id: `s-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        userInitials: user.initials,
        title: `Shift for ${user.name}`,
        startTime: time,
        endTime: endTime,
        department: dept,
        date: date,
        color: "green",
      };

      setSchedules((prev) => [...prev, newSchedule]);
    }
  };

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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <HStack align="start" gap="14px" flex="1" overflow="hidden" mx={"30px"}>
        <RoosterSidebar />
        <Box
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="app.neutralOutline"
          overflowX="auto"
          overflowY="hidden"
          flex="1"
          position="relative"
        >
          {isLoading ? (
            <VStack p="8" gap="4" w="full" minH="500px">
              <Skeleton h="60px" w="full" borderRadius="xl" />
              <Skeleton h="400px" w="full" borderRadius="xl" />
            </VStack>
          ) : (
            <>
              {/* Header Row */}
              <Grid
                templateColumns={`120px repeat(${DEPARTMENTS.length}, minmax(240px, 1fr))`}
                borderBottom="1px solid"
                borderTop="none"
                borderColor="app.neutralOutline"
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
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color="brand.secondary"
                  >
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

              <Box
                overflowY="auto"
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
                <Box position="relative">
                  {TIME_SLOTS.map((time) => (
                    <Grid
                      key={time}
                      templateColumns={`120px repeat(${DEPARTMENTS.length}, minmax(240px, 1fr))`}
                      height={`${ROW_HEIGHT}px`}
                      borderBottom="1px solid"
                      borderColor="app.neutralOutline"
                    >
                      {/* Time Column */}
                      <Box
                        px="4"
                        py="2"
                        borderRight="1px solid"
                        borderColor="app.neutralOutline"
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
                        <DroppableGridCell
                          key={`${dept}-${time}`}
                          dept={dept}
                          time={time}
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
                    zIndex={10}
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
            </>
          )}
        </Box>
      </HStack>
      <DragOverlay dropAnimation={null} style={{ pointerEvents: "none" }}>
        {activeUser ? (
          <Box w="300px">
            <UserCard user={activeUser} />
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ScheduleGrid;
