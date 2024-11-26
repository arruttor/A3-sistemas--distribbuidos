import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import alunosRouter from './routes/alunos.js';

// Workaround para obter __dirname, necessário em módulos ES
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Habilita CORS para permitir comunicações entre origens diferentes (ex.: front-end e back-end)
app.use(cors());

// Configura middlewares essenciais para o servidor
app.use(logger('dev')); // Logging detalhado de requisições no terminal
app.use(express.json()); // Parse de JSON no corpo das requisições
app.use(express.urlencoded({ extended: false })); // Suporte a dados URL-encoded
app.use(cookieParser()); // Manipulação de cookies
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos (HTML, CSS, JS)


// Configuração de rotas principais
app.use('/', indexRouter); // Rota principal
app.use('/users', usersRouter); // Rota para operações relacionadas a usuários
app.use('/alunos', alunosRouter); // Rota para operações relacionadas a alunos

// Exporta a aplicação configurada para uso externo
export default app;
