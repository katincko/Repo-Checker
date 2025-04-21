import { useState , useEffect } from "react";

const Formulario = () => {
    const [materiaA , setMateriaA] = useState(0);
    const [materiaB , setMateriaB] = useState(0);
    const [materiaC , setMateriaC] = useState(0);



    useEffect(() => {
        console.log("a ${materiaA} estado mudou.")

    }, [materiaA]);

    const resultado = () => {
        const soma = materiaA + materiaB + materiaC;
        const media = soma / 3;
        if (media >= 7) {
            return ": Aprovado";
        }
        else if (media >= 5) {
            return ": Em Recuperação";
        } else {
            return ":  Reprovado";}
    }
    
    
    
    return (
        <form action="">
            <input type="number" placeholder="Nota matéria A" onChange={evento => setMateriaA(parseInt(evento.target.value))}/>
            <input type="number" placeholder="Nota matéria B" onChange={evento => setMateriaB(parseInt(evento.target.value))}/>
            <input type="number" placeholder="Nota matéria C" onChange={evento => setMateriaC(parseInt(evento.target.value))}/>
            <p>O aluno está{resultado()}</p>
            
            
        </form>
    )
}



export default Formulario;
