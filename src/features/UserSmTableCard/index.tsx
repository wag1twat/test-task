import { Flex } from "@chakra-ui/layout";
import { SmRowCardProps } from "features/table/types";
import { UserCard } from "features/UserCard";
import { User } from "hooks/useUsers";
import React, { useCallback, useMemo } from "react";
import { Row } from "react-table";

interface UserSmTableCardProps extends SmRowCardProps<Row<User>> {}

export const UserSmTableCard: React.FC<UserSmTableCardProps> = ({
  row,
  onRowClick,
  ...props
}) => {
  const avatar = useMemo(
    () => row.cells.find((cell) => cell.column.id === "avatar"),
    [row.cells]
  );

  const first_name = useMemo(
    () => row.cells.find((cell) => cell.column.id === "first_name"),
    [row.cells]
  );

  const last_name = useMemo(
    () => row.cells.find((cell) => cell.column.id === "last_name"),
    [row.cells]
  );

  const email = useMemo(
    () => row.cells.find((cell) => cell.column.id === "email"),
    [row.cells]
  );

  const handleCardClick = useCallback(
    (rowData: typeof row.original) =>
      (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        if (typeof onRowClick === "function") {
          onRowClick(e, rowData);
        }
      },
    [onRowClick, row]
  );

  return (
    <Flex {...props} onClick={handleCardClick(row.original)}>
      <UserCard
        id={null}
        avatar={avatar?.render("Cell", { size: "lg" })}
        first_name={first_name?.render("Cell")}
        last_name={last_name?.render("Cell")}
        email={email?.render("Cell")}
      />
    </Flex>
  );
};
