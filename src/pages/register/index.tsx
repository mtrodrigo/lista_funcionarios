import { Input } from "../../components/input"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { funcionariosData } from "../../components/table";
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { useForm } from 'react-hook-form';
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from 'react-hot-toast'

const schema = z.object({
    nome: z.string().nonempty('Campo obrigatório'),
    cpf: z.string().max(11, 'No máximo 11 caracteres').nonempty('Campo obrigatório'),
    email: z.string().email('E-mail inválido').nonempty('Campo obrigatório'),
    endereco: z.string().nonempty('Campo obrigatório'),
    numero: z.string().nonempty('Campo obrigatório'),
    telefone: z.string().max(11, 'No máximo 11 caracteres').nonempty('Campo obrigatório'),
})

type FormData = z.infer<typeof schema>;

export function Register() {

    const [funcionarios, setFuncionarios] = useState<funcionariosData[]>([])

    const {register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onSubmit'
    })

    useEffect(() => {
        async function loadFuncionarios() {
            const funcionariosRef = collection(db, 'funcionarios')
            const queryFuncionarios = query(funcionariosRef, orderBy('nome', 'asc'))
            getDocs(queryFuncionarios)
                .then((snapshot) => {
                    let list = [] as funcionariosData[]
                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            nome: doc.data().nome,
                            cpf: doc.data().cpf,
                            email: doc.data().email,
                        })
                    })
                    setFuncionarios(list)
                })
        }
        loadFuncionarios()
    }, [])

    const handleRegister = (data: FormData) => {
        const funcionariosRef = collection(db, 'funcionarios')
        addDoc(funcionariosRef, data)
        .then(() => {
            window.location.reload()
        })
        .catch((error) => {
            console.log(error); 
        })
         
    }
    
    async function handleDelete(id: string) {
        const docRef = doc(db, 'funcionarios', id)
        await deleteDoc(docRef)
        window.location.reload()
        toast.success('Funcionário deletado com sucesso')
    }

    return (
        <main className="bg-zinc-400 w-full max-w-md flex flex-col gap-1 items-center justify-center mx-auto p-4 rounded-xl my-10">
            <h1 className="text-xl text-center">Cadastro</h1>
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="flex flex-col gap-2">
                    <div>
                        <label>Nome</label>
                        <Input
                            type="text"
                            name="nome"
                            placeholder="Digite o nome"
                            register={register}
                            error={errors.nome?.message}
                        />
                    </div>
                    <div>
                        <label>CPF</label>
                        <Input
                            type="text"
                            name="cpf"
                            placeholder="Digite o CPF, sem pontos e hífem"
                            register={register}
                            error={errors.cpf?.message}
                        />
                    </div>
                    <div>
                        <label>E-mail</label>
                        <Input
                            type="text"
                            name="email"
                            placeholder="Digite o email"
                            register={register}
                            error={errors.email?.message}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="w-11/10">
                            <label>Endereço</label>
                            <Input
                                type="text"
                                name="endereco"
                                placeholder="Digite o nome da rua/avenida"
                                register={register}
                                error={errors.endereco?.message}
                            />
                        </div>
                        <div>
                            <label>Número</label>
                            <Input
                                type="text"
                                name="numero"
                                placeholder="Digite o número"
                                register={register}
                                error={errors.numero?.message}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Telefone</label>
                        <Input
                            type="text"
                            name="telefone"
                            placeholder="Digite o telefone"
                            register={register}
                            error={errors.telefone?.message}
                        />
                    </div>
                    <Button color='info' size='small' variant="text" type='submit'>
                        Cadastrar
                    </Button>
                    <TableContainer sx={{ maxWidth: 800, bgcolor: '#F2F2F2' }} component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Nome</TableCell>
                                    <TableCell align="center">CPF</TableCell>
                                    <TableCell align="center">E-mail</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {funcionarios?.map((funcionario) => (
                                    <TableRow
                                        key={funcionario.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {funcionario.nome}
                                        </TableCell>
                                        <TableCell align="center">{funcionario.cpf}</TableCell>
                                        <TableCell align="center">{funcionario.email}</TableCell>
                                        <TableCell>
                                            <button className="cursor-pointer" onClick={() => handleDelete(funcionario.id)}>
                                                <FaRegTrashCan />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </form>
        </main>
    )
}