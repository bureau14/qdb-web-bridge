import React from 'react'

function injectStyleInIframe(iframe) {
    if (!iframe) return;
    setTimeout(() => {
        iframe.contentDocument.body.style.color= 'white';

        var cssLink = document.createElement("link")
        cssLink.href = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/styles/monokai-sublime.min.css";
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
        iframe.contentDocument.head.appendChild(cssLink);

        var jsLink = document.createElement("script");
        jsLink.src = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/highlight.min.js"
        jsLink.type = "text\/javascript";
        jsLink.onload = () => {
            var code =  iframe.contentDocument.getElementsByTagName("pre")[0];
            code.style.background = "transparent";
            iframe.contentWindow.hljs.highlightBlock(code);
        }
        iframe.contentDocument.head.appendChild(jsLink);
    }, 100);
}

export default function SyntaxHighlightedFrame({src,className}) {
    return <iframe ref={injectStyleInIframe} className={className} src={src} />
}
