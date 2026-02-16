"use client";

import { Box } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableGridCellProps {
  dept: string;
  time: string;
  children?: React.ReactNode;
}

const DroppableGridCell = ({
  dept,
  time,
  children,
}: DroppableGridCellProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `cell-${dept}-${time}`,
    data: {
      dept,
      time,
    },
  });

  return (
    <Box
      ref={setNodeRef}
      borderRight="1px solid"
      borderColor="app.neutralOutline"
      w="full"
      h="full"
      pointerEvents="auto"
      bg={isOver ? "blue.50" : "transparent"}
      transition="background-color 0.2s"
    >
      {children}
    </Box>
  );
};

export default DroppableGridCell;
