import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
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
            <section className="w-full max-w-md flex flex-col gap-1 bg-zinc-300 rounded-xl mx-auto px-3 py-2">
                {!funcionario ? <h2>Carregando...</h2> : (
                    <>
                        <h2 className="text-xl font-bold text-center border-b border-b-zinc-500">{funcionario.nome}</h2>
                        <p>CPF: {funcionario.cpf}</p>
                        <p>E-mail: {funcionario.email}</p>
                        <p>Endereço: {funcionario.endereco}, nº: {funcionario.numero}</p>
                        <p>Telefone: {funcionario.telefone}</p>
                        <Link className="text-blue-500 text-center" to='/login'>Editar</Link>
                    </>
                )}
            </section>
        </div>
    )
}