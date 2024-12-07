'use client';

import type { RefObject } from 'react';

import { ConnectLine } from './ConnectLine';
import { styles } from './Relationship.styles';
import { RelationshipMenu } from './RelationshipMenu';

import {
  MappingProvider,
  useMappingContext,
} from '@/providers/MappingProvider';

interface RelationProps {
  relationRef: RefObject<HTMLDivElement>;
}

export function Relationship({ relationRef }: RelationProps) {
  return (
    <MappingProvider>
      <RelationshipConsumer relationRef={relationRef} />
    </MappingProvider>
  );
}

function RelationshipConsumer({ relationRef }: RelationProps) {
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
            relationRef={relationRef}
          />
        ))}
      </styles.wrapper>
    </styles.display>
  );
}
