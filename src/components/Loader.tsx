import React from 'react'
import { Spinner } from "@nextui-org/react";

const Loader = () => {
    return (
        <div className='w-full h-full grid items-center'>
            <Spinner color="primary" />
        </div>
    )
}

export default Loader