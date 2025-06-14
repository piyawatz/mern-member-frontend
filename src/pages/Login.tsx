import { useState } from 'react';
import { TextField, Button, Container, Typography, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import Swal from 'sweetalert2';

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // กด Enter submit form
    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };


    const handleSubmit = async () => {
        try {
            const res = await login(form);

            // แสดง success popup
            await Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Welcome back!',
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err: any) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: err.response?.data?.message || 'Login Failed',
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>

            <Box onKeyDown={handleKeyPress}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    autoFocus
                />
                <TextField
                    fullWidth
                    margin="normal"
                    type="password"
                    label="Password"
                    name="password"
                    onChange={handleChange}
                />
            </Box>

            <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
                Login
            </Button>

            <Typography mt={2} textAlign="center">
                Don't have an account?{' '}
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/register')}
                >
                    Register here
                </Link>
            </Typography>
        </Container>
    );
}
