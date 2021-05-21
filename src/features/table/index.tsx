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
  SmRowCard,
  ...props
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Row<object>[]
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

  const renderSmRowCard = useCallback(
    (row: Row<typeof data[number]>) => {
      if (!SmRowCard) {
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

      const smRowCard = React.createElement(SmRowCard, {
        ...row.getRowProps(),
        row,
        onRowClick,
      });

      if (!React.isValidElement(smRowCard)) {
        return null;
      }

      return smRowCard;
    },
    [SmRowCard, onRowClick]
  );

  if (isSmBreakpoint || isXsBreakpoint) {
    return (
      <Stack spacing={4} my={2}>
        {page.map((row) => {
          prepareRow(row);

          return renderSmRowCard(row);
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
    <Flex flexDirection="column" position="relative">
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
