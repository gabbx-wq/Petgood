require('dotenv').config();
const db = require("./bd.js");
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://petgood-gamma.vercel.app'
}));
app.use(express.json());

app.get('/racas', async (teq, res) => {
    try {
        const [result] = await db.query("SELECT id, nome, tipo_pelo, cuidados FROM racas");
        res.status(200).json(result);
    } catch (error){
        console.error("Erro ao buscar raças:", error);
        res.status(500).json({ error: "Erro ao buscar raças." });
    }
});

app.get('/tutores', async (req, res) => {
    try {
        const sql = `
            SELECT 
                t.id,
                t.nome,
                t.cpf,
                t.telefone,
                t.nome_pet,
                t.idade_pet,
                t.observacao,
                r.nome AS raca_nome,
                r.tipo_pelo,
                r.cuidados
            FROM tutores t
            JOIN racas r ON t.raca_id = r.id
            ORDER BY t.nome
        `;
        const [result] = await db.query(sql);
        res.status(200).json(result);
    } catch (error) {
        console.error("Erro ao buscar tutores:", error);
        res.status(500).json({ error: "Erro ao buscar tutores." });
    }
});

app.post('/tutores', async (req, res) => {
    const { nome, cpf, telefone, nome_pet, idade_pet, raca_id, observacao } = req.body;
    if (!nome || !cpf || !telefone || !nome_pet || !idade_pet || !raca_id) {
        return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    const sql = "INSERT INTO tutores (nome, cpf, telefone, nome_pet, idade_pet, raca_id, observacao) VALUES (?, ?, ?, ?, ?, ?, ?)";

    try{
        const [result] = await db.query(sql, [nome, cpf, telefone, nome_pet, idade_pet, raca_id, observacao]);
         return res.status(201).json({ message: "Tutor cadastrado com sucesso!", id: result.insertId });
    }  catch (error) {
        console.error("Erro ao cadastrar tutor:", error);
        return res.status(500).json({ error: "Erro ao cadastrar tutor.", details: error.message });
    }
});

app.put('/tutores/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, cpf, telefone, nome_pet, idade_pet, raca_id, observacao } = req.body;

    if (!nome || !cpf || !telefone || !nome_pet || !idade_pet || !raca_id) {
        return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    const sql = "UPDATE tutores SET nome = ?, cpf = ?, telefone = ?, nome_pet = ?, idade_pet = ?, raca_id = ?, observacao = ? WHERE id = ?";

    try {
        const [result] = await db.query(sql, [nome, cpf, telefone, nome_pet, idade_pet, raca_id, observacao, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Tutor não encontrado." });
        }
        return res.status(200).json({ message: "Tutor atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar tutor:", error);
        return res.status(500).json({ error: "Erro ao atualizar tutor.", details: error.message });
    }
});

app.delete('/tutores/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query("DELETE FROM tutores WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Tutor não encontrado." });
        }
        return res.status(200).json({ message: "Tutor excluído com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir tutor:", error);
        return res.status(500).json({ error: "Erro ao excluir tutor.", details: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
});