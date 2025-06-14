import { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import Swal from 'sweetalert2';

export default function Register() {
    const [form, setForm] = useState({
        fullName: '',
        telephone: '',
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await register(form);
            await Swal.fire({
                icon: 'success',
                title: 'Register Success',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/login');
        } catch (err: any) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response?.data?.message || 'Register Failed'
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Register</Typography>
            <TextField fullWidth margin="normal" label="Full Name" name="fullName" onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Telephone" name="telephone" onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Username" name="username" onChange={handleChange} />
            <TextField fullWidth margin="normal" type="password" label="Password" name="password" onChange={handleChange} />
            <Button variant="contained" onClick={handleSubmit}>Register</Button>
        </Container>
    );
}
