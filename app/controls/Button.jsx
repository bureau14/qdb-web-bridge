import React from 'react'
import Icon from './Icon.jsx'

export default function Button({icon,children,onClick,className,text='',type='button'}) {
    const disabled = type != 'submit' && onClick == undefined;
    const onClickWrapper = onClick ? e => {e.preventDefault();onClick()} : undefined;
    return (
        <button type={type} className={"pure-button "+className} disabled={disabled} onClick={onClickWrapper}>
            {icon && <Icon className={"fa fa-" + icon}/>} {text} {children}
        </button>
    )
}