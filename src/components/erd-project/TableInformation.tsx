'use client';

import { styles } from './TableInformation.styles';
import { Expand } from '../expand/Expand';

import { useERDProjectStore } from '@/providers';

export function TableInformation() {
  const schemas = useERDProjectStore((state) => state.schemas);

  const createSchema = useERDProjectStore((state) => state.createSchema);

  const addSchemaClick = () => {
    createSchema({
      name: `schema${schemas.length + 1}`,
      tables: [],
      diagrams: [],
    });
  };

  return (
    <styles.container>
      <styles.buttonWrapper>
        <styles.addSchemaButton onClick={addSchemaClick}>
          +
        </styles.addSchemaButton>
      </styles.buttonWrapper>
      {schemas.map((schema) => (
        <Expand key={schema.name} text={schema.name} onClick={undefined}>
          {schema.tables.map((table) => table.title)}
          {schema.diagrams.map((diagram) => (
            <Expand key={diagram.name} text={diagram.name} onClick={() => {}}>
              {diagram.tables.map((table) => table.title)}
            </Expand>
          ))}
        </Expand>
      ))}
    </styles.container>
  );
}
