import { styles } from './NotationModal.styles';

import { Dropdown } from '@/components/dropdown';
import { useDrawToolsStore } from '@/features/draw-tools';
import type { ERDRelation } from '@/features/erd-project';
import { useModalContext } from '@/features/modal';
import { useERDProjectStore } from '@/providers';
import { useDiagramContext } from '@/providers/DiagramChooseProvider';

export function NotationModal({ relations }: { relations: ERDRelation[] }) {
  const updateRelation = useERDProjectStore((state) => state.updateRelation);

  const setNotation = useDrawToolsStore((state) => state.setNotation);

  const modalContext = useModalContext();

  const { schema } = useDiagramContext();

  const changeRelations = relations.map((relation) => {
    const changeRelation: ERDRelation = {
      ...relation,
      participation: { from: 'PARTIAL', to: relation.participation.to },
      cardinality: { from: 'ONE', to: 'MANY' },
    };
    return changeRelation;
  });

  const changeClick = () => {
    if (schema === undefined) return;

    changeRelations.forEach((relation) => {
      updateRelation(schema.name, relation);
    });

    setNotation('IE');
    modalContext.closeModal();
  };

  return (
    <styles.container>
      <styles.middleText>Notation 변환 시 필수 데이터 추가</styles.middleText>
      {relations.map((relation, index) => (
        <styles.relationWrapper key={relation.id}>
          {`${schema?.tables.find((t) => t.id === relation.from)?.title}->${schema?.tables.find((t) => t.id === relation.to)?.title}`}
          :
          <Dropdown
            options={['1:1', '1:N']}
            selected={changeRelations[index].cardinality?.to === 'ONE' ? '1:1' : '1:N'}
            onSelect={(option) => {
              changeRelations[index] = {
                ...changeRelations[index],
                cardinality: option === '1:1' ? { from: 'ONE', to: 'ONE' } : { from: 'ONE', to: 'MANY' },
              };
            }}
          />
          <Dropdown
            options={['부분참여', '전체참여']}
            selected={changeRelations[index].participation.from === 'PARTIAL' ? '부분참여' : '전체참여'}
            onSelect={(option) => {
              changeRelations[index] = {
                ...changeRelations[index],
                participation: {
                  from: option === '부분참여' ? 'PARTIAL' : 'FULL',
                  to: changeRelations[index].participation.to,
                },
              };
            }}
          />
        </styles.relationWrapper>
      ))}
      <styles.middleText>
        <styles.changeButton onClick={changeClick}>변환</styles.changeButton>
      </styles.middleText>
    </styles.container>
  );
}
