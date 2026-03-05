import React, { useState, useEffect } from 'react';
import api from '../api/api';
import '../styles/Formulario.css';

function Formulario({ onCadastroSucesso, tutorParaEditar }) {
    const [tutor, setTutor] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        nome_pet: '',
        idade_pet: '',
        raca_id: 0,
        observacao: ''
    });

    const [racas, setRacas] = useState([])

    useEffect(() => {
        const buscarRacas = async () => {
            const response = await api.get('/racas');
            setRacas(response.data);
        }
        buscarRacas();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTutor(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (tutorParaEditar) {
                await api.put(`/tutores/${tutorParaEditar.id}`, tutor);
            } else {
                await api.post('/tutores', tutor);
            }
            setTutor({
                nome: '',
                cpf: '',
                telefone: '',
                nome_pet: '',
                idade_pet: '',
                raca_id: 0,
                observacao: ''
            });
            alert('Tutor cadastrado com sucesso!');
            onCadastroSucesso();
        } catch (error) {
            alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
            console.error(error);
        }
    }

    useEffect(() => {
        if (tutorParaEditar) {
            setTutor({
                nome: tutorParaEditar.nome,
                cpf: tutorParaEditar.cpf,
                telefone: tutorParaEditar.telefone,
                nome_pet: tutorParaEditar.nome_pet,
                idade_pet: Number(tutorParaEditar.idade_pet),
                raca_id: Number(tutorParaEditar.raca_id),
                observacao: tutorParaEditar.observacao
            });
        }
    }, [tutorParaEditar]);


    return (
        <form onSubmit={handleSubmit}>
            <div className="cards-container">

                <div className="form-card">
                    <h2>Tutor</h2>
                    <div className="form-group">
                        <label>Nome do Tutor</label>
                        <input type="text" name="nome" value={tutor.nome} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <input type="text" name="cpf" value={tutor.cpf} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Telefone</label>
                        <input type="text" name="telefone" value={tutor.telefone} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-card">
                    <h2>Pet</h2>
                    <div className="form-group">
                        <label>Nome do Pet</label>
                        <input type="text" name="nome_pet" value={tutor.nome_pet} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Idade do Pet</label>
                        <input type="number" name="idade_pet" value={tutor.idade_pet} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Raça</label>
                        <select name="raca_id" value={tutor.raca_id} onChange={handleChange} required>
                            <option value={0}>-- Selecione uma Raça --</option>
                            {racas.map(raca => (
                                <option key={raca.id} value={raca.id}>
                                    {raca.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>

            <div className="observacao-wrapper">
                <img src="/colar.png" alt="coleira" className="img-coleira" />
                <div className="form-card observacao-card">
                    <label>Observação</label>
                    <textarea name="observacao" value={tutor.observacao} onChange={handleChange} rows={3} />
                </div>
            </div>

            <button type="submit" className="btn-cadastrar">CADASTRAR</button>
        </form>
    )
}


export default Formulario;