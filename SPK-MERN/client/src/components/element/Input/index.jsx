import Label from "./Label"
import Input from "./Input"

const InputForm = (props)=>{
    const {type,label,name,placeholder,value,onChange}=props
    return(
        <div className='mb-4'>
            <Label htmlFor={name} name={name}>{label}</Label>
            <Input type={type} name={name} id={name} placeholder={placeholder}value={value}onChange={onChange}/>
        </div>
    )
}

export default InputForm;