import { styles } from './NotationModal.styles';

import { Dropdown } from '@/components/dropdown';
import { useDrawToolsStore } from '@/features/draw-tools';
import { ERDRelation } from '@/features/erd-project';
import { useModalContext } from '@/features/modal';
import { useERDProjectStore } from '@/providers';

export function NotationModal({ relations }: { relations: ERDRelation[] }) {
  const updateRelation = useERDProjectStore((state) => state.updateRelation);

  const setNotation = useDrawToolsStore((state) => state.setNotation);

  const modalContext = useModalContext();

  const changeRelations = relations.slice();

  const changeClick = () => {
    changeRelations.forEach((relation) => {
      updateRelation(relation);
    });

    setNotation('IE');
    modalContext.closeModal();
  };

  return (
    <styles.container>
      <styles.middleText>Notation 변환 시 필수 데이터 추가</styles.middleText>
      {relations.map((relation, index) => (
        <styles.relationWrapper key={relation.id}>
          {`${relation.from.substring(0, 5)}_${relation.to.substring(0, 5)}`}:
          <Dropdown
            options={['1:1', '1:N']}
            selected={
              changeRelations[index].type === 'ONE-TO-ONE' ? '1:1' : '1:N'
            }
            onSelect={(option) => {
              changeRelations[index] = {
                ...changeRelations[index],
                type: option === '1:1' ? 'ONE-TO-ONE' : 'ONE-TO-MANY',
              };
            }}
          />
          <Dropdown
            options={['부분참여', '전체참여']}
            selected={
              changeRelations[index].multiplicity.from === 'OPTIONAL'
                ? '부분참여'
                : '전체참여'
            }
            onSelect={(option) => {
              changeRelations[index] = {
                ...changeRelations[index],
                multiplicity: {
                  from: option === '부분참여' ? 'OPTIONAL' : 'MANDATORY',
                  to: changeRelations[index].multiplicity.to,
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
