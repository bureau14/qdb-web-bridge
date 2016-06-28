export function downloadFile(url) {
    var link = document.createElement('a');
    link.style.visibility = 'hidden'
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}