import { Flex } from "@chakra-ui/layout";
import React from "react";

export const StickyPagination: React.FC = ({ children }) => {
  return (
    <Flex position="sticky" bottom={0} pb={2} zIndex={1} backgroundColor="#fff">
      {children}
    </Flex>
  );
};
