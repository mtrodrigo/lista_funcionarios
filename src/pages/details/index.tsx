import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { funcionariosData } from "../../components/table"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

export function Details(){

    const { id } = useParams()
    const [funcionario, setFuncionario] = useState<funcionariosData[]>([])

    useEffect(() => {
        async function loadFuncionario() {
            const dtFuncionario = doc(db, `funcionarios/${id}`)
            getDoc(dtFuncionario)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setFuncionario(snapshot.data() as funcionariosData[])
                }
            })
        }
        loadFuncionario()
        console.log(funcionario);
        
    }, [id])



    return(
        <div className="w-full my-50">
            <section className="w-full max-w-xl flex flex-col bg-zinc-400 mx-auto">
                <h2 className="text-xl font-bold text-center border-b border-b-zinc-500">Rodrigo</h2>
                <p>CPF: {funcionario.nome}</p>
                <p>E-mail: {funcionario.email}</p>
                <p>Endereço: {funcionario.endereco}, nº: {funcionario.numero}</p>
                <p>Telefone: {funcionario.telefone}</p>
            </section>
        </div>
    )
}