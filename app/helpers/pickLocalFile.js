export function pickLocalFile(callback) {
    const {activeElement} = document;

    const fileSelector = document.createElement('input');
    fileSelector.type = 'file';
    fileSelector.style.visibility = 'hidden';
    document.body.appendChild(fileSelector);

    // Ugly workaround to be able to catch the cancel click
    document.body.onfocus = () => {
        document.body.onfocus = null;

        setTimeout(() => {
            const file = fileSelector.files[0];
            document.body.removeChild(fileSelector);
            callback(file)
            activeElement.focus();
        }, 200);
    }

    fileSelector.click();
}