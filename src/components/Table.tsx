'use client';

import styled from '@emotion/styled';

interface Position {
  x: number;
  y: number;
}

interface ColumnType {
  name: string;
  pk: boolean;
  fk: boolean;
  nullable: boolean;
}

export function Table({
  pos,
  name,
  mainColumn,
  childColumns,
}: {
  pos: Position;
  name: string;
  mainColumn: ColumnType;
  childColumns: Array<ColumnType>;
}) {
  return (
    <styles.displayWrapper draggable $name={name} $pos={pos}>
      <Column column={mainColumn} title />
      {childColumns.map((column) => (
        <Column key={column.name} column={column} title={false} />
      ))}
    </styles.displayWrapper>
  );
}

function Column({ column, title }: { column: ColumnType; title: boolean }) {
  const pk = (isIn: boolean) => {
    if (isIn) return <styles.pkStyle>pk</styles.pkStyle>;
    return <styles.pkStyle />;
  };

  const fk = (isIn: boolean) => {
    if (isIn) return <styles.fkStyle>fk</styles.fkStyle>;
    return <styles.fkStyle />;
  };

  const nullable = (isIn: boolean) => {
    if (isIn) return <styles.nullableStyle>nullable</styles.nullableStyle>;
    return <styles.nullableStyle />;
  };

  if (title) {
    return (
      <styles.mainColumnWrapper>
        {column.name}
        <styles.extraWrapper>
          {pk(column.pk)}
          {fk(column.fk)}
          {nullable(column.nullable)}
        </styles.extraWrapper>
      </styles.mainColumnWrapper>
    );
  }

  return (
    <styles.childColumnWrapper>
      {column.name}
      <styles.extraWrapper>
        {pk(column.pk)}
        {fk(column.fk)}
        {nullable(column.nullable)}
      </styles.extraWrapper>
    </styles.childColumnWrapper>
  );
}

const styles = {
  displayWrapper: styled.div<{ $name: string; $pos: Position }>`
    position: absolute;
    left: ${({ $pos }) => `${$pos.x}px`};
    top: ${({ $pos }) => `${$pos.y}px`};
    display: inline flex;
    border-radius: 16px;
    border: 0.5px solid #606060;
    background: rgba(34, 34, 34, 0.7);
    flex-direction: column;
    padding: 5px;
    font-size: 12px;
    color: #ededed;
    cursor: pointer;

    &::before {
      content: ${({ $name }) => `"${$name}"`};
      position: absolute;
      left: 3px;
      top: -20px;
    }

    &:hover {
      color: #fff;
    }
  `,
  mainColumnWrapper: styled.div`
    display: flex;
    border-bottom: 1px solid #ededed;
    padding-bottom: 4px;
    margin: 2px;
  `,
  childColumnWrapper: styled.div`
    display: flex;
    margin: 2px;
  `,
  extraWrapper: styled.div`
    display: flex;
    flex-grow: 1;
    align-items: right;
    margin-left: 40px;
  `,
  pkStyle: styled.div`
    width: 20px;
  `,
  fkStyle: styled.div`
    width: 20px;
  `,
  nullableStyle: styled.div`
    width: 60px;
  `,
};
