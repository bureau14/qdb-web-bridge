import React from 'react';

export default function InspectError({error, alias}) {
    return (
        <h2 className='error'>
            Cannot view entry <span className='qdb-entry-alias'>{alias}</span><br/>
            ERROR: {error}
        </h2>
    )
}

