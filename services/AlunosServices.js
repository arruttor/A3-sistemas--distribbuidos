import { json } from "express";
import { alunosCollection } from "./FirebaseAcess.js"; // Referência à coleção de alunos no Firestore
import { setDoc, query, doc, deleteDoc, getDocs, getDoc } from "firebase/firestore";

const alunosServices = {
  // Retorna todos os alunos cadastrados
  getAlunos: async () => {
    const q = query(alunosCollection); // Cria uma consulta para obter todos os documentos na coleção
    const querySnapshot = await getDocs(q); // Executa a consulta no Firestore
    const alunos = [];
    querySnapshot.forEach((doc) => {
      alunos.push(doc.data()); // Adiciona cada aluno à lista
    });
    return alunos; // Retorna a lista de alunos
  },

  // Busca um aluno pelo RA (Registro Acadêmico)
  getAlunosByRA: async (ra) => {
    const ref = doc(alunosCollection, ra); // Cria uma referência ao documento pelo RA
    const aluno = await getDoc(ref); // Busca o documento no Firestore
    const vr = [];
    vr.push(aluno.data()); // Adiciona os dados do aluno ao array (formato esperado pela aplicação)
    return vr; // Retorna os dados do aluno
  },

  // Atualiza os dados de um aluno pelo RA
  attAlunoByRA: async (body, ra) => {
    const id = ra;
    const dadosAtualizados = body;
    delete dadosAtualizados.ra; // Remove o campo RA do corpo, pois o RA não deve ser atualizado

    try {
      const referencia = doc(alunosCollection, id); // Referência ao documento do aluno
      await setDoc(referencia, dadosAtualizados, { merge: true }); // Atualiza os dados, preservando os campos existentes
      return { mensagem: "Dados atualizados com sucesso" }; // Mensagem de sucesso
    } catch (error) {
      // Captura e retorna o erro no formato JSON
      return json({
        message: "Erro ao atualizar dados do aluno",
        errorCode: error.code,
        errorMessage: error.message,
      });
    }
  },

  // Adiciona um novo aluno à coleção
  addAlunos: (aluno, callback) => {
    const ref = doc(alunosCollection, "" + aluno.ra); // Cria um documento com o RA como ID
    setDoc(ref, aluno).then(() => {
      if (callback) {
        callback(aluno); // Executa o callback, se fornecido, com os dados do aluno
      }
    });
  },

  // Deleta um aluno pelo RA
  deleteAlunoByRA: (ra) => {
    const referencia = doc(alunosCollection, ra); // Referência ao documento do aluno
    deleteDoc(referencia); // Exclui o documento do Firestore
  },
};

export default alunosServices;
