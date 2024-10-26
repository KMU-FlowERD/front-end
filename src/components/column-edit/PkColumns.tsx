import { styles } from './PkColumns.styles';

import { ERDColumn, ERDTable } from '@/features/erd-project';
import { useERDProjectStore } from '@/providers';

interface PkColumnsProps {
  table: ERDTable;
  pkColumns: ERDColumn[];
}

export function PkColumns({ table, pkColumns }: PkColumnsProps) {
  const deleteColumn = useERDProjectStore((state) => state.deleteColumn);
  const updateColumn = useERDProjectStore((state) => state.updateColumn);

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
