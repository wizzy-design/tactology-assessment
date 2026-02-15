import { Box } from "@chakra-ui/react";
import TopNav from "@/components/layout/top-nav";
import Sidebar from "@/components/layout/sidebar";
import PlannerControls from "@/components/rooster/planner-controls";

export default function Home() {
  return (
    <Box minH="100vh" bg="white">
      <Sidebar />

      <Box ml="260px">
        <TopNav />
        <PlannerControls />

        <Box p="6" as="section"></Box>
      </Box>
    </Box>
  );
}
