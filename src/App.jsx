import { setDoc } from 'firebase/firestore';
import {useState} from 'react'
import {db} from './firebaseConnection'
function App() {

      const[titulo, setTitulo] = useState('');
      const[autor, setAutor] = useState('');

      async function handleAdd() {
        await setDoc(doc(db, "posts", "12345"), {
          titulo: titulo,
          autor: autor,
        })
        .then(() => {
          console.log("Dados registrados no banco!")
        })
        .catch((error) => {
          console.log("Gerrou Erro" + error)
        })
      }
  return (
    <div className="container">
         <label> Titulo: </label>
         <textarea type="text" placeholder='Digite o titulo'
         value={titulo} onChange= {(e) => setTitulo(e.target.value)}>
         </textarea>
         <label> Autor: </label>
         <input type="text" 
         placeholder='Digite o autor do post'
         value={autor} onChange= {(e) => setAutor(e.target.value)}>
          </input>
         <button onClick={handleAdd}> Cadastrar </button>
    </div>
  );
  
}
export default App;
