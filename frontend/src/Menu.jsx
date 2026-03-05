import React from 'react';
import './Menu.css'; // Criaremos este arquivo em breve

function Menu({ onNavigate }) {
  return (
    <nav className="menu-nav">
      <button onClick={() => onNavigate('LISTA')}>
        Listar
      </button>
      <button onClick={() => onNavigate('FORM')}>
        Cadastro
      </button>
    </nav>
  );
}

export default Menu;