import { styles } from './Columns.styles';

import type { ERDColumn } from '@/features/erd-project';

export function Columns({ columns }: { columns: ERDColumn[] }) {
  return columns.map((column) => (
    <styles.columnWrapper key={column.id}>
      <styles.columnName>{column.name}</styles.columnName>
      {column.type && <styles.columnType>{column.type}</styles.columnType>}
      {column.keyType && (
        <styles.columnKeyType>
          {column.keyType.toUpperCase()}
        </styles.columnKeyType>
      )}
      {column.nullable && <styles.columnNullable>NULL</styles.columnNullable>}
    </styles.columnWrapper>
  ));
}
