import add_tag from './add_tag';
import blob_get from './blob_get';
import blob_put from './blob_put';
import blob_update from './blob_update';
import get_tagged from './get_tagged';
import get_tags from './get_tags';
import help from './help';
import remove from './remove';
import remove_tag from './remove_tag';

const commands = {
    add_tag,
    blob_get,
    blob_put,
    blob_update,
    get_tagged,
    get_tags,
    remove,
    remove_tag
}

commands.help = help(commands);

export default commands;