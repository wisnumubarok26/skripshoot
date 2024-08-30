const Button = (props)=>{
    const {type,text}=props
    return(
        <button
            type='type'
            className='bg-green-700 rounded text-sm text-white px-6 py-2 mt-3 hover:bg-green-900'
            style={{ display: 'block', margin: '0 auto' }}>
            {text}
        </button>

    )
}

export default Button