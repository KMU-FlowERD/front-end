'use client';

import styled from '@emotion/styled';
import { MutableRefObject } from 'react';

import { ERDColumn } from '@/features/erd-project';

export function ColumnEditMenu({
  ref,
  tableColumns,
}: {
  ref: MutableRefObject<HTMLDivElement | null>;
  tableColumns: ERDColumn[];
}) {
  const pkColumns = tableColumns.filter((val) => val.keyType === 'pk');
  const pfkColumns = tableColumns.filter((val) => val.keyType === 'pk/fk');
  const fkColumns = tableColumns.filter((val) => val.keyType === 'fk');
  const columns = tableColumns.filter((val) => val.keyType === undefined);

  return (
    <styles.wrapper ref={ref}>
      {pkColumns.map((column) => (
        <styles.columnRow key={column.id}>
          <styles.input
            type='text'
            placeholder='<pk column name>'
            value={column.name}
          />
          <styles.input
            type='text'
            placeholder='<data type>'
            value={column.type}
          />
        </styles.columnRow>
      ))}
      {pfkColumns.map((column) => (
        <styles.columnRow key={column.id}>
          <styles.input
            type='text'
            placeholder='<pk column name>'
            value={column.name}
          />
          <styles.input
            type='text'
            placeholder='<data type>'
            value={column.type}
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
            value={column.name}
          />
          <styles.input
            type='text'
            placeholder='<data type>'
            value={column.type}
          />
          <styles.notNullText>
            {column.nullable ? 'null' : 'not null'}
          </styles.notNullText>
        </styles.columnRow>
      ))}
      {fkColumns.map((column) => (
        <styles.columnRow key={column.id}>
          <styles.input
            type='text'
            placeholder='<pk column name>'
            value={column.name}
          />
          <styles.input
            type='text'
            placeholder='<data type>'
            value={column.type}
          />
          <styles.notNullText>
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
    color: #fff;
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
    color: #fff;
    margin-right: 8px;
    width: 150px;

    &::placeholder {
      color: #888;
    }
  `,

  notNullText: styled.div`
    margin-left: auto;
    color: #fff;
    font-size: 14px;
  `,
  contour: styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin-bottom: 8px;
  `,
};
