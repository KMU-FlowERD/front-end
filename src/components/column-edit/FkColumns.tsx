import styled from '@emotion/styled';

import { ERDColumn, ERDTable } from '@/features/erd-project';

interface FkColumnsProps {
  table: ERDTable;
  fkColumns: ERDColumn[];
  updateColumn: (table: ERDTable, column: ERDColumn) => void;
}

export function FkColumns({ table, fkColumns, updateColumn }: FkColumnsProps) {
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

  const nullableClick = (column: ERDColumn) => {
    updateColumn(table, { ...column, nullable: !column.nullable });
  };

  return fkColumns.map((column) => (
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

  notNullText: styled.div`
    white-space: nowrap;
    margin-left: auto;
    color: #ededed;
    font-size: 14px;
    margin-right: 5px;
  `,
};
