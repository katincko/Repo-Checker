//1ro importacao
//2do utilizacao

import Perfil from './components/Perfil';
import Formulario from './components/Formulario';
import './App.css';
import { useState } from 'react';
import ReposList from './components/ReposList';
import styles from './components/ReposList/ReposList.module.css';


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
      <Perfil nome= {nome}  setNome= {setNome} setBuscarRepos={setBuscarRepos} setErro={setErro} endereco= "https://media.licdn.com/dms/image/v2/D4D03AQHc8uOI60PZ2A/profile-displayphoto-shrink_200_200/B4DZOz5nBQG0AY-/0/1733890046143?e=1750896000&v=beta&t=geiyfm7lxnfB4aqBmfIl8wCLz5Q2gM-VbCXR23Gqg4k"/>
      <ReposList nome= {nome} erro={erro} setErro={setErro} buscarRepos={buscarRepos} setBuscarRepos={setBuscarRepos}/>
      
      
    </div>
  )
}

export default App;

