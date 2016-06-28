import React from 'react'

export default function Checkbox({checked,onChange}) {
    return <input type="checkbox"
        className="pure-checkbox"
        checked={checked}
        onChange={onChange} />
}