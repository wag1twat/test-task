import { SearchInput } from "features/SearchInput";
import {
  DataTable,
  IBreadcrumbItem,
  LoaderLayout,
  NavigationLayout,
  Avatar,
  PageLayout,
  ErrorLayout,
  ContentLayout,
} from "features";
import { User, useUsers } from "hooks/useUsers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Column } from "react-table";
import { clearUsersSlice } from "./slice";
import { filterUsersBySubstring, UsersFilters } from "./utils";
import { UserSmTableCard } from "entities/UserSmTableCard";

export const UsersPage: React.FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [filters, setFilters] = useState<UsersFilters>({
    first_name: "",
    last_name: "",
    email: "",
  });

  const { data = [], isLoading, error } = useUsers();

  const handleSearchInputChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      first_name: value,
      last_name: value,
      email: value,
    }));
  }, []);

  const columns = useMemo<Column<User>[]>(() => {
    return [
      {
        Header: "avatar",
        accessor: "avatar",
        Cell: (cell) => {
          return (
            <Avatar
              name={cell.row.original.first_name}
              src={cell.row.original.avatar}
            />
          );
        },
      },
      { Header: "first name", accessor: "first_name" },
      { Header: "last name", accessor: "last_name" },
      { Header: "email", accessor: "email" },
    ];
  }, []);

  const breadcrumbs = useMemo<IBreadcrumbItem[]>(
    () => [
      { label: "Home", url: "/" },
      {
        label: "Users",
        url: "/users",
        isCurrentPage: true,
        isLoading,
      },
    ],
    [isLoading]
  );

  const forwardUser = useCallback(
    (_: React.MouseEvent<HTMLTableRowElement, MouseEvent>, user: User) => {
      history.push(`/users/${user.id}`);
    },
    [history]
  );

  useEffect(() => {
    return () => {
      dispatch(clearUsersSlice());
    };
  }, [dispatch]);

  return (
    <PageLayout>
      <NavigationLayout breadcrumbs={breadcrumbs}>
        <ContentLayout backgroundColor="#fff">
          <SearchInput
            onInputChange={handleSearchInputChange}
            placeholder="Enter for search user..."
          />
        </ContentLayout>
      </NavigationLayout>
      <LoaderLayout isLoading={isLoading}>
        <ErrorLayout error={error?.message}>
          <ContentLayout>
            <DataTable
              columns={columns}
              data={filterUsersBySubstring(data, filters)}
              SmallRow={UserSmTableCard}
              onRowClick={forwardUser}
            />
          </ContentLayout>
        </ErrorLayout>
      </LoaderLayout>
    </PageLayout>
  );
};
