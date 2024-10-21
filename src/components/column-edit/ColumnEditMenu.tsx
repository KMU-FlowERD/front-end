'use client';

import styled from '@emotion/styled';
import { MutableRefObject } from 'react';

import { Columns } from './Columns';
import { FkColumns } from './FkColumns';
import { PkColumns } from './PkColumns';
import { PkFkColumns } from './PkFkColumns';

import { ERDColumn, ERDTable } from '@/features/erd-project';

export function ColumnEditMenu({
  editRef,
  table,
  tableColumns,
  updateColumn,
  deleteColumn,
  updateTable,
}: {
  editRef: MutableRefObject<HTMLDivElement | null>;
  table: ERDTable;
  tableColumns: ERDColumn[];
  updateColumn: (table: ERDTable, column: ERDColumn) => void;
  deleteColumn: (table: ERDTable, column: ERDColumn) => void;
  updateTable: (table: ERDTable) => void;
}) {
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
      <PkColumns
        table={table}
        pkColumns={pkColumns}
        updateColumn={updateColumn}
        deleteColumn={deleteColumn}
      />
      <PkFkColumns
        table={table}
        pkfkColumns={pkfkColumns}
        updateColumn={updateColumn}
      />
      {(pkColumns.length > 0 || pkfkColumns.length > 0) &&
        (fkColumns.length > 0 || columns.length > 0) && <styles.contour />}
      <Columns
        table={table}
        columns={columns}
        updateColumn={updateColumn}
        deleteColumn={deleteColumn}
      />
      <FkColumns
        table={table}
        fkColumns={fkColumns}
        updateColumn={updateColumn}
      />
    </styles.wrapper>
  );
}

const styles = {
  wrapper: styled.div`
    position: absolute;
    background-color: #333;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 16px;
    width: 400px;
    z-index: 1;
  `,

  title: styled.input`
    background: #444;
    border: none;
    padding: 8px;
    color: #ededed;
    width: 150px;
    margin-bottom: 8px;

    &::placeholder {
      color: #888;
    }
  `,

  input: styled.input`
    background: #444;
    border: none;
    padding: 8px;
    color: #ededed;
    margin-right: 8px;
    width: 150px;

    &::placeholder {
      color: #888;
    }
  `,

  contour: styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin-bottom: 8px;
  `,
};
