import express, { json } from 'express';
import { authenticateToken } from "../middleware/jwtverification.js"; // Middleware para validar token JWT
import alunosServices from '../services/AlunosServices.js'; // Serviços relacionados aos alunos
var router = express.Router();

// Rota GET para listar todos os alunos
router.get('/', authenticateToken, async function(req, res, next) {
  try {
    // Chama o serviço para buscar todos os alunos
    const alunos = await alunosServices.getAlunos();
    res.send(alunos); // Retorna a lista de alunos
  } catch (error) {
    console.error(error); // Loga o erro no console para depuração
    res.status(500).json({
      message: "Erro ao buscar alunos",
      errorCode: error.code || "UNKNOWN_ERROR", // Código de erro, se disponível
      errorMessage: error.message || "Ocorreu um erro desconhecido" // Mensagem de erro detalhada
    });
  }
});

// Rota GET para buscar aluno pelo RA (Registro Acadêmico)
router.get('/:ra', authenticateToken, async function(req, res, next) {
  // Chama o serviço e retorna o aluno correspondente ao RA fornecido
  res.send(await alunosServices.getAlunosByRA(req.params.ra));
});

// Rota POST para adicionar um novo aluno
router.post('/', authenticateToken, async function(req, res, next) {
  try {
    // Chama o serviço para adicionar um aluno e retorna o resultado no callback
    alunosServices.addAlunos(req.body, (ralunoretornado) => {
      res.status(201).send(ralunoretornado); // Retorna status 201 (Criado) com o aluno adicionado
    });
  } catch (error) {
    // Retorna erro 500 (Interno) se algo der errado
    res.status(500).send({
      message: "Erro ao cadastrar novo aluno",
      error: error.message
    });
  }
});

// Rota PUT para atualizar um aluno pelo RA
router.put('/:ra', authenticateToken, async function(req, res, next) {
  // Atualiza o aluno usando o RA e os dados enviados no corpo da requisição
  res.status(200).send(await alunosServices.attAlunoByRA(req.body, req.params.ra));
});

// Rota DELETE para excluir um aluno pelo RA
router.delete('/:ra', authenticateToken, async function(req, res) {
  try {
    // Chama o serviço para deletar o aluno correspondente ao RA fornecido
    await alunosServices.deleteAlunoByRA(req.params.ra);
    res.status(201).send({ mensagem: "Aluno deletado com sucesso" }); // Retorna status 201 (Criado) como confirmação
  } catch (error) {
    // Retorna erro 500 se a exclusão falhar
    res.status(500).send({
      mensagem: "Falha ao deletar aluno",
      erro: error.message
    });
  }
});

// Exporta o roteador configurado para uso externo
export default router;
