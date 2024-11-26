import express from "express";
import { generateToken } from "../utils/jwtUtils.js"; // Função para gerar tokens JWT
import { authenticateToken } from "../middleware/jwtverification.js"; // Middleware para autenticação JWT
import { usersCollection } from "../services/FirebaseAcess.js"; // Conexão com a coleção de usuários no Firebase
import { where, query, getDocs } from "firebase/firestore"; // Funções do Firestore para consulta

const router = express.Router();

// Rota de login
router.post("/login", async (req, res) => {
  const { usuario, senha } = req.body; // Recebe os dados do corpo da requisição (usuário e senha)

  try {
    // Cria uma consulta no Firebase para buscar o usuário pelo nome de usuário fornecido
    const userQuerry = query(usersCollection, where("usuario", "==", usuario));
    const userSnap = await getDocs(userQuerry);

    if (userSnap.empty) {
      // Retorna erro 401 (não autorizado) se o usuário não for encontrado
      return res.status(401).json({ mensagem: "Usuário ou senha inválidos" });
    }

    let user = null;

    // Itera sobre os documentos retornados para verificar a senha
    userSnap.forEach((doc) => {
      const userdata = doc.data();
      if (userdata.senha == senha) {
        // Se a senha for válida, armazena os dados do usuário
        user = { id: doc.id, ...userdata };
      }
    });

    if (!user) {
      // Retorna erro 401 se a senha não corresponder
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    // Gera um token JWT com os dados do usuário
    const token = generateToken({ id: user.id, username: user.username });
    return res.json({ token }); // Retorna o token ao cliente
  } catch (erro) {
    // Captura e loga erros inesperados durante o processo de login
    console.error("Erro Durante o login:", erro);
    return res.status(500).json({ error: "Erro ao realizar o login", mensagem: erro.message });
  }
});

// Rota protegida
router.get("/protegido", authenticateToken, (req, res) => {
  // Apenas acessível para requisições com token válido
  return res.json({ message: "Access granted!", user: req.user }); // Retorna os dados do usuário autenticado
});

export default router;
