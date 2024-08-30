// src/components/Logo.jsx
const Logo = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <img src="public\tbm-logo.png" alt="Logo" className="w-52 mb-0 pb-0" /> {/* Ganti dengan jalur logo yang benar */}
            <h1 className=" text-center text-2xl">
                TBM Kolong Menilai
            </h1>
        </div>
    );
};

export default Logo;
