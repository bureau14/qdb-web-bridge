import React from 'react';
import toastr from 'toastr'
import {connect} from 'react-redux'
import SyntaxHighlightedFrame from "./SyntaxHighlightedFrame.jsx"
import {downloadFile,pickLocalFile} from '../../helpers'
import {Button} from '../../controls'
import qdb from '../../api/QuasardbApi'
import {getEntry} from '../../actions/inspect'

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

class UploadButton extends React.Component {
    state = {busy: false}

    onClick = () => {
        return pickLocalFile(file => {
            if (!file) return;

            this.setState({busy: true, progress: 0})

            return qdb.blobUpdate(this.props.alias, file, this.onProgress)
                .then(() => this.props.onSuccess())
                .catch(error => toastr.error(error))
                .then(() => this.setState({busy:false}))
        });
    }

    onProgress = (progress) => {
        this.setState({progress});
    }

    render() {
        if (this.state.busy)
            return <Button className='inspect-content-download' icon='upload' text={`Uploading ${(this.state.progress*100).toFixed(0)}%`} />
        else
            return <Button className='inspect-content-download' icon='upload' text='Upload'onClick={this.onClick}/>
    }
}

function InspectContent({alias, mime, url, dispatch}) {
    return (
        <div>
            <h3>Content</h3>
            <ContentPreview mime={mime} url={url} />
            <DownloadButton url={url} />
            <UploadButton alias={alias} onSuccess={() => dispatch(getEntry(alias))} />
        </div>
    )
}

function mapStateToProps(state, ownProps) {
    const {alias} = ownProps;
    const entry = state.entries[alias];
    return {
        alias,
        url: `/api/v1/blobs/${encodeURIComponent(alias)}/content`,
        mime: entry.mime
    }
}

export default connect(mapStateToProps)(InspectContent);