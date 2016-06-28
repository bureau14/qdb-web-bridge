import React from 'react'

export default function Expander({id,className,children,expansion}){

    return (
        <div id ={id} className={`expander ${className}`}>
            <div className={`expander-slide-${children.length}x expansion-${expansion}`}>
                {children.map((child,index) => <div key={index}>{child}</div>)}
            </div>
        </div>
    )
}