import { Column, Row, TableProps, TableRowProps } from "react-table";

export interface SmRowCardProps<T extends Row<any>> extends TableRowProps {
  row: T;
  onRowClick?: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    rowData: T["original"]
  ) => void;
}

export interface DataTableProps<
  Columns extends Column<object>[],
  Data extends object[]
> extends TableProps {
  columns: Columns;
  data: Data;
  SmRowCard?: React.FC<SmRowCardProps<Row<Data[number]>>>;
  onRowClick?: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    rowData: Data[number]
  ) => void;
}

export interface IDataTable {
  <Columns extends Column<any>[], Data extends any[]>(
    props: DataTableProps<Columns, Data>
  ): JSX.Element;
}
