import { Column, TableProps, TableRowProps } from "react-table";

export interface SmallTableRowProps<T extends any> extends TableRowProps {
  data: T;
  onRowClick?: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    data: T
  ) => void;
}

export interface DataTableProps<
  Columns extends Column<object>[],
  Data extends object[]
> extends TableProps {
  columns: Columns;
  data: Data;
  SmallRow?: React.FC<SmallTableRowProps<Data[number]>>;
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
