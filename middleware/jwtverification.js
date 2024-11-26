import jwt from "jsonwebtoken";
import { SECRET_KEY, EXPIRES_IN } from "../utils/jwtUtils.js";

export const authenticateToken = (req, res, next) => {
    // Extrai o token do cabeçalho 'Authorization' no formato 'Bearer <token>'
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        // Retorna erro 401 (não autorizado) se o token não for fornecido
        return res.status(401).json({ error: "Token not provided" });
    }

    console.log(token, SECRET_KEY); // Apenas para depuração (remover em produção)

    try {
        // Verifica e decodifica o token usando a SECRET_KEY
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Adiciona os dados do token decodificado ao objeto req
        next(); // Passa para o próximo middleware ou rota
    } catch (err) {
        // Retorna erro 403 (proibido) se o token for inválido ou expirado
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
