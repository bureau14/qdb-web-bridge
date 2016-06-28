import React from 'react'
import {Button,Dialog,Form,AliasInput} from '../../controls'

const ATTACH_TAG_TO_SELECTED   = 'attachTagToSelected';
const ATTACH_TAGGED            = 'attachTagged';
const DETACH_SELECTED_TAGGED   = 'detachSelectedTagged';
const DETACH_TAG_FROM_SELECTED = 'detachTagFromSelected';
const REMOVE_SELECTED          = 'removeSelected';
const ATTACH_TAG               = 'attachTag';
const DETACH_SELECTED_TAGS     = 'detachSelectedTags';

class AliasDialog extends React.Component {
    onSubmit = () => {
        this.props.onOk(this.input.alias);
    }

    render() {
        const {title,text,onCancel} = this.props;
        return (
            <Dialog title={title} className='entry-operations'>
                <Form onSubmit={this.onSubmit}>
                    <Dialog.Content>
                        {text}
                        <AliasInput ref={x => this.input = x} />
                    </Dialog.Content>
                    <Dialog.Buttons>
                        <Button type='submit'>OK</Button>
                        <Button type='button' onClick={onCancel}>Cancel</Button>
                    </Dialog.Buttons>
                </Form>
            </Dialog>
        )
    }
}

function ConfirmDialog({title,text,onOk,onCancel}) {
    return (
        <Dialog title={title} className='entry-operations'>
            <Dialog.Content>
                {text}
                <br/>
                Are you sure ?
            </Dialog.Content>
            <Dialog.Buttons>
                <Button onClick={onOk}>Yes</Button>
                <Button onClick={onCancel}>No</Button>
            </Dialog.Buttons>
        </Dialog>
    )
}

function pluralize(noun) {
    switch(noun) {
    case 'entry':
        return 'entries';
    default:
        return noun +  's';
    }
}

export default class OperationWizard extends React.Component {

    state = {}

    select = (operation) => {
        this.setState({
            selectedOperation: operation
        })
    }

    unselect = () => {
        this.setState({
            selectedOperation: undefined
        })
    }

    render() {
        const {count,entryType,attachTagged,attachTag,detachSelectedTagged,detachSelectedTags,attachTagToSelected,detachTagFromSelected,removeSelected} = this.props;
        const countAsText = count == 1 ? `1 ${entryType}` : `${count} ${pluralize(entryType)}`;

        switch(this.state.selectedOperation) {
        case ATTACH_TAG_TO_SELECTED:
            return <AliasDialog
                title={`Attach tag to ${countAsText}...`}
                text='Alias of the tag:'
                onCancel={this.unselect}
                onOk={alias => {
                    this.unselect();
                    attachTagToSelected(alias)
                }} />

        case DETACH_TAG_FROM_SELECTED:
            return <AliasDialog
                title={`Detage tag from ${countAsText}...`}
                text='Alias of the tag:'
                onCancel={this.unselect}
                onOk={alias => {
                    this.unselect();
                    detachTagFromSelected(alias);
                }} />

        case REMOVE_SELECTED:
            return <ConfirmDialog
                title={`Remove/delete ${countAsText}...`}
                text={`This remove/delete ${countAsText} from the database`}
                onCancel={this.unselect}
                onOk={() => {
                    this.unselect();
                    removeSelected();
                }} />

        case ATTACH_TAG:
            return <AliasDialog
                title='Attach tag...'
                text='Alias of the tag:'
                onCancel={this.unselect}
                onOk={alias => {
                    this.unselect();
                    attachTag(alias);
                }} />

        case ATTACH_TAGGED:
            return <AliasDialog
                title='Attach entry...'
                text='Alias of the entry:'
                onCancel={this.unselect}
                onOk={alias => {
                    this.unselect();
                    attachTagged(alias);
                }} />

        case DETACH_SELECTED_TAGGED:
            return <ConfirmDialog
                title='Detach entries...'
                text={`This will detach ${countAsText} from tag`}
                onCancel={this.unselect}
                onOk={() => {
                    this.unselect();
                    detachSelectedTagged();
                }} />

        case DETACH_SELECTED_TAGS:
            return <ConfirmDialog
                title='Detach tags...'
                text={`This will detach ${countAsText} tags`}
                onCancel={this.unselect}
                onOk={() => {
                    this.unselect();
                    detachSelectedTags();
                }} />

        default:
            return (
                <div className='entry-operations'>
                    {attachTagToSelected   && count > 0  && <Button icon='tag'          text={'Attach a tag to ' + countAsText}   onClick={() => this.select(ATTACH_TAG_TO_SELECTED)} />}
                    {detachTagFromSelected && count > 0  && <Button icon='tag'          text={'Detach a tag from ' + countAsText} onClick={() => this.select(DETACH_TAG_FROM_SELECTED)} />}
                    {removeSelected        && count > 0  && <Button icon='trash'        text={'Remove/Delete ' + countAsText}     onClick={() => this.select(REMOVE_SELECTED)} />}
                    {detachSelectedTagged  && count > 0  && <Button icon='minus-square' text={'Detach '+countAsText}              onClick={() => this.select(DETACH_SELECTED_TAGGED)} />}
                    {detachSelectedTags    && count > 0  && <Button icon='minus-square' text={'Detach '+countAsText}              onClick={() => this.select(DETACH_SELECTED_TAGS)} />}
                    {attachTagged          && count == 0 && <Button icon='plus-square'  text='Attach an entry'                    onClick={() => this.select(ATTACH_TAGGED)} />}
                    {attachTag             && count == 0 && <Button icon='plus-square'  text='Attach an tag'                      onClick={() => this.select(ATTACH_TAG)} />}
                </div>
            )
        }
    }
}
