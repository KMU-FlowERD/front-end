'use client';

import { useRef, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';

import { styles } from './TableInformation.styles';
import { Expand } from '../expand/Expand';

import { useDrawToolsStore } from '@/features/draw-tools';
import { useInsideClick } from '@/features/erd-page/erd-page.table.hook';
import { useERDProjectStore } from '@/providers';
import { useDiagramContext } from '@/providers/DiagramChooseProvider';

export function TableInformation() {
  const boxRef = useRef<HTMLDivElement | null>(null);

  const schemas = useERDProjectStore((state) => state.schemas);

  const createSchema = useERDProjectStore((state) => state.createSchema);
  const deleteSchema = useERDProjectStore((state) => state.deleteSchema);

  const createDiagram = useERDProjectStore((state) => state.createDiagram);
  const deleteDiagram = useERDProjectStore((state) => state.deleteDiagram);

  const setEntity = useDrawToolsStore((state) => state.setEntity);
  const setMapping = useDrawToolsStore((state) => state.setMapping);

  useInsideClick(
    [boxRef],
    [],
    () => {
      setEntity('NONE');
      setMapping(undefined);
    },
    true,
  );

  const {
    diagram: chooseDiagram,
    setDiagramName,
    setSchemaName,
  } = useDiagramContext();

  const [chooseSchemaName, setChooseSchemaName] = useState<string | undefined>(
    undefined,
  );

  const addSchemaClick = () => {
    const schemaName = `schema${schemas.length + 1}`;

    createSchema({
      name: schemaName,
      tables: [],
      diagrams: [],
    });

    setChooseSchemaName(schemaName);
  };

  const addDiagramClick = () => {
    if (chooseSchemaName === undefined) return;

    const schema = schemas.find((s) => s.name === chooseSchemaName);

    if (schema === undefined) return;

    const diagrmaName = `Diagram${schema.diagrams.length + 1}`;

    createDiagram(schema.name, {
      name: diagrmaName,
      tables: [],
      width: 0,
      height: 0,
    });

    setSchemaName(schema.name);
    setDiagramName(diagrmaName);
  };

  return (
    <styles.container ref={boxRef}>
      <styles.buttonWrapper>
        <styles.addSchemaButton onClick={addSchemaClick}>
          <IoMdAdd />
          스키마
        </styles.addSchemaButton>
        <styles.addDiagramButton onClick={addDiagramClick}>
          <IoMdAdd />
          다이어그램
        </styles.addDiagramButton>
      </styles.buttonWrapper>
      {schemas.map((schema) => (
        <Expand
          key={schema.name}
          text={schema.name}
          deleteIcon
          highlight={schema.name === chooseSchemaName}
          onClick={() => {
            setChooseSchemaName(schema.name);
          }}
          onDelete={() => {
            deleteSchema(schema.name);
          }}
        >
          <Expand
            key={schema.name + schema.name}
            text='Tables'
            deleteIcon={false}
            highlight={false}
            onClick={() => {}}
            onDelete={() => {}}
          >
            <styles.childMargin>
              {schema.tables.map((table) => (
                <div key={table.id}>{table.title}</div>
              ))}
            </styles.childMargin>
          </Expand>
          {schema.diagrams.map((diagram) => (
            <Expand
              key={diagram.name}
              text={diagram.name}
              deleteIcon
              highlight={diagram.name === chooseDiagram?.name}
              onClick={() => {
                setSchemaName(schema.name);
                setDiagramName(diagram.name);
              }}
              onDelete={() => {
                deleteDiagram(schema.name, diagram.name);
              }}
            >
              <styles.childMargin>
                {diagram.tables.map((table) => (
                  <div key={table.id + table.id}>{table.title}</div>
                ))}
              </styles.childMargin>
            </Expand>
          ))}
        </Expand>
      ))}
    </styles.container>
  );
}
