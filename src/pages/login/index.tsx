import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { useEffect, useState } from 'react';
import { auth } from '../../services/firebaseConnection'
import { signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { Input } from '../../components/input';
import { Button } from '@mui/material';

const schema = z.object({
    email: z.string().email('E-mail inválido').nonempty('Campo obrigatório'),
    password: z.string().nonempty('Digite a senha')
})
type FormData = z.infer<typeof schema>;

export function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    })

    useEffect(() => {
        async function logout() {
            await signOut(auth)
        }
        logout()
    }, [])

    const onSubmit = (data: FormData) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                navigate('/')
            }).catch((err) => {
                setError(true)
                console.log(err);
            })
    }
        
       
    return (
        <div>
            <form
                className='flex flex-col items-center gap-4 max-w-md mx-auto my-30 bg-zinc-400 p-5 rounded-xl'
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className='text-center text-xl'>Login</h1>
                <div>
                    <Input
                        placeholder='Digite seu email'
                        type='email'
                        name='email'
                        register={register}
                        error={errors.email?.message}
                    />
                </div>
                <div>
                    <Input
                        placeholder='Digite sua senha'
                        type='password'
                        name='password'
                        register={register}
                        error={errors.password?.message}
                    />
                </div>
                <span className='text-red-500'>{error && 'E-mail ou senha inválida'}</span>
                <Button color='info' size='small' variant="text" type='submit'>
                    Entrar
                </Button>
            </form>
        </div>
    )
}