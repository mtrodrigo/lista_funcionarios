import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateSvgIcon from '../plusIcon'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { db } from '../../services/firebaseConnection';


export interface funcionariosData {
    id: string | number,
    nome: string,
    cpf: number | string,
    email: string,
    endereco?: string,
    numero?: number | string,
    telefone?: number | string
}

export default function DenseTable() {

    const [funcionarios, setFuncionarios] = useState<funcionariosData[]>([])

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

    return (
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
                                <Link to={`/details/${funcionario.id}`}>
                                    <CreateSvgIcon />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
