'use client';

import styled from '@emotion/styled';

import { ConnectLine } from './ConnectLine';
import { RelationshipMenu } from './RelationshipMenu';

import {
  MappingProvider,
  useMappingContext,
} from '@/providers/MappingProvider';

export function Relationship() {
  return (
    <MappingProvider>
      <RelationshipConsumer />
    </MappingProvider>
  );
}

function RelationshipConsumer() {
  const context = useMappingContext();

  return (
    <styles.display>
      <RelationshipMenu />
      <styles.wrapper
        width='100%'
        height='100%'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        {context.relationDuplicate.map((relation) => (
          <ConnectLine
            key={Math.random().toString(36).slice(2)}
            relation={relation}
          />
        ))}
      </styles.wrapper>
    </styles.display>
  );
}

const styles = {
  display: styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
  `,
  wrapper: styled.svg`
    width: 100%;
    height: 100%;
  `,
};
