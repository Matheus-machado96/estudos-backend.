const express = require('express');
const app = express();
const porta = 3000;

// Nosso "Banco de Dados" temporário
let saldo = 1000.00;

// Rota para ver o saldo
app.get('/saldo', (req, res) => {
    res.send(`Seu saldo atual é: R$ ${saldo}`);
});

// Rota para depositar (Exemplo: localhost:3000/depositar?valor=100)
app.get('/depositar', (req, res) => {
    const valor = parseFloat(req.query.valor);
    
    if (!valor || valor <= 0) {
        return res.send("Erro: Informe um valor válido para depósito.");
    }

    saldo += valor;
    res.send(`Depósito de R$ ${valor} realizado! Novo saldo: R$ ${saldo}`);
});

// 4. Rota de Saque (Ex: /saque?valor=50)
app.get('/saque', (req, res) => {
    const valor = parseFloat(req.query.valor);
    if (!valor || valor <= 0) {
        return res.send("Erro: Digite um valor válido para saque.");
    }
    if (valor > saldo) {
        return res.send("Saldo insuficiente para esta operação!");
    }
    saldo -= valor;
    res.send(`Saque de R$ ${valor} realizado! Novo saldo: R$ ${saldo.toFixed(2)}`);
});

app.listen(porta, () => {
    console.log(`🚀 Servidor do Banco rodando em http://localhost:${porta}`);
    console.log(`Teste o saldo em: http://localhost:${porta}/saldo`);
});