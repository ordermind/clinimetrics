const linkSelector = "[data-navigo]";

function openTab(path) {
    const newPath = "#" + path;

    window.open(newPath, '_blank');
}

function onAuxClick(e) {
    openTab(e.target.getAttribute('href'));

    e.preventDefault();
}

function onClick(e) {
    if(e.ctrlKey) {
        openTab(e.target.getAttribute('href'));

        e.preventDefault();
    }
}

export function addNewTabClickEventListeners() {
    for(const element of document.querySelectorAll(linkSelector)) {
        element.addEventListener("click", onClick);
        element.addEventListener("auxclick", onAuxClick);
    }
}

export function removeNewTabClickEventListeners() {
    for(const element of document.querySelectorAll(linkSelector)) {
        element.removeEventListener("click", onClick);
        element.removeEventListener("auxclick", onAuxClick);
    }
}