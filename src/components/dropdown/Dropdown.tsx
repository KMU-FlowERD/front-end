import React, { useState, useRef, useEffect } from 'react';

import { styles } from './Dropdown.styles';

interface DropdownProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export function Dropdown({ options, selected, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [watchSelect, setWatchSelect] = useState<string>(selected);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (option: string) => {
    onSelect(option);
    setWatchSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <styles.container ref={dropdownRef}>
      <styles.button onClick={handleToggle}>
        {watchSelect || 'Select an option'}
      </styles.button>
      {isOpen && (
        <styles.list>
          {options.map((option) => (
            <styles.item key={option} onClick={() => handleSelect(option)}>
              {option}
            </styles.item>
          ))}
        </styles.list>
      )}
    </styles.container>
  );
}
