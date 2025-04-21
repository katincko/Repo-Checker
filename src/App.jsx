//1ro importacao
//2do utilizacao

import Perfil from './components/Perfil';
import Formulario from './components/Formulario';
import './App.css';
import { useState } from 'react';
import ReposList from './components/ReposList';
function App() {
  const [formVisivel, setFormVisivel] = useState(false);
  
  const nome = "Joca";
  const idade = 20;

  function retornaNome() {
    return nome;
  }

  function retornaIdade() {
    return idade;
  }

  return (

    <div>
      
      <Perfil nome= "katincko" endereco= "https://media.licdn.com/dms/image/v2/D4D03AQHc8uOI60PZ2A/profile-displayphoto-shrink_200_200/B4DZOz5nBQG0AY-/0/1733890046143?e=1750896000&v=beta&t=geiyfm7lxnfB4aqBmfIl8wCLz5Q2gM-VbCXR23Gqg4k"/>
      <Formulario />
      <button onClick = {() => setFormVisivel(!formVisivel) }type='button'>toggle form</button>
      <ReposList nome= "katincko" />
      <h1>Olá, {retornaNome()}. Você tem {retornaIdade()} anos.</h1>
    </div>
  );
}

export default App;

