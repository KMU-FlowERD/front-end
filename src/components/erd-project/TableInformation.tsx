'use client';

import { useState } from 'react';

import { styles } from './TableInformation.styles';
import { Expand } from '../expand/Expand';

import { useERDProjectStore } from '@/providers';
import { useDiagramContext } from '@/providers/DiagramChooseProvider';

export function TableInformation() {
  const schemas = useERDProjectStore((state) => state.schemas);

  const createSchema = useERDProjectStore((state) => state.createSchema);
  const createDiagram = useERDProjectStore((state) => state.createDiagram);

  const { setDiagramName, setSchemaName } = useDiagramContext();

  const [chooseSchemaName, setChooseSchemaName] = useState<string | undefined>(
    undefined,
  );

  const addSchemaClick = () => {
    createSchema({
      name: `schema${schemas.length + 1}`,
      tables: [],
      diagrams: [],
    });
  };

  const addDiagramClick = () => {
    if (chooseSchemaName === undefined) return;

    const schema = schemas.find((s) => s.name === chooseSchemaName);

    if (schema === undefined) return;

    createDiagram(schema.name, {
      name: `Diagram${schema.diagrams.length + 1}`,
      tables: [],
      width: 0,
      height: 0,
    });
  };

  return (
    <styles.container>
      <styles.buttonWrapper>
        <styles.addSchemaButton onClick={addSchemaClick}>
          +
        </styles.addSchemaButton>
        <styles.addDiagramButton onClick={addDiagramClick}>
          +
        </styles.addDiagramButton>
      </styles.buttonWrapper>
      {schemas.map((schema) => (
        <Expand
          key={schema.name}
          text={schema.name}
          onClick={() => {
            setChooseSchemaName(schema.name);
          }}
        >
          <Expand
            key={schema.name + schema.name}
            text='Tables'
            onClick={undefined}
          >
            {schema.tables.map((table) => (
              <div key={table.id}>{table.title}</div>
            ))}
          </Expand>
          {schema.diagrams.map((diagram) => (
            <Expand
              key={diagram.name}
              text={diagram.name}
              onClick={() => {
                setSchemaName(schema.name);
                setDiagramName(diagram.name);
              }}
            >
              {diagram.tables.map((table) => (
                <div key={table.id + table.id}>{table.title}</div>
              ))}
            </Expand>
          ))}
        </Expand>
      ))}
    </styles.container>
  );
}
