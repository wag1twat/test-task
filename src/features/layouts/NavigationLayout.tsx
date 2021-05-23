import { Stack, StackProps } from "@chakra-ui/layout";
import React from "react";
import { IBreadcrumbItem, Breadcrumbs } from "features";

export interface NavigationLayoutProps extends StackProps {
  breadcrumbs: IBreadcrumbItem[];
}

export const NavigationLayout: React.FC<NavigationLayoutProps> = ({
  breadcrumbs,
  children,
  ...props
}) => {
  return (
    <Stack
      width="100%"
      justifyContent="flex-start"
      my={[1, 1, 2, 4]}
      spacing={0}
      position="sticky"
      top={0}
      zIndex={101}
      backgroundColor="#fff"
      alignItems="center"
      {...props}
    >
      <Breadcrumbs
        py={2}
        justifyContent="flex-start"
        width="100%"
        breadcrumbs={breadcrumbs}
      />
      {children}
    </Stack>
  );
};
