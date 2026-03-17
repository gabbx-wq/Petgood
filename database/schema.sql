USE railway;

CREATE TABLE racas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo_pelo VARCHAR(50) NOT NULL,
    cuidados TEXT NOT NULL
);
    

CREATE TABLE tutores (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    nome_pet VARCHAR(100) NOT NULL,
    idade_pet INT NOT NULL,
    raca_id INT NOT NULL,
    observacao TEXT,
    FOREIGN KEY (raca_id) REFERENCES racas(id)
);

INSERT INTO racas (nome, tipo_pelo, cuidados) VALUES
('Labrador', 'Curto', 'Escovação semanal, banho a cada 15 dias. Raça ativa, necessita de exercícios regulares.'),
('Golden Retriever', 'Longo', 'Escovação diária para evitar nós. Banho a cada 10 dias. Atenção especial às orelhas.'),
('Poodle', 'Crespo', 'Tosa a cada 40 dias. Escovação frequente para evitar embaraçamento. Banho quinzenal.'),
('Bulldog Francês', 'Curto', 'Escovação semanal. Limpeza das dobras de pele com frequência para evitar irritações.'),
('Shih Tzu', 'Longo', 'Escovação diária obrigatória. Tosa regular. Atenção aos olhos e orelhas.'),
('Pastor Alemão', 'Médio', 'Escovação duas vezes por semana. Banho a cada 15 dias. Pelagem densa exige cuidado extra.');