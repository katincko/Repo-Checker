import { useEffect , useState } from "react";
import styles from './ReposList.module.css';

// Define as cores para cada linguagem
const getColorForLanguage = (language) => {
    const colors = {
        JavaScript: "#f1e05a",
        Python: "#3572A5",
        HTML: "#e34c26",
        CSS: "#563d7c",
        TypeScript: "#2b7489",
        Java: "#b07219",
        C: "#555555",
        "C++": "#f34b7d",
        PHP: "#4F5D95",
        Ruby: "#701516",
        Go: "#00ADD8",
        Shell: "#89e051",
        // Adicione mais linguagens e cores aqui
    };

    return colors[language] || "#ccc"; // Cor padrão para linguagens desconhecidas
};


const ReposList = ({erro, setErro, nome , buscarRepos , setBuscarRepos}) => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState({});
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; 
    //console.log(nome); //comentei pra não poluir o console
    

    useEffect(() => {
        if (buscarRepos && nome !== "") {
            setLoading(true);
            setRepos([]);
            setErro("");
            
            fetch(`https://api.github.com/users/${nome}/repos`, {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                },
            })

            
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
            .then(async (resJson) => {
                const languagesData = {};
                const updatedRepos = await Promise.all(
                    resJson.map(async (repo) => {
                        const langResponse = await fetch(repo.languages_url, {
                            headers: {
                                Authorization: `Bearer ${GITHUB_TOKEN}`,
                            },
                        });
                        const langJson = await langResponse.json();

                        // Define a linguagem principal
                        const lingPrincipal = repo.language || "Sem linguagem principal definida";

                        // Calcula as porcentagens
                        const totalBytes = Object.values(langJson).reduce((acc, b) => acc + b, 0);
                        const percentages = Object.entries(langJson).map(([lang, bytes]) => ({
                            language: lang,
                            percentage: ((bytes / totalBytes) * 100).toFixed(2),
                        }));

                        // Armazena os dados de linguagem
                        languagesData[repo.id] = percentages;

                        // Retorna o repositório atualizado com a linguagem principal
                        return { ...repo, lingPrincipal };
                    })
                );

                setLanguages(languagesData);
                setRepos(updatedRepos);
                setLoading(false);
                setBuscarRepos(false);
                
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
            {loading && <h1 className={styles.loading}>Carregando...</h1>}

            {erro && <h1 className={styles.erro}>{erro}</h1>}

                
            <ul className={styles.list}>
                {/* cria um "objeto" pra cada linguagem*/}
                {repos.map((repo) => (

                    <li className={styles.listItem}
                     key={repo.id}
                     onClick={() => window.open(repo.html_url, "_blank")} // Abre o link em uma nova aba
                     style={{ cursor: "pointer" }} // Adiciona um cursor de "mão" para indicar que é clicável
                     >

                        <div className={styles.listItemName}>
                            <b>Nome:</b> {repo.name} <br />
                        </div>


                        <div className={styles.listItemLanguage}>
                            <b>Linguagem Principal:</b> {repo.lingPrincipal} <br />
                        </div>

                        {/* Essa bosta aq faz as barras das linguagens */}
                        <div className={styles.languageStats}>
                            {languages[repo.id] && (
                                <div className={styles.languageBarContainer}>
                                    {languages[repo.id].map(({ language, percentage }) => (
                                        <div
                                        key={language}
                                        className={styles.languageBar}
                                        style={{ width: `${percentage}%`, backgroundColor: getColorForLanguage(language) }}
                                        >
                                        
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Essa bosta aq faz  as bolinhas e a porcentagem das linguagens.*/}
                        <div>
                            {languages[repo.id] &&(
                                <div>
                                    {languages[repo.id].map(({ language, percentage }) => (
                                        <div key = {language} style={{display: "flex"}} >
                                            
                                            <div style={{
                                                width: '5%' , 
                                                padding: "7px",
                                                height: '10px',
                                                marginBottom: '5px',
                                                borderRadius: "100%",
                                                gap: '10px',
                                                border: '2px solid #cac9c9a9',
                                                borderTopLeftRadius: '100%', 
                                                borderTopRightRadius: '100%' ,
                                                borderEndEndRadius: '100%' , 
                                                borderStartEndRadius: '100%',
                                                backgroundColor: getColorForLanguage(language)}}> </div>

                                            <div >
                                                <p> - {language} ({percentage}%)</p>   
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        

                        
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ReposList;