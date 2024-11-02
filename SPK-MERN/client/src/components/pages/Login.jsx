import FormLogin from "../fragment/FormLogin";
import AuthLayout from "../layout/AuthLayout";
import Logo from "../element/Logo/Logo";

const LoginPage = () => {
    return (
        <div className="flex min-h-screen bg-bg p-10 ">
            {/* Sisi Kiri */}
            <div className="flex-1 flex justify-center items-center flex-col">
                <Logo></Logo>
                <p className="m-3 p-4">Taman Baca Masyarakat ( TBM ) Kolong Ciputat merupakan sebuah tempat yang dibuat secara inisiatif yang menjadi pusat untuk belajar dan bermain bagi anak-anak. Sebagai pusat kegiatan literasi, TBM Kolong Ciputat tidak hanya menyediakan bahan bacaan. Tetapi, juga menyelenggarakan berbagai program edukatif. 

                </p>
            </div>

            {/* Sisi Kanan */}
            <div className="flex-1 flex justify-center items-center">
                <AuthLayout judulPage="Login" type='login'>
                    <FormLogin />
                </AuthLayout>
            </div>
        </div>
    );
};

export default LoginPage;
