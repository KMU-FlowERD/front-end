import styled from '@emotion/styled';

import { ERDColumn, ERDTable } from '@/features/erd-project';

interface PkColumnsProps {
  table: ERDTable;
  pkColumns: ERDColumn[];
  updateColumn: (table: ERDTable, column: ERDColumn) => void;
  deleteColumn: (table: ERDTable, column: ERDColumn) => void;
}

export function PkColumns({
  table,
  pkColumns,
  updateColumn,
  deleteColumn,
}: PkColumnsProps) {
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

  const blurNameEdit = (column: ERDColumn, name: string) => {
    updateColumn(table, { ...column, name });
  };

  const blurTypeEdit = (column: ERDColumn, type: string) => {
    updateColumn(table, { ...column, type });
  };

  const deleteColumnClick = (column: ERDColumn) => {
    deleteColumn(table, column);
  };

  return pkColumns.map((column) => (
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
  ));
}

const styles = {
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
