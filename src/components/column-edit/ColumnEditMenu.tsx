'use client';

import { useState } from 'react';

import { styles } from './ColumnEditMenu.styles';
import { Columns } from './Columns';
import { FkColumns } from './FkColumns';
import { PkColumns } from './PkColumns';
import { PkFkColumns } from './PkFkColumns';

import type { ERDTable } from '@/features/erd-project';
import { useERDProjectStore } from '@/providers';
import { useDiagramContext } from '@/providers/DiagramChooseProvider';
import { useTableContext } from '@/providers/TableProvider';

export function ColumnEditMenu({ left, top }: { left: number; top: number }) {
  const { editRef, table, tableColumns, isEditingColumns } = useTableContext();

  const { schema, diagram } = useDiagramContext();

  const updateTable = useERDProjectStore((state) => state.updateTable);

  const [tableTitle, setTableTitle] = useState<string>(table.title);

  const pkColumns = tableColumns.filter((val) => val.keyType === 'PK');
  const pkfkColumns = tableColumns.filter((val) => val.keyType === 'PK/FK');
  const fkColumns = tableColumns.filter((val) => val.keyType === 'FK');
  const columns = tableColumns.filter((val) => val.keyType === undefined);

  const enterTitleEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    orginTable: ERDTable,
  ) => {
    if (schema === undefined || diagram === undefined) return;

    if (e.key === 'Enter') {
      if (diagram.tables.find((t) => t.title === tableTitle)) {
        setTableTitle(table.title);
        return;
      }

      updateTable(schema.name, { ...orginTable, title: tableTitle });
    }
  };

  const blurTitleEdit = (orginTable: ERDTable) => {
    if (schema === undefined || diagram === undefined) return;
    if (diagram.tables.find((t) => t.title === tableTitle)) {
      setTableTitle(table.title);
      return;
    }

    updateTable(schema.name, { ...orginTable, title: tableTitle });
  };

  if (!isEditingColumns) return null;

  return (
    <styles.wrapper ref={editRef} $left={left} $top={top}>
      <styles.title
        type='text'
        placeholder='table title'
        value={tableTitle}
        onChange={(e) => {
          setTableTitle(e.target.value);
        }}
        onBlur={() => blurTitleEdit(table)}
        onKeyDown={(e) => enterTitleEdit(e, table)}
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
