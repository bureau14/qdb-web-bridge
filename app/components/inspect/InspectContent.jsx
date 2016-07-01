import React from 'react';
import SyntaxHighlightedFrame from "./SyntaxHighlightedFrame.jsx"
import {downloadFile} from '../../helpers'
import {Button} from '../../controls'

function ContentPreview({mime,url}) {
    if (mime.startsWith('image/'))
        return <img className='inspect-content-image' src={url} />
    if (mime.startsWith('text/'))
        return <SyntaxHighlightedFrame className='inspect-content-text' src={url} />
    return <div>No preview available</div>
}

function DownloadButton({url}) {
    return (
        <Button
            className='inspect-content-download'
            icon='download'
            text='Download'
            onClick={()=>downloadFile(url + '?download=true')}/>
    )
}

export default function InspectContent({mime,alias}) {
    const url = `/api/v1/blobs/${encodeURIComponent(alias)}/content`;
    return (
        <div>
            <h3>Content</h3>
            <ContentPreview mime={mime} url={url} />
            <DownloadButton url={url} />
        </div>
    )
}
