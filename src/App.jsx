import { async } from '@firebase/util';
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import {useState} from 'react'
import {db} from './firebaseConnection'
function App() {

      const[titulo, setTitulo] = useState('');
      const[autor, setAutor] = useState('');
      const [posts, setPosts] = useState([]);
      const [idPost, setIdPost] = useState('');
      async function handleAdd() {
        await addDoc(collection(db, "posts", "12345"), {
          titulo: titulo,
          autor: autor,
        })
        .then(() => {
          console.log("Dados gravados no banco!")
          setAutor('');
          setTitulo('');
        })
        .catch((error) => {
          console.log("Gerou Erro" + error)
        })
      }
      async function buscarPost() {
        const postsRef = collection(db, "posts")
        await getDocs(postsRef)
        .then((snapshat) => {
          let lista = [];
          snapshat.forEach((doc) => {
            lista.push({
              id: doc.id,
              titulo: doc.data().titulo,
              autor: doc.data().autor,
            })
          })
          setPosts(lista);
        })
        .catch((error) => {
          console.log("Deu algum Erro ao buscar")
        })
      }
      async function editarPost(){
        const docRef = doc(db, "posts", idPost)
        await updateDoc(docRef, {
          titulo: titulo,
          autor: autor
        })
        .then(() => {
          console.log("Atualizado com sucesso")
          setIdPost('')
          setTitulo('')
          setAutor('')
        })
        .catch(() => {
          console.log("Erro ao atualizar banco")
        })
      }
      async function excluirPost(id){
        const docRef = doc(db, 'posts', id)
        await deleteDoc(docRef)
        .then(()=>{
          alert("post deletado com sucesso")
        })
        .catch((error)=>{
          alert("Erro"+error)
        })
      }
  return (
    <div className="container">
          <label>IdPost</label>
          <input type="text"
          placeholder="informe o id"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}/> <br/>
         
         <label> Titulo: </label>
         <textarea type="text" placeholder='Digite o titulo'
         value={titulo} onChange= {(e) => setTitulo(e.target.value)}>
         </textarea>
         <label> Autor: </label>
         <input type="text" 
         placeholder='Digite o autor do post'
         value={autor} onChange= {(e) => setAutor(e.target.value)}>
          </input>
         
          <ul>
            {posts.map( (post) => {
              return(
                <li key={post.id}>
                  <strong>Id Post: {post.id}</strong> <br/>
                  <span>Titulo: {post.titulo}</span> <br/>
                  <span>Autor: {post.autor}</span> <br/>
                  <button onClick={()=>excluirPost(post.id)}> Excluir </button> <br/>
                </li>
              )
            })}
          </ul>
          <button onClick={handleAdd}> Cadastrar </button>
         <button onClick={buscarPost}> Buscar Post</button>
          <button onClick={editarPost}>Editar Post</button>
    </div>
  );
  
}
export default App;
