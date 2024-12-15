'use client';

import { useRef, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';

import { styles } from './TableInformation.styles';
import { Expand } from '../expand/Expand';

import { useDrawToolsStore } from '@/features/draw-tools';
import { useInsideClick } from '@/features/erd-page/erd-page.table.hook';
import type { ERDDiagram, ERDSchema } from '@/features/erd-project';
import { useERDProjectStore } from '@/providers';
import { useDiagramContext } from '@/providers/DiagramChooseProvider';

export function TableInformation({
  tableId,
  setHighlightTableId,
}: {
  tableId: string;
  setHighlightTableId: (id: string) => void;
}) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  const schemas = useERDProjectStore((state) => state.schemas);

  const createSchema = useERDProjectStore((state) => state.createSchema);
  const deleteSchema = useERDProjectStore((state) => state.deleteSchema);
  const changeSchemaName = useERDProjectStore((state) => state.changeSchemaName);

  const createDiagram = useERDProjectStore((state) => state.createDiagram);
  const deleteDiagram = useERDProjectStore((state) => state.deleteDiagram);
  const changeDiagramName = useERDProjectStore((state) => state.changeDiagramName);

  const setEntity = useDrawToolsStore((state) => state.setEntity);
  const setMapping = useDrawToolsStore((state) => state.setMapping);

  const [chooseEditDiagram, setChooseEditDiagram] = useState<string>('');
  const [changedDiagramName, setChangedDiagramName] = useState<string>('');

  const [chooseEditSchema, setChooseEditSchema] = useState<string>('');
  const [changedSchemaName, setChangedSchemaName] = useState<string>('');

  useInsideClick(
    [boxRef],
    [],
    () => {
      setEntity('NONE');
      setMapping(undefined);
    },
    true,
  );

  const { diagram: chooseDiagram, setDiagramName, setSchemaName } = useDiagramContext();

  const [chooseSchemaName, setChooseSchemaName] = useState<string | undefined>(undefined);

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

  const blurSchemaName = (schema: ERDSchema) => {
    changeSchemaName(schema, changedSchemaName);
    setChooseEditSchema('');
  };

  const enterSchemaName = (schema: ERDSchema, key: string) => {
    if (key === 'Enter') {
      changeSchemaName(schema, changedSchemaName);
      setChooseEditSchema('');
    }
  };

  const blurDiagramName = (schema: ERDSchema, diagram: ERDDiagram) => {
    changeDiagramName(schema.name, diagram, changedDiagramName);
    setChooseEditDiagram('');
  };

  const enterDiagramName = (schema: ERDSchema, diagram: ERDDiagram, key: string) => {
    if (key === 'Enter') {
      changeDiagramName(schema.name, diagram, changedDiagramName);
      setChooseEditDiagram('');
    }
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
          text={
            chooseEditSchema === schema.name ? (
              <styles.editInput
                type='text'
                onChange={(e) => {
                  setChangedSchemaName(e.target.value);
                }}
                defaultValue={schema.name}
                onKeyDown={(e) => enterSchemaName(schema, e.key)}
                onBlur={() => blurSchemaName(schema)}
              />
            ) : (
              <span
                onDoubleClick={() => {
                  setChangedSchemaName(schema.name);
                  setChooseEditSchema(schema.name);
                }}
              >
                {schema.name}
              </span>
            )
          }
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
              text={
                chooseEditDiagram === diagram.name ? (
                  <styles.editInput
                    type='text'
                    onChange={(e) => {
                      setChangedDiagramName(e.target.value);
                    }}
                    defaultValue={diagram.name}
                    onKeyDown={(e) => enterDiagramName(schema, diagram, e.key)}
                    onBlur={() => blurDiagramName(schema, diagram)}
                  />
                ) : (
                  <span
                    onDoubleClick={() => {
                      setChangedDiagramName(diagram.name);
                      setChooseEditDiagram(diagram.name);
                    }}
                  >
                    {diagram.name}
                  </span>
                )
              }
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
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    key={table.id + table.id}
                    onClick={() => {
                      setHighlightTableId(table.id);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {tableId === table.id ? <strong>{table.title}</strong> : table.title}
                  </div>
                ))}
              </styles.childMargin>
            </Expand>
          ))}
        </Expand>
      ))}
    </styles.container>
  );
}
