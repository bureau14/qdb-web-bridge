import React from 'react'

function setFocus(input) {
    if (input != null) {
        setTimeout(() => input.focus(), 500);
    }
}

export default function TextInput({value,onChange}) {

    const refCallback = setFocus;
    return (
        <input type='text' disabled={!onChange}
            onChange={e => {e.preventDefault();onChange(e.target.value)}}
            value={value}
            ref={refCallback}
            />
    )
}