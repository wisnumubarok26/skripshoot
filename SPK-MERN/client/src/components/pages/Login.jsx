import FormLogin from "../fragment/FormLogin";
import AuthLayout from "../layout/AuthLayout";
import Logo from "../element/Logo/Logo";

const LoginPage = () => {
    return (
        <div className="flex min-h-screen bg-bg ">
            {/* Sisi Kiri */}
            <div className="flex-1 flex justify-center items-center flex-col">
                <Logo></Logo>
                <p className="m-3 p-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius quo debitis inventore fugit aperiam atque delectus exercitationem, obcaecati quaerat beatae quos, dolor, odit accusamus sed veritatis odio reprehenderit et molestiae dolorum. Voluptas sit repudiandae error doloribus a quae amet quasi magnam nostrum soluta recusandae, eveniet provident nobis nihil odio quia!</p>
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
