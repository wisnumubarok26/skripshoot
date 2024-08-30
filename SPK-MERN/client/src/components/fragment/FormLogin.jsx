import { useState } from "react";
import Button from "../element/Button/Button";
import InputForm from "../element/Input";
import { useNavigate } from 'react-router-dom';

const FormLogin = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Inisiasi username dan password admin
    const adminUsername = 'wisnumubarok26';
    const adminPassword = 'wisnu2002';

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi username dan password
        if (username === adminUsername && password === adminPassword) {
            setIsLoggedIn(true); // Set login state
            navigate('/home');
        } else {
            setError('Email atau Password Salah');
            // Reset form jika login gagal
            setUsername('');
            setPassword('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputForm 
                label="Username"
                type="text"
                placeholder="Masukkan username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <InputForm 
                label="Password"
                type="password"
                placeholder="Masukkan Password Anda"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500">{error}</p>}

            <Button type="submit" text="Login" />            
        </form>
    );
}

export default FormLogin;
