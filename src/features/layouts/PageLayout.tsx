import { Flex, FlexProps } from "@chakra-ui/layout";
import { IBreadcrumbItem } from "features/Breadcrumbs";
import React, { useMemo } from "react";
import HeaderLayout from "./HeaderLayout";

export const PageLayout: React.FC<FlexProps> = ({ children, ...props }) => {
  const breadcrumbs = useMemo<IBreadcrumbItem[]>(() => {
    return [
      { label: "Home", url: "/" },
      { label: "Users", url: "/users" },
      {
        label: "Characters",
        url: "/characters",
      },
    ];
  }, []);
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      padding={[5, 5, 15, 20]}
      {...props}
    >
      <HeaderLayout breadcrumbs={breadcrumbs} />
      {children}
    </Flex>
  );
};
