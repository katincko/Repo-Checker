//import './perfil.css'
import styles from './Perfil.module.css';
import { useState } from 'react';

const Perfil = ({ nome, setNome , setBuscarRepos , setErro}) => {
    //declara o estado do input, que é o valor que o usuario vai digitar.
    const [inputValue, setInputValue] = useState("")
    
    function handleClick(e){
        //faz com que o valor do input seja atribuido ao setNome
        if (inputValue <= 0) {
            setErro("Digite um nome de usuário válido.");
            return;
        }
        else if (inputValue === nome) {
        
            return;

        }
        else{
            setNome(inputValue);
        }
        //esse carai aqui é pra evitar o refresh da pagina
        e.preventDefault();
        //faz com que a busca seja feita.
        setBuscarRepos(true);
    }
    

    return (
        <header className={styles.header}>
            <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                    {/* é foda, esse input muda o inputvalue e atribui o valor no inputvalue.*/}
                    <input className={styles.input} placeholder=''  onKeyDown={(e) => e.key === "Enter" && handleClick(e)} onChange={(e) => setInputValue(e.target.value)} value={inputValue} id='user' type="text" autoComplete='off'/>
                    <label htmlFor="user" className={styles.label}>
                            Coloque seu usuário do GitHub aqui.
                    </label>
                </div>
                
             <button className={styles.button} id='butones' onClick={handleClick} >ENVIAR</button>
                
            </div>

            <div className={styles.avatarContainer}>
                <a href = {`https://github.com/${nome}`}  target = "_blank"  > 
                    <img  className={styles.avatar} src={`https://github.com/${nome}.png`}  /> 
                </a>

                <h3 className={styles.name}>{nome}</h3>
            </div>
        </header>
    )
}

export default Perfil;