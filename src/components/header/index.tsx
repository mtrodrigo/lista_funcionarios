import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

export function Header() {
    return (
        <header className='w-full border border-b-zinc-700'>
            <div className='max-w-6xl mx-auto flex items-center justify-between h-12 px-2'>
                <Link className='w-15' to='/'>
                    <img className='w-full' src={logo} alt="Logo" />
                </Link>
                <Button color='info' size='small' variant="text" href="/login">
                    Login
                </Button>
            </div>
        </header>
    )
}