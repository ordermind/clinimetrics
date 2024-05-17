export function formatNumber(number, decimals = 2) {
    return Intl.NumberFormat('nl-NL',{ maximumFractionDigits: decimals }).format(number);
}

export function setContraIndication(element, value) {
    element.classList.remove("ci-clean", "ci-relative", "ci-absolute");

    if(value === "clean") {
        element.classList.add("ci-clean");
    } else if(value === "relative") {
        element.classList.add("ci-relative");
    } else if(value === "absolute") {
        element.classList.add("ci-absolute");
    }
}

export function isFilled(elementSelector) {
    return elementSelector !== undefined && elementSelector !== "";
}

export async function getTemplateContent(filename) {
    const response = await fetch(`./js/data/tests/form-templates/${filename}`);

    return await response.text();
}

function showSingleElementById(elementId) {
    const element = document.getElementById(elementId);
    if(!element) {
        return;
    }

    element.classList.remove("d-none");
}

function hideSingleElementById(elementId) {
    const element = document.getElementById(elementId);
    if(!element) {
        return;
    }

    element.classList.add("d-none");
}

export function showElementsById(elementIds) {
    if (typeof elementIds === 'string' || elementIds instanceof String) {
        showSingleElementById(elementIds);
    } else if(Array.isArray(elementIds)) {
        elementIds.forEach(showSingleElementById);
    }
}

export function hideElementsById(elementIds) {
    if (typeof elementIds === 'string' || elementIds instanceof String) {
        hideSingleElementById(elementIds);
    } else if(Array.isArray(elementIds)) {
        elementIds.forEach(hideSingleElementById);
    }
}