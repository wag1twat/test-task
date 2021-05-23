import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useBreakpoint,
  Flex,
  Stack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { useTable, useSortBy, usePagination, Row } from "react-table";
import { Pagination } from "./Pagination";
import { StickyPagination } from "./StickyPagination";
import { IDataTable } from "./types";

export const DataTable: IDataTable = ({
  columns,
  data,
  onRowClick,
  SmallRow,
  ...props
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, useSortBy, usePagination);

  useEffect(() => {
    setPageSize(5);
  }, [setPageSize]);

  const handleRowClick = useCallback(
    (rowData: typeof data[number]) =>
      (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        if (typeof onRowClick === "function") {
          onRowClick(e, rowData);
        }
      },
    [onRowClick]
  );

  const breakpoint = useBreakpoint();

  const isSmBreakpoint = breakpoint === "sm";

  const isXsBreakpoint = breakpoint === "xs";

  const renderSmallRow = useCallback(
    (row: Row<typeof data[number]>) => {
      if (!SmallRow) {
        return (
          <Stack {...row.getRowProps()} spacing={4}>
            {row.cells.map((cell) => {
              return (
                <Stack {...cell.getCellProps()} direction="row" spacing={4}>
                  <Flex>{cell.column.render("Header")}:</Flex>
                  <Flex>{cell.render("Cell")}</Flex>
                </Stack>
              );
            })}
          </Stack>
        );
      }

      const smallRow = React.createElement(SmallRow, {
        ...row.getRowProps(),
        data: row.original,
        onRowClick,
      });

      if (!React.isValidElement(smallRow)) {
        return null;
      }

      return smallRow;
    },
    [SmallRow, onRowClick]
  );

  if (isSmBreakpoint || isXsBreakpoint) {
    return (
      <Stack spacing={4} my={2} width="100%">
        {page.map((row) => {
          prepareRow(row);

          return renderSmallRow(row);
        })}
        <StickyPagination>
          <Pagination
            size={breakpoint}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageCount={pageCount}
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            pageSize={pageSize}
            gotoPage={gotoPage}
            nextPage={nextPage}
            previousPage={previousPage}
            setPageSize={setPageSize}
          />
        </StickyPagination>
      </Stack>
    );
  }

  return (
    <Flex width="100%" flexDirection="column" position="relative">
      <Table {...getTableProps()} {...props}>
        <Thead backgroundColor="#fff">
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  position="sticky"
                  top={0}
                  zIndex={1}
                >
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps({
                  style: {
                    cursor: "pointer",
                  },
                })}
                onClick={handleRowClick(row.original)}
              >
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <StickyPagination>
        <Pagination
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          pageSize={pageSize}
          gotoPage={gotoPage}
          nextPage={nextPage}
          previousPage={previousPage}
          setPageSize={setPageSize}
        />
      </StickyPagination>
    </Flex>
  );
};
