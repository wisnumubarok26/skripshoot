import { useState } from "react"; // Pastikan ini ditambahkan
import { useNavigate } from "react-router-dom"; // Pastikan path ini sesuai dengan struktur folder Anda
import Button from "../element/Button/Button";
import InputForm from "../element/Input";

const FormLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            console.log(response)
            if (response.ok){
                localStorage.setItem("username",username)
            }

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            // Setelah login berhasil, panggil fungsi login dari context            
            navigate('/home');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
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
};

export default FormLogin;
