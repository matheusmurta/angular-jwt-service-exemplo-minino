const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const secretKey = 'seu-segredo-aqui';
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true // Allow cookies to be sent with requests
  }));


// middleware para parsear o corpo das requisições
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// rota para gerar o token JWT
app.post('/login', (req, res) => {
  // Verifica se as credenciais do usuário estão corretas
  const { username, password } = req.body;
  if (username === 'usuário' && password === 'senha') {
    // Gera o token JWT com o payload contendo o nome de usuário
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Usuário ou senha incorretos' });
  }
});

// middleware para verificar a autenticação
function authenticate(req, res, next) {
  // Verifica se o token JWT foi passado no cabeçalho Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  // Verifica se o token JWT é válido
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    // Adiciona o payload decodificado do token à requisição para uso posterior
    req.user = decoded;
    next();
  });
}

// rota protegida que requer autenticação
app.get('/api/protegida', authenticate, (req, res) => {
  res.json({ message: `Olá, ${req.user.username}! Esta é uma rota protegida.`, data:[{id:123,name:"Contrato 1"}, {id:655,name:"Contrato 2"}]});
});

// rota pública que não requer autenticação
app.get('/api/publica', (req, res) => {
  res.json({ message: 'Olá, mundo! Esta é uma rota pública.' });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));
