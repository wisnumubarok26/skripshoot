import { useState } from "react";
import Button from "../element/Button/Button";
import InputForm from "../element/Input";
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
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


            <Button type="submit" text="Login" />            
        </form>
    );
}

export default FormLogin;
