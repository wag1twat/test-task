import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbItemProps,
  BreadcrumbLink,
  BreadcrumbProps,
} from "@chakra-ui/breadcrumb";
import { Spinner } from "@chakra-ui/spinner";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export interface IBreadcrumbItem extends BreadcrumbItemProps {
  label?: string;
  url?: string;
  isLoading?: boolean;
}

interface BreadcrumbsProps extends BreadcrumbProps {
  breadcrumbs: IBreadcrumbItem[];
}

const StyledBreadcrumbItem = styled(BreadcrumbItem)<BreadcrumbItemProps>`
  ${({ isCurrentPage }) => {
    if (isCurrentPage) {
      return {
        fontWeight: "bold",
      };
    }
  }}
`;

export const Breadcrumbs: React.FC<BreadcrumbsProps> = React.memo(
  ({ breadcrumbs, ...props }) => {
    const renderBreadcrumbLink = useCallback(
      (isLoading: boolean, label?: string, url?: string) => {
        if (isLoading) {
          return <Spinner size="xs" />;
        }

        if (label && url) {
          return (
            <BreadcrumbLink as={Link} to={url}>
              {label}
            </BreadcrumbLink>
          );
        }

        return null;
      },
      []
    );

    return (
      <Breadcrumb {...props}>
        {breadcrumbs.map(({ label, url, isLoading, ...props }, i) => (
          <StyledBreadcrumbItem key={i} {...props}>
            {renderBreadcrumbLink(Boolean(isLoading), label, url)}
          </StyledBreadcrumbItem>
        ))}
      </Breadcrumb>
    );
  }
);
