import InternalLink from "./data-types/InternalLink.js";
import { objTests } from "./data/tests.js";
import { removeChildren } from "./utils.js";

function createPathFromInternalLink(link) {
    if(link.type === 'Test') {
        if(objTests.hasOwnProperty(link.targetId)) {
            return `/tests/${link.targetId}`;
        }

        return null;
    }

    throw new Error(`The link type "${link.type}" is not supported.`);
}

export function replaceInternalLinks(html) {
    return html.replaceAll(/\[Link[\s]+(type|targetId|label)="([^"]+)"[\s]+(type|targetId|label)="([^"]+)"[\s]+(type|targetId|label)="([^"]+)"[^\]]*\]/g, (_, group1Attribute, group1Value, group2Attribute, group2Value, group3Attribute, group3Value) => {
        const internalLink = new InternalLink({
            [group1Attribute]: group1Value,
            [group2Attribute]: group2Value,
            [group3Attribute]: group3Value,
        });

        const path = createPathFromInternalLink(internalLink);

        if(path !== null) {
            return `<a href="${path}" data-navigo>${internalLink.label}</a>`;
        }

        return `<em>${internalLink.label}</em>`;
    });
}

export function replaceExternalLinks(html) {
    return html.replaceAll('<a ', '<a target="_blank" ');
}

function getHeader(headerBlocks) {
    const wrapper = document.createElement("nav");
    wrapper.classList.add("navbar", "navbar-expand-lg", "bg-body-tertiary");

    const container = document.createElement("div");
    container.classList.add("container-fluid", "justify-content-start");
    headerBlocks = Array.isArray(headerBlocks) ? headerBlocks : [headerBlocks];
    container.append(...headerBlocks);

    wrapper.appendChild(container);

    return wrapper;
}

function getMain(mainContent) {
    const mainBlocks = Array.isArray(mainContent) ? mainContent : [mainContent];

    return mainBlocks.flatMap(mainBlock => {
        if (typeof mainBlock === 'string' || mainBlock instanceof String) {
            const template = document.createElement("template");
            template.innerHTML = replaceInternalLinks(replaceExternalLinks(mainBlock));

            const children = template.content.children;

            if (children.length === 1) return Array.isArray(children[0]) ? children[0] : [children[0]];
            return Array.from(children);
        }

        return mainBlock;
    });
}

export function renderPage(content) {
    const headerElement = document.getElementById("header");
    removeChildren(headerElement);
    if(content.hasOwnProperty("header") && content.header.length > 0) {
        headerElement.classList.remove("d-none");
        headerElement.appendChild(getHeader(content.header));
    } else {
        headerElement.classList.add("d-none");
    }

    const mainElement = document.getElementById("main");
    removeChildren(mainElement);
    if(content.hasOwnProperty("main")) {
        mainElement.append(...getMain(content.main));
    }
}
