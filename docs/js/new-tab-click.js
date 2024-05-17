const linkSelector = "data-internal-link";

function openTab(path) {
    const newPath = "#!" + path;

    console.log(newPath)

    window.open(newPath, '_blank');
}

function onAuxClick(e) {
    if(!e.target.hasAttribute(linkSelector)) {
        return;
    }

    openTab(e.target.getAttribute('href'));

    e.preventDefault();
}

function onClick(e) {
    if(!e.target.hasAttribute(linkSelector)) {
        return;
    }

    if(e.ctrlKey) {
        openTab(e.target.getAttribute('href'));

        e.preventDefault();
    }
}

export function addNewTabClickEventListeners() {
    document.addEventListener("click", onClick, false);
    document.addEventListener("auxclick", onAuxClick, false);
}
