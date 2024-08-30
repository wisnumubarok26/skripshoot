import FormLogin from "../fragment/FormLogin";
import { Link } from "react-router-dom";

const AuthLayout = (props) =>{
    const {judulPage,children,type}=props;
    return ( 

        <div className='w-full max-w-xs bg-form rounded p-3'>
            <h1 className='text-3xl font-bold text-textPrimary text-center mb-2'>{judulPage}</h1>
            <p className='font-medium text-textSecondary text-center'>Selamat Datang</p>
            {children}
            <p className="text-sm my-5 text-center">
                {type==='login' ? "Belum punya akun ? " : "Sudah punya akun? "} 
                {type==='login' &&
                    <Link to="/register" className="text-bold text-textSecondary">Register</Link>
                }

                {type==='register' &&
                    <Link to="/login" className="text-bold text-textSecondary">Login</Link>
                }
            </p>
        </div>  
    )
}

export default AuthLayout;