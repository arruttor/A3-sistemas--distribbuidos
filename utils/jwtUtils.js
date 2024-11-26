import jwt from "jsonwebtoken";

// Define a chave secreta usada para assinar os tokens JWT
const SECRET_KEY = "Chavinha"; // Chave secreta (recomenda-se usar uma variável de ambiente para maior segurança)

// Define o tempo de expiração dos tokens
const EXPIRES_IN = "1h"; // O token será válido por 1 hora

// Função para gerar um token JWT
export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN }); 
  // `payload`: dados a serem incluídos no token
  // `SECRET_KEY`: chave para assinar o token
  // `expiresIn`: define o tempo de expiração do token
};

export { SECRET_KEY, EXPIRES_IN }; // Exporta a chave secreta e o tempo de expiração para uso em outros módulos
 