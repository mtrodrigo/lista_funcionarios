import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { funcionariosData } from "../../components/table"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

export function Details(){

    const { id } = useParams()
    const [funcionario, setFuncionario] = useState<funcionariosData | null>(null)

    useEffect(() => {
        async function loadFuncionario() {
            const dtFuncionario = doc(db, `funcionarios/${id}`)
            getDoc(dtFuncionario)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setFuncionario(snapshot.data() as funcionariosData)
                }
            })
        }
        loadFuncionario()
        console.log(funcionario);
        
    }, [id])



    return(
        <div className="w-full my-50">
            <section className="w-full max-w-xl flex flex-col bg-zinc-400 mx-auto">
                {!funcionario ? <h2>Carregando...</h2> : (
                    <>
                        <h2 className="text-xl font-bold text-center border-b border-b-zinc-500">{funcionario.nome}</h2>
                        <p>CPF: {funcionario.cpf}</p>
                        <p>E-mail: {funcionario.email}</p>
                        <p>Endereço: {funcionario.endereco}, nº: {funcionario.numero}</p>
                        <p>Telefone: {funcionario.telefone}</p>
                    </>
                )}
            </section>
        </div>
    )
}