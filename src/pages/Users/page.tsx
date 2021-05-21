import { Flex, Stack, Wrap, WrapItem } from "@chakra-ui/layout";
import { SearchInput } from "entities/SearchInput";
import {
  DataTable,
  IBreadcrumbItem,
  LoaderLayout,
  NavigationLayout,
  ResponsiveAvatar,
  UserSmTableCard,
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
            <Wrap>
              <WrapItem>
                <ResponsiveAvatar
                  name={cell.row.original.first_name}
                  src={cell.row.original.avatar}
                />
              </WrapItem>
            </Wrap>
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

  useEffect(() => {
    return () => {
      dispatch(clearUsersSlice());
    };
  }, [dispatch]);

  return (
    <PageLayout>
      <NavigationLayout breadcrumbs={breadcrumbs} />
      <LoaderLayout isLoading={isLoading}>
        <ErrorLayout error={error?.message}>
          <ContentLayout>
            <Flex
              width="100%"
              backgroundColor="#fff"
              position="sticky"
              top={10}
              pt={2}
              zIndex={2}
            >
              <SearchInput
                onInputChange={handleSearchInputChange}
                placeholder="Enter for search user..."
              />
            </Flex>
          </ContentLayout>

          <ContentLayout>
            <Stack width="100%">
              <DataTable
                columns={columns}
                data={filterUsersBySubstring(data, filters)}
                SmRowCard={UserSmTableCard}
                onRowClick={(_, row) => history.push(`/users/${row.id}`)}
              />
            </Stack>
          </ContentLayout>
        </ErrorLayout>
      </LoaderLayout>
    </PageLayout>
  );
};
