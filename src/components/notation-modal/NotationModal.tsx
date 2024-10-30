import { useState } from 'react';

import { styles } from './NotationModal.styles';

import { ERDRelation } from '@/features/erd-project';

export function NotationModal({ relations }: { relations: ERDRelation[] }) {
  return (
    <styles.container>
      if you change notation, set default
      {relations.map((relation) => (
        <styles.relationWrapper key={relation.id}>
          {`${relation.from.substring(0, 5)}_${relation.to.substring(0, 5)}`}:
          <TypeDropDown />
          <ParentMultiplicityDropDown />
        </styles.relationWrapper>
      ))}
    </styles.container>
  );
}

function TypeDropDown() {
  const [open, setOpen] = useState(false);

  return (
    <styles.dropdownWrapper onClick={() => setOpen(!open)}>
      <TypeMenu open={open} />
    </styles.dropdownWrapper>
  );
}

function TypeMenu({ open }: { open: boolean }) {
  if (open)
    return (
      <>
        <styles.dropdown>1:1</styles.dropdown>
        <styles.dropdown>1:M</styles.dropdown>
        <styles.dropdown>N:M</styles.dropdown>
      </>
    );

  return null;
}

function ParentMultiplicityDropDown() {
  const [open, setOpen] = useState(false);
  return (
    <styles.dropdownWrapper onClick={() => setOpen(!open)}>
      <ParentMultiplicityMenu open={open} />
    </styles.dropdownWrapper>
  );
}

function ParentMultiplicityMenu({ open }: { open: boolean }) {
  if (open)
    return (
      <>
        <styles.dropdown>전체참여</styles.dropdown>
        <styles.dropdown>부분참여</styles.dropdown>
      </>
    );

  return null;
}
