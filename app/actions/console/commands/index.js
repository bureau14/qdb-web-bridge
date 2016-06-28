import AddTagCommand from './AddTagCommand';
import BlobGetCommand from './BlobGetCommand';
import BlobPutCommand from './BlobPutCommand';
import GetTagsCommand from './GetTagsCommand';
import GetTaggedCommand from './GetTaggedCommand';
import RemoveTagCommand from './RemoveTagCommand';
import RemoveCommand from './RemoveCommand';

const commands = {
    'add_tag': new AddTagCommand(),
    'blob_put': new BlobPutCommand(),
    'blob_get': new BlobGetCommand(),
    'get_tags': new GetTagsCommand(),
    'get_tagged': new GetTaggedCommand(),
    'remove_tag': new RemoveTagCommand(),
    'remove': new RemoveCommand()
}

export default commands;