const express = require('express');
const app = express();
const porta = 3000;

// ESSA LINHA É OBRIGATÓRIA PARA O POST FUNCIONAR!
app.use(express.json());

let saldo = 1000.00;
let historico = [];

// 1. Rota de Teste Rápido (GET)
app.get('/', (req, res) => {
    res.send("Servidor do Matheus está ONLINE! 🚀");
});

// 2. Ver Saldo (GET)
app.get('/saldo', (req, res) => {
    console.log("--- Alguém consultou o saldo ---");
    res.send(`Seu saldo atual é: R$ ${saldo.toFixed(2)}`);
});

// 3. Ver Extrato (GET)
app.get('/extrato', (req, res) => {
    console.log("--- Gerando extrato ---");
    if (historico.length === 0) return res.send("Nenhuma movimentação ainda.");
    res.send(`<h2>Extrato Bancário</h2> ${historico.join('<br>')}`);
});

// 4. DEPOSITAR (POST) - A Skill de Junior!
app.post('/depositar', (req, res) => {
    console.log("--- TENTATIVA DE DEPÓSITO RECEBIDA ---");
    console.log("Conteúdo do Body:", req.body);

    const { valor } = req.body;

    // Validação de Segurança
    if (!valor || typeof valor !== 'number' || valor <= 0) {
        console.log("⚠️ Erro: Valor inválido enviado!");
        return res.status(400).json({ erro: "Envie um número positivo no campo 'valor'." });
    }

    saldo += valor;
    const log = `Depósito de R$ ${valor.toFixed(2)} em ${new Date().toLocaleString()}`;
    historico.push(log);

    console.log(`✅ Sucesso! Novo saldo: ${saldo}`);
    res.json({ 
        mensagem: "Depósito realizado com sucesso!", 
        valorDepositado: valor,
        saldoAtual: saldo 
    });
});

app.post('/sacar',(req,res)=>{
    const{ valor } = req.body;
    if(!valor || valor <= 0 || valor > saldo)
        return res.status(403).send('Erro: Saldo insuficiente!');
    
    saldo -= valor;
    historico.push(`R$ ${valor.toFixed(2)} em ${new Date().toLocaleString()}`);
    res.json({msg: "OK", saldo });
});

app.listen(porta, () => {
    console.log(`\n=========================================`);
    console.log(`🚀 BANCO RODANDO EM http://localhost:${porta}`);
    console.log(`=========================================\n`);
});