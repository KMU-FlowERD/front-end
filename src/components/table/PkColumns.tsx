import styled from '@emotion/styled';

import { ERDColumn } from '@/features/erd-project';

export function PkColumns({ pkColumns }: { pkColumns: ERDColumn[] }) {
  return pkColumns.map((column) => (
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

const styles = {
  columnWrapper: styled.div`
    display: flex;
    font-size: 12px;
    color: #ededed;
  `,

  columnName: styled.div`
    margin-left: 5px;
    margin-right: 10px;
  `,

  columnType: styled.div`
    margin-right: 10px;
  `,

  columnKeyType: styled.div`
    color: #ddff00;
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
  `,

  columnNullable: styled.div`
    color: #ff6200;
    margin-right: 10px;
  `,
};
