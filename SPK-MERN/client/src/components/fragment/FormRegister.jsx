import InputForm from "../element/Input"
import Button from "../element/Button/Button"
const FormRegister = ()=>{
    return(
        <form action="">
          <InputForm 
          label="Nama"
          type="text"
          placeholder="Masukan Nama Anda"
          name="nama"/>  

          <InputForm 
          label="Email"
          type="email"
          placeholder="Masukan Email Anda"
          name="email"/> 

        <InputForm 
          label="Password"
          type="password"
          placeholder="Masukan Password Anda"
          name="password"/>

        <InputForm 
          label="Re-Password"
          type="password"
          placeholder="Masukan Ulang Password Anda"
          name="re-password"/>
                           
        <Button type="submit" text="Register" ></Button>
        </form>
    )
}


export default FormRegister