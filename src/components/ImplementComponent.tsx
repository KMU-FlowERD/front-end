'use client';

import styled from '@emotion/styled';

import { IconComponent, IconType } from './implements-icon';

export function ImplementComponent() {
  return (
    <styles.container>
      <IconComponent type={IconType.Pointer} />
      <IconComponent type={IconType.Arrow} />
      <div
        style={{
          width: '1px',
          height: '40px',
          background: '#444',
          marginRight: '7px',
        }}
      />
      <IconComponent type={IconType.Table} />
      <IconComponent type={IconType.Memo} />
      <div style={{ width: '1px', height: '40px', background: '#444' }} />
      <IconComponent type={IconType.IdentifyOneByOne} />
      <IconComponent type={IconType.IdentifyOneByMany} />
      <IconComponent type={IconType.IdentifyManyByMany} />
      <div style={{ width: '1px', height: '40px', background: '#444' }} />
      <IconComponent type={IconType.NonIdentifyOneByOne} />
      <IconComponent type={IconType.NonIdentifyOneByMany} />
      <IconComponent type={IconType.NonIdentifyManyByMany} />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    display: flex;
    height: 111px;
    padding: 16px;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex: 1 0 0;
    border-radius: 16px;
    border: 0.5px solid #606060;
    background: #222;
  `,
};
