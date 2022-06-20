function Screen(props) {
    return(
        <div className="my-1 p-4 bg-indigo-900 rounded">
            <div className="flex justify-end items-center p-1 bg-teal-800 w-full h-10 rounded ">
                {props.value}
            </div>
        </div>
    )
}

export default Screen