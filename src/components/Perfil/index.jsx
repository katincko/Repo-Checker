//import './perfil.css'
import styles from './perfil.module.css';
 
const Perfil = ({ nome }) => {
    return (
        <header className={styles.header}>
            <img className={styles.avatar} src={`https://github.com/${nome}.png`} />
            <h3 className={styles.name}>{nome}</h3>
        </header>
    )
}

export default Perfil;