//1ro importacao
//2do utilizacao

import Perfil from './components/Perfil';
import './App.css';
import { useState } from 'react';
import ReposList from './components/ReposList';



function App() {
  //const [formVisivel, setFormVisivel] = useState(false);
  const [nome, setNome] = useState("");
  const [buscarRepos, setBuscarRepos] = useState(false);
  const [erro, setErro] = useState("");
 

  return (

    <div>
      {/*<h1 className={styles.listItemName}>Olá, {retornaNome()}. Você tem {retornaIdade()} anos.</h1>
      <Formulario />
      <button onClick = {() => setFormVisivel(!formVisivel) }type='button'>toggle form</button>*/}
      <Perfil nome= {nome}  setNome= {setNome} setBuscarRepos={setBuscarRepos} setErro={setErro}/>
      <ReposList nome= {nome} erro={erro} setErro={setErro} buscarRepos={buscarRepos} setBuscarRepos={setBuscarRepos}/>
      
      
    </div>
  )
}

export default App;

