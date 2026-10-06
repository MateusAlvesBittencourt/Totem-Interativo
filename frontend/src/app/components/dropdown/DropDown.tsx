import React, { useState } from "react";
import {
  DropDownContainer,
  DropDownHeader,
  DropDownList,
  DropDownItem,
  DropdownIcon,
} from "./DropDown.styles";

interface Item {
  id: number;
  nome: string;
}

interface DropDownProps {
  label: string;
  items: Item[];
  width?: number;
}

const DropDown: React.FC<DropDownProps> = ({ label, items, width }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Item | null>(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleItemClick = (item: Item) => {
    setSelected(item);
    setOpen(false);
  };

  return (
    <DropDownContainer width={width}>
      <DropDownHeader onClick={toggleDropdown}>
        <span>{selected ? selected.nome : label}</span>
        <DropdownIcon isOpen={open}>{open ? "▲" : "▼"}</DropdownIcon>
      </DropDownHeader>
      {open && (
        <DropDownList>
          {items.map((item) => (
            <DropDownItem key={item.id} onClick={() => handleItemClick(item)}>
              {item.nome}
            </DropDownItem>
          ))}
        </DropDownList>
      )}
    </DropDownContainer>
  );
};

export default DropDown;
