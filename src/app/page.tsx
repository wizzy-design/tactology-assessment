import { Box } from "@chakra-ui/react";
import TopNav from "@/components/layout/top-nav";
import Sidebar from "@/components/layout/sidebar";
import PlannerControls from "@/components/rooster/planner-controls";
import RoosterSidebar from "@/components/rooster/rooster-sidebar";
import { HStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box minH="100vh" bg="white">
      <Sidebar />

      <Box ml="260px">
        <TopNav />
        <HStack align="stretch" gap="0" flex="1" overflow="hidden">
          <Box flex="1" pb="10" overflowY="auto">
            <PlannerControls />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}
