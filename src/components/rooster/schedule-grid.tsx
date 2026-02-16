import { Box, Grid, Text, HStack } from "@chakra-ui/react";
import { DEPARTMENTS, TIME_SLOTS } from "@/lib/constants";
import ScheduleCard from "./schedule-card";
import { MOCK_SCHEDULES } from "@/lib/mock-data";

const ScheduleGrid = () => {
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
        templateColumns={`100px repeat(${DEPARTMENTS.length}, 1fr)`}
        bg="gray.50"
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
            bg={"brand.main"}
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
        {TIME_SLOTS.map((time) => (
          <Grid
            key={time}
            templateColumns={`100px repeat(${DEPARTMENTS.length}, 1fr)`}
            borderBottom="1px solid"
            borderColor="gray.50"
          >
            {/* Time Column */}
            <Box p="2" borderRight="1px solid" borderColor="neutralOutline">
              <Text fontSize="xs" color="gray.500">
                {time}
              </Text>
            </Box>
            {DEPARTMENTS.map((dept, idx) => (
              <Box
                key={`${dept}-${time}`}
                borderRight="1px solid"
                borderColor="gray.100"
                h={`60px`}
                p="1"
              >
                {time === "08:00" && idx === 0 && (
                  <ScheduleCard
                    schedule={MOCK_SCHEDULES[0]}
                    variant="relative"
                  />
                )}
              </Box>
            ))}
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default ScheduleGrid;
