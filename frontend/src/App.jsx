import React, { useState } from 'react';
import Menu from './Menu';
import Formulario from './pages/Formulario';
import Tutores from './pages/tutores';
import './App.css';


function App() {
    const [telaAtual, setTelaAtual] = useState('LISTA');
    const [tutorParaEditar, setTutorParaEditar] = useState(null);

    const handleNavigate = (tela) => {
        setTelaAtual(tela);
    };

    return (
        <div className="App">
            <header>
                <img src="/logo.png" alt="PetGood" />
                <Menu onNavigate={handleNavigate} />
            </header>

            <main>
                {telaAtual === 'LISTA' ? (
                    <Tutores onEditTutor={(tutor) => {
                        setTutorParaEditar(tutor);
                        setTelaAtual('FORM');
                    }} />
                ) : (
                    <Formulario tutorParaEditar={tutorParaEditar}
                        onCadastroSucesso={() => {
                            setTutorParaEditar(null);
                            setTelaAtual('LISTA');
                        }} />
                )}
            </main>
        </div>
    );

}
export default App;