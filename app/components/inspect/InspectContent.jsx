import React from 'react';
import SyntaxHighlightedFrame from "./SyntaxHighlightedFrame.jsx"


function ContentPreview({mime,url}) {
    if (mime.startsWith('image/'))
        return <img src={url} />
    if (mime.startsWith('text/'))
        return <SyntaxHighlightedFrame className='inspect-content-text' src={url} />
    return <div>No preview available</div>
}

export default function InspectContent({mime,alias}) {
    return (
        <div>
            <h3>Content</h3>
            <ContentPreview mime={mime} url={`/api/v1/blobs/${encodeURIComponent(alias)}/content`} />
        </div>
    )
}
