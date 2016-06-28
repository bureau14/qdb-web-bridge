import React from 'react'

function Dialog({title,children, className}) {
    return (
        <div className={className + ' dialog'}>
            <h4 className="title">
                {title}
            </h4>
            <div className='content'>
                {children}
            </div>
        </div>
    )
}

function DialogButtons({children}) {
    return (
        <div className='buttons'>
            {children}
        </div>
    )
}

function DialogContent({children}) {
    return (
        <div className="message">
            {children}
        </div>
    )
}

Dialog.Buttons = DialogButtons;
Dialog.Content = DialogContent;

export default Dialog;