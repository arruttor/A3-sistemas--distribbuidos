// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import firebaseConfig from "./FirebaseConfig.js"


// inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore e pega uma referencia para o serviço
const dbFirestore = getFirestore(app);

const alunosCollection = collection(dbFirestore,'alunos')
const usersCollection = collection(dbFirestore,'users');

export {alunosCollection, usersCollection, dbFirestore};

//export {dbFirestore}