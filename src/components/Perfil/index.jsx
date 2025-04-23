//import './perfil.css'
import styles from './perfil.module.css';
import { useState } from 'react';

const Perfil = ({ nome, setNome , setBuscarRepos}) => {
    //declara o estado do input, que é o valor que o usuario vai digitar.
    const [inputValue, setInputValue] = useState("")
    
    function handleClick(e){
        //faz com que o valor do input seja atribuido ao setNome
        setNome(inputValue);
        //esse carai aqui é pra evitar o refresh da pagina
        e.preventDefault();
        //faz com que a busca seja feita.
        setBuscarRepos(true);
    }
    

    return (
        <header className={styles.header}>
            {/* é foda, esse input muda o inputvalue e atribui o valor no inputvalue.*/}
            <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} id='user' type="text"  placeholder='Coloque seu usuario do GitHub aqui.'/>
            <button id='butones' onClick={handleClick} >ENVIAR</button>
            <img className={styles.avatar} src={`https://github.com/${nome}.png`} />
            <h3 className={styles.name}>{nome}</h3>
        </header>
    )
}

export default Perfil;