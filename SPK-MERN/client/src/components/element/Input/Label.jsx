import { Children } from "react"

const Label= (props) =>{
    const {children,name}=props
    return(
        <label htmlFor={name} className='block font-medium text-textSecondary'>
            {children}
        </label>
    )
}
export default Label