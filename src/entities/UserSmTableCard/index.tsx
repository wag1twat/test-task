import { Flex } from "@chakra-ui/layout";
import { SmallTableRowProps } from "features/table/types";
import { UserCard } from "entities/UserCard";
import { User } from "hooks/useUsers";
import React, { useCallback } from "react";

interface UserSmTableCardProps extends SmallTableRowProps<User> {}

export const UserSmTableCard: React.FC<UserSmTableCardProps> = ({
  data,
  onRowClick,
  ...props
}) => {
  const handleCardClick = useCallback(
    (rowData: typeof data) =>
      (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        if (typeof onRowClick === "function") {
          onRowClick(e, rowData);
        }
      },
    [onRowClick]
  );

  return (
    <Flex {...props} onClick={handleCardClick(data)}>
      <UserCard {...data} />
    </Flex>
  );
};
