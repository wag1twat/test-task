import { Flex, FlexProps } from "@chakra-ui/layout";
import React from "react";

export const PageLayout: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      padding={[5, 5, 15, 20]}
      {...props}
    >
      {children}
    </Flex>
  );
};
