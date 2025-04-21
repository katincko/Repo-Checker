import { useEffect , useState } from "react";
import styles from './ReposList.module.css';


const ReposList = ({nome}) => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.github.com/users/${nome}/repos`)
        .then(response => response.json())
        .then(resJson => {
            setTimeout(() => {
                // Simulando um atraso de 3 segundos
                // para demonstrar o uso do setTimeout
                setRepos(resJson);
                setLoading(false);
        },3000);
        })
            
    }, [nome]);

    return (
        <>
            {loading && (
                <h1 className={styles.loading} >Carregando...</h1>
                )}

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