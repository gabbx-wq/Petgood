import React, { useState, useEffect } from 'react';
import api from '../api/api';
import '../styles/lista.css';


function Tutores({ onEditTutor }) {

  const [tutores, setTutores] = useState([]);

  useEffect(() => {
    const buscarTutores = async () => {
      const response = await api.get('/tutores');
      setTutores(response.data)
    }
    buscarTutores();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir?')) return;

    try {
      await api.delete(`/tutores/${id}`);
      setTutores(tutores.filter(tutor => tutor.id !== id));
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  }


  return (
    <div className="lista-container">
        <h2>Lista de Tutores</h2>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Nome do Pet</th>
                    <th>Idade do Pet</th>
                    <th>Observação</th>
                    <th>Raça</th>
                    <th>Tipo de pelo</th>
                    <th>Cuidados</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {tutores.map(tutor => (
                    <tr key={tutor.id}>
                        <td>{tutor.nome}</td>
                        <td>{tutor.cpf}</td>
                        <td>{tutor.telefone}</td>
                        <td>{tutor.nome_pet}</td>
                        <td>{tutor.idade_pet}</td>
                        <td>{tutor.observacao}</td>
                        <td>{tutor.raca_nome}</td>
                        <td>{tutor.tipo_pelo}</td>
                        <td>{tutor.cuidados}</td>
                        <td>
                            <button className="btn-editar" onClick={() => onEditTutor(tutor)}>Editar</button>
                            <button className="btn-deletar" onClick={() => handleDelete(tutor.id)}>Deletar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}

export default Tutores;