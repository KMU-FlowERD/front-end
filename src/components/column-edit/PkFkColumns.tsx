import { styles } from './PkFkColumns.styles';

import type { ERDColumn, ERDTable } from '@/features/erd-project';
import { useERDProjectStore } from '@/providers';
import { useDiagramContext } from '@/providers/DiagramChooseProvider';

interface PkFkColumnsProps {
  table: ERDTable;
  pkfkColumns: ERDColumn[];
}

export function PkFkColumns({ table, pkfkColumns }: PkFkColumnsProps) {
  const updateColumn = useERDProjectStore((state) => state.updateColumn);

  const { schema } = useDiagramContext();

  const enterNameEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    column: ERDColumn,
    name: string,
  ) => {
    if (schema === undefined) return;

    if (e.key === 'Enter') {
      updateColumn(schema.name, table, { ...column, name });
    }
  };

  const enterTypeEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    column: ERDColumn,
    type: string,
  ) => {
    if (schema === undefined) return;

    if (e.key === 'Enter') {
      updateColumn(schema.name, table, { ...column, type });
    }
  };

  const blurNameEdit = (column: ERDColumn, name: string) => {
    if (schema === undefined) return;

    updateColumn(schema.name, table, { ...column, name });
  };

  const blurTypeEdit = (column: ERDColumn, type: string) => {
    if (schema === undefined) return;

    updateColumn(schema.name, table, { ...column, type });
  };

  return pkfkColumns.map((column) => (
    <styles.columnRow key={column.id + column.constraintName}>
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
  ));
}
