import React from "react";
import { NavigationLayoutProps } from "features";
import { Flex } from "@chakra-ui/layout";
import { Breadcrumbs } from "features/Breadcrumbs";

interface HeaderLayoutProps extends NavigationLayoutProps {}

export const HeaderLayout: React.FC<HeaderLayoutProps> = ({ breadcrumbs }) => {
  return (
    <Flex width="100%" justifyContent="flex-end">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </Flex>
  );
};

export default HeaderLayout;
