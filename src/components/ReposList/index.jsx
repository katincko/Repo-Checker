import { useEffect , useState } from "react";
import styles from './ReposList.module.css';


const ReposList = ({nome , buscarRepos , setBuscarRepos}) => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    console.log(nome);


    useEffect(() => {
        if (buscarRepos && nome !== "") {
            setLoading(true);
            setRepos([]);
            setErro("");
            fetch(`https://api.github.com/users/${nome}/repos`)
            .then(response => {
                console.log("Resposta da API:", response); 

                if (!response.ok) {

                    if (response.status === 403) {
                        setErro("Usuário atingiu o limite de requisições. Tente novamente mais tarde.");
                    } 
                    
                    else if (response.status === 404) {
                        setErro("Usuário não encontrado.");
                    } 
                    
                    else {
                        setErro(`Erro inesperado: ${response.status}`);
                    }

                    throw new Error(`Erro na API: ${response.status}`);
                }

                return response.json();
            }
            )                                                                                                                                                                                                                                              
            .then(resJson => {
                setTimeout(() => {
                    // Simulando um atraso de 3 segundos
                    // para demonstrar o uso do setTimeout
                    setRepos(resJson);
                    setLoading(false);
                    setBuscarRepos(false);
                    
            },1000);
            })
            .catch((error) => {
                setLoading(false);
                setBuscarRepos(false);
                
                // Mensagem de erro já foi definida no `then`, mas pode ser ajustada aqui se necessário
                if (!erro) {
                    setErro("Erro desconhecido. Tente novamente.");}
            });
                
        }
        
    }, [nome, buscarRepos , setBuscarRepos]);
    return (
        <>
            {loading && (
                <h1 className={styles.loading} >Carregando...</h1>
                )}
            {erro &&  <h1 className={styles.erro}>{erro}</h1>}
            <ul className={styles.list}>
                {repos.map((repo) => (
                    <li className={styles.listItem} key={repo.id}>
                        
                        <div className={styles.listItemName}>
                            <b>Nome:</b> {repo.name}   <br/>
                    
                    </div>
                        <div className={styles.listItemLanguage}>
                            <b>linguagem:</b> {repo.language} <br/>
                        </div>
                        <a className={styles.listItemLink} target="_blank" href={repo.html_url}>Visitar no site</a> 
                    </li>
                ))}
                
                
            </ul>
        
        </>
    )

}

export default ReposList;