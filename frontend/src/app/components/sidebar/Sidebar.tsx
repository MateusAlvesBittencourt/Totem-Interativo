import React from "react";
import { Header, Section, SectionHeader, SidebarContainer, Subtitle, Title } from "./Sidebar.style";
import DropDown from "../dropdown/DropDown";

const listaCategorias = [
  { id: 1, nome: 'Tintas' },
  { id: 2, nome: 'Construção' },
  { id: 3, nome: 'Madeiras' },
  { id: 4, nome: 'Portas' },
];

const listaExpositores = [
  { id: 1, nome: 'Expositor A' },
  { id: 2, nome: 'Expositor B' },
  { id: 3, nome: 'Expositor C' },
];

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Header>
        <Title>
          Olá <br />
          Visitante
        </Title>
        <Subtitle>Aproveite o evento!</Subtitle>
      </Header>
      <Section>
        <SectionHeader>
          <DropDown label="Categorias" items={listaCategorias} width={300} />
        </SectionHeader>
        <SectionHeader>
          <DropDown label="Expositores" items={listaExpositores} width={300} />
        </SectionHeader>
      </Section>
    </SidebarContainer>
  );
};

export default Sidebar;
