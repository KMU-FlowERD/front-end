'use client';

import { MutableRefObject } from 'react';

import { styles } from './ColumnEditMenu.styles';
import { Columns } from './Columns';
import { FkColumns } from './FkColumns';
import { PkColumns } from './PkColumns';
import { PkFkColumns } from './PkFkColumns';

import { ERDColumn, ERDTable } from '@/features/erd-project';
import { useERDProjectStore } from '@/providers';

export function ColumnEditMenu({
  editRef,
  table,
  tableColumns,
}: {
  editRef: MutableRefObject<HTMLDivElement | null>;
  table: ERDTable;
  tableColumns: ERDColumn[];
}) {
  const updateTable = useERDProjectStore((state) => state.updateTable);

  const pkColumns = tableColumns.filter((val) => val.keyType === 'PK');
  const pkfkColumns = tableColumns.filter((val) => val.keyType === 'PK/FK');
  const fkColumns = tableColumns.filter((val) => val.keyType === 'FK');
  const columns = tableColumns.filter((val) => val.keyType === undefined);

  const enterTitleEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    orginTable: ERDTable,
    title: string,
  ) => {
    if (e.key === 'Enter') {
      updateTable({ ...orginTable, title });
    }
  };

  const blurTitleEdit = (orginTable: ERDTable, title: string) => {
    updateTable({ ...orginTable, title });
  };

  return (
    <styles.wrapper ref={editRef}>
      <styles.title
        type='text'
        placeholder='table title'
        defaultValue={table.title}
        onBlur={(e) => blurTitleEdit(table, e.target.value)}
        onKeyDown={(e) => enterTitleEdit(e, table, e.currentTarget.value)}
      />
      <PkColumns table={table} pkColumns={pkColumns} />
      <PkFkColumns table={table} pkfkColumns={pkfkColumns} />
      {(pkColumns.length > 0 || pkfkColumns.length > 0) &&
        (fkColumns.length > 0 || columns.length > 0) && <styles.contour />}
      <Columns table={table} columns={columns} />
      <FkColumns table={table} fkColumns={fkColumns} />
    </styles.wrapper>
  );
}
