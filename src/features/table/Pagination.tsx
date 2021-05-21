import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  Box,
  Select,
  ThemingProps,
} from "@chakra-ui/react";
import React from "react";

interface PaginationProps {
  size?: ThemingProps<"Button">["size"];
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
  pageOptions: number[];
  pageSize: number;
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (pageSize: number) => void;
}

export const Pagination: React.FC<PaginationProps> = React.memo(
  ({
    size,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageIndex,
    pageOptions,
    pageSize,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  }) => {
    return (
      <Stack
        width="100%"
        my={4}
        spacing={4}
        direction={["column", "column", "column", "column", "row", "row"]}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack spacing={4} direction="row" alignItems="center">
          <Button
            size={size}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </Button>
          <Button
            size={size}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </Button>
          <Button
            size={size}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {">"}
          </Button>
          <Button
            size={size}
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>
          <Box>
            <Text>{`Page ${pageIndex + 1} of ${pageOptions.length}`}</Text>
          </Box>
        </Stack>
        <Stack spacing={4} direction="row" alignItems="center">
          <InputGroup size={size}>
            <InputLeftAddon children="Go to page:" />
            <Input
              size={size}
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </InputGroup>
          <Select
            size={size}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Stack>
      </Stack>
    );
  }
);
