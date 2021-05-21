import { Stack } from "@chakra-ui/layout";
import React from "react";
import { IBreadcrumbItem, Breadcrumbs } from "features";

interface NavigationLayoutProps {
  breadcrumbs: IBreadcrumbItem[];
}

export const NavigationLayout: React.FC<NavigationLayoutProps> = ({
  breadcrumbs,
}) => {
  return (
    <Stack
      width="100%"
      direction="row"
      justifyContent="flex-start"
      my={4}
      spacing={4}
      position="sticky"
      top={0}
      zIndex={101}
      backgroundColor="#fff"
      height={10}
      alignItems="center"
    >
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </Stack>
  );
};
