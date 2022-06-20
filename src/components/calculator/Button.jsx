function Button(props) {
    let size
    if(props.type ==='small'){
        size = 'w-14'
    }else {
        size = 'w-full'
    }
    return(
        <button className={`${size} h-auto m-1.5 py-1.5 ${props.color} rounded-md`} onClick={props.onClick}>
                {props.number}
            </button>
    )

}

export default Button