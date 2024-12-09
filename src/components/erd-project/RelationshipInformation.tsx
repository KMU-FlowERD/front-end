'use client';

import type { RefObject } from 'react';

import { styles } from './RelationshipInformation.styles';

import { useDrawToolsStore } from '@/features/draw-tools';
import { useInsideClick } from '@/features/erd-page/erd-page.table.hook';
import type { ERDRelation } from '@/features/erd-project';
import { useDiagramContext } from '@/providers/DiagramChooseProvider';
import { useERDProjectStore } from '@/providers/ERDProjectProvider';

export function RelationshipInformation({ relationshipRef }: { relationshipRef: RefObject<HTMLDivElement> }) {
  const notation = useDrawToolsStore((state) => state.notation);
  const setEntity = useDrawToolsStore((state) => state.setEntity);
  const setMapping = useDrawToolsStore((state) => state.setMapping);

  const createRelation = useERDProjectStore((state) => state.createRelation);
  const deleteRelation = useERDProjectStore((state) => state.deleteRelation);
  const updateRelation = useERDProjectStore((state) => state.updateRelation);

  const { schema, mapping } = useDiagramContext();

  useInsideClick(
    [relationshipRef],
    [],
    () => {
      setEntity('NONE');
      setMapping(undefined);
    },
    true,
  );

  const fromMultiplicity =
    mapping && mapping.participation && mapping.participation.from && mapping.participation.from === 'PARTIAL'
      ? 'FULL'
      : 'PARTIAL';

  const toMultiplicity =
    mapping && mapping.participation && mapping.participation.to && mapping.participation.to === 'PARTIAL'
      ? 'FULL'
      : 'PARTIAL';

  const handleMenuItemClick = (action: 'identify' | 'fromNullable' | 'toNullable' | 'cardinality') => {
    if (!mapping) return;

    if (schema === undefined) return;

    if (action === 'identify') {
      const updatedRelation: ERDRelation = {
        ...mapping,
        identify: !mapping.identify,
      };

      deleteRelation(schema.name, mapping);
      createRelation(schema.name, updatedRelation);
    } else if (action === 'fromNullable') {
      updateRelation(schema.name, {
        ...mapping,
        participation: { ...mapping.participation, from: fromMultiplicity },
      });
    } else if (action === 'toNullable') {
      updateRelation(schema.name, {
        ...mapping,
        participation: { ...mapping.participation, to: toMultiplicity },
      });
    } else if (action === 'cardinality') {
      if (mapping.cardinality === undefined) return;

      updateRelation(schema.name, {
        ...mapping,
        cardinality: {
          ...mapping.cardinality,
          to: mapping.cardinality.to === 'ONE' ? 'MANY' : 'ONE',
        },
      });
    }
  };

  if (mapping === undefined) return <styles.container ref={relationshipRef} />;

  return (
    <styles.container ref={relationshipRef}>
      연결 관계:{' '}
      {`${schema?.tables.find((t) => t.id === mapping.from)?.title} -> ${schema?.tables.find((t) => t.id === mapping.to)?.title}`}
      {notation === 'IE' && (
        <styles.identifyWrapper>
          <input
            type='checkbox'
            checked={mapping.cardinality && mapping.cardinality.to === 'ONE'}
            onChange={() => {
              if (mapping.cardinality && mapping.cardinality.to === 'ONE') return;

              handleMenuItemClick('cardinality');
            }}
          />
          1:1
          <input
            type='checkbox'
            style={{ marginLeft: '20px' }}
            checked={mapping.cardinality && mapping.cardinality.to === 'MANY'}
            onChange={() => {
              if (mapping.cardinality && mapping.cardinality.to === 'MANY') return;

              handleMenuItemClick('cardinality');
            }}
          />
          1:N
        </styles.identifyWrapper>
      )}
      {notation === 'IE' && (
        <styles.identifyWrapper>
          <input
            type='checkbox'
            defaultChecked={mapping.participation.from && mapping.participation.from === 'PARTIAL'}
            onChange={() => handleMenuItemClick('fromNullable')}
          />
          부모 null 허용
        </styles.identifyWrapper>
      )}
      {!mapping.identify && (
        <styles.identifyWrapper>
          <input
            type='checkbox'
            defaultChecked={mapping.participation.to === 'PARTIAL'}
            onChange={() => handleMenuItemClick('toNullable')}
          />
          자식 null 허용
        </styles.identifyWrapper>
      )}
      <styles.identifyWrapper>
        <input type='checkbox' defaultChecked={mapping.identify} onChange={() => handleMenuItemClick('identify')} />
        식별
      </styles.identifyWrapper>
    </styles.container>
  );
}
