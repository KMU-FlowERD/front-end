'use client';

import styled from '@emotion/styled';
import { MutableRefObject } from 'react';

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
  const pkColumns = tableColumns.filter((val) => val.keyType === 'pk');
  const pfkColumns = tableColumns.filter((val) => val.keyType === 'pk/fk');
  const fkColumns = tableColumns.filter((val) => val.keyType === 'fk');
  const columns = tableColumns.filter((val) => val.keyType === undefined);

  const deleteColumnClick = (column: ERDColumn) => {
    deleteColumn(table, column);
  };

  const nullableClick = (column: ERDColumn) => {
    updateColumn(table, { ...column, nullable: !column.nullable });
  };

  const enterTitleEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    orginTable: ERDTable,
    title: string,
  ) => {
    if (e.key === 'Enter') {
      updateTable({ ...orginTable, title });
    }
  };

  const enterNameEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    column: ERDColumn,
    name: string,
  ) => {
    if (e.key === 'Enter') {
      updateColumn(table, { ...column, name });
    }
  };

  const enterTypeEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    column: ERDColumn,
    type: string,
  ) => {
    if (e.key === 'Enter') {
      updateColumn(table, { ...column, type });
    }
  };

  const blurTitleEdit = (orginTable: ERDTable, title: string) => {
    updateTable({ ...orginTable, title });
  };

  const blurNameEdit = (column: ERDColumn, name: string) => {
    updateColumn(table, { ...column, name });
  };

  const blurTypeEdit = (column: ERDColumn, type: string) => {
    updateColumn(table, { ...column, type });
  };

  return (
    <styles.wrapper ref={editRef}>
      <styles.input
        type='text'
        placeholder='table title'
        defaultValue={table.title}
        onBlur={(e) => blurTitleEdit(table, e.target.value)}
        onKeyDown={(e) => enterTitleEdit(e, table, e.currentTarget.value)}
      />
      {pkColumns.map((column) => (
        <styles.columnRow key={column.id}>
          <styles.input
            type='text'
            placeholder='<pk column name>'
            defaultValue={column.name}
            onBlur={(e) => blurNameEdit(column, e.target.value)}
            onKeyDown={(e) => enterNameEdit(e, column, e.currentTarget.value)}
          />
          <styles.input
            type='text'
            placeholder='<data type>'
            defaultValue={column.type}
            onBlur={(e) => blurTypeEdit(column, e.target.value)}
            onKeyDown={(e) => enterTypeEdit(e, column, e.currentTarget.value)}
          />
          <styles.deleteButton onClick={() => deleteColumnClick(column)}>
            🗑
          </styles.deleteButton>
        </styles.columnRow>
      ))}
      {pfkColumns.map((column) => (
        <styles.columnRow key={column.id}>
          <styles.input
            type='text'
            placeholder='<pk column name>'
            defaultValue={column.name}
            onBlur={(e) => blurNameEdit(column, e.target.value)}
            onKeyDown={(e) => enterNameEdit(e, column, e.currentTarget.value)}
          />
          <styles.input
            type='text'
            placeholder='<data type>'
            defaultValue={column.type}
            onBlur={(e) => blurTypeEdit(column, e.target.value)}
            onKeyDown={(e) => enterTypeEdit(e, column, e.currentTarget.value)}
          />
        </styles.columnRow>
      ))}
      {(pkColumns.length > 0 || pfkColumns.length > 0) &&
        (fkColumns.length > 0 || columns.length > 0) && <styles.contour />}
      {columns.map((column) => (
        <styles.columnRow key={column.id}>
          <styles.input
            type='text'
            placeholder='<pk column name>'
            defaultValue={column.name}
            onBlur={(e) => blurNameEdit(column, e.target.value)}
            onKeyDown={(e) => enterNameEdit(e, column, e.currentTarget.value)}
          />
          <styles.input
            type='text'
            placeholder='<data type>'
            defaultValue={column.type}
            onBlur={(e) => blurTypeEdit(column, e.target.value)}
            onKeyDown={(e) => enterTypeEdit(e, column, e.currentTarget.value)}
          />
          <styles.notNullText onClick={() => nullableClick(column)}>
            {column.nullable ? 'null' : 'not null'}
          </styles.notNullText>
          <styles.deleteButton onClick={() => deleteColumnClick(column)}>
            🗑
          </styles.deleteButton>
        </styles.columnRow>
      ))}
      {fkColumns.map((column) => (
        <styles.columnRow key={column.id}>
          <styles.input
            type='text'
            placeholder='<pk column name>'
            defaultValue={column.name}
            onBlur={(e) => blurNameEdit(column, e.target.value)}
            onKeyDown={(e) => enterNameEdit(e, column, e.currentTarget.value)}
          />
          <styles.input
            type='text'
            placeholder='<data type>'
            defaultValue={column.type}
            onBlur={(e) => blurTypeEdit(column, e.target.value)}
            onKeyDown={(e) => enterTypeEdit(e, column, e.currentTarget.value)}
          />
          <styles.notNullText onClick={() => nullableClick(column)}>
            {column.nullable ? 'null' : 'not null'}
          </styles.notNullText>
        </styles.columnRow>
      ))}
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

  columnRow: styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 8px;
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
  notNullText: styled.div`
    white-space: nowrap;
    margin-left: auto;
    color: #ededed;
    font-size: 14px;
    margin-right: 5px;
  `,
  contour: styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin-bottom: 8px;
  `,
  deleteButton: styled.button`
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
    background: none;
    border: none;
    color: #ededed;
    cursor: pointer;
    font-size: 18px;
    padding-right: 5px;
  `,
};
