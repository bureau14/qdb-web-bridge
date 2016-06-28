import React from 'react'

export default function Form({children,onSubmit}) {
    return (
        <form className='pure-form' onSubmit={e => {e.preventDefault();onSubmit(e)}}>
            {children}
        </form>
    )
}