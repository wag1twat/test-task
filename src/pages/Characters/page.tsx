import { Text } from "@chakra-ui/layout";
import { SearchInput } from "features/SearchInput";
import { DataTable, Avatar, IBreadcrumbItem } from "features";
import {
  ContentLayout,
  ErrorLayout,
  LoaderLayout,
  NavigationLayout,
  PageLayout,
} from "features/layouts";
import { Character, useCharacters } from "hooks/useCharacters";
import { useCallback, useMemo, useState } from "react";
import { Column } from "react-table";
import { useHistory } from "react-router";
import { SmCharacterTableCard } from "entities/SmCharacterTableCard";

export const CharactersPage: React.FC = () => {
  const history = useHistory();

  const [nameStartsWith, setNameStartsWith] = useState<string>("");

  const {
    data = { results: [] },
    isLoading,
    error,
  } = useCharacters({ nameStartsWith });

  const breadcrumbs = useMemo<IBreadcrumbItem[]>(() => {
    return [
      {
        label: "Home",
        url: "/",
      },
      { label: "Characters", url: "/characters" },
    ];
  }, []);

  const onSearchInputChange = useCallback(
    (value: string) => setNameStartsWith(value),
    []
  );

  const columns = useMemo<Column<Character>[]>(() => {
    return [
      {
        Header: "Avatar",
        accessor: "thumbnail",
        Cell: (cell) => {
          return (
            <Avatar
              name={cell.row.original.thumbnail.path}
              src={`${cell.row.original.thumbnail.path}.${cell.row.original.thumbnail.extension}`}
            />
          );
        },
      },
      { Header: "Name", accessor: "name" },
      {
        Header: "Description",
        accessor: "description",
        Cell: (cell) => {
          if (cell.row.original.description) {
            return <Text>{cell.row.original.description}</Text>;
          }

          return <Text>Description is missing</Text>;
        },
      },
    ];
  }, []);

  const forwardCharter = useCallback(
    (_: React.MouseEvent<HTMLTableRowElement, MouseEvent>, { id }: Character) =>
      history.push(`/characters/${id}`),
    [history]
  );

  return (
    <PageLayout>
      <NavigationLayout breadcrumbs={breadcrumbs}>
        <ContentLayout>
          <SearchInput
            onInputChange={onSearchInputChange}
            placeholder="Enter for search by name..."
          />
        </ContentLayout>
      </NavigationLayout>
      <LoaderLayout isLoading={isLoading}>
        <ErrorLayout error={error?.message}>
          <ContentLayout>
            <DataTable
              columns={columns}
              data={data?.results}
              onRowClick={forwardCharter}
              SmallRow={SmCharacterTableCard}
            />
          </ContentLayout>
        </ErrorLayout>
      </LoaderLayout>
    </PageLayout>
  );
};
