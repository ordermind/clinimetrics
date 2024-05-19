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

export function scrollToNextQuestionOnFormElementChange(e, testId, state) {
    function findNextUnfilledVisibleRowRecursive(rowElement) {
        const nextSibling = rowElement.nextElementSibling;
        if(!nextSibling) {
            return rowElement;
        }

        if(nextSibling.classList.contains("filled")) {
            return rowElement;
        }

        if(!nextSibling.checkVisibility()) {
            return rowElement;
        }

        return findNextUnfilledVisibleRowRecursive(nextSibling);
    }

    const element = e.target;
    if(!element.name) {
        return;
    }

    const assignmentsWrapper = element.closest("#assignments-wrapper");
    if(!assignmentsWrapper) {
        return;
    }

    if(state?.[testId]?.show_all_assignments) {
        return;
    }

    const parentRowElement = element.closest("tr");
    const lastFilledRow = [...parentRowElement.parentElement.querySelectorAll(":scope > tr.filled:not(.disabled)")].pop();
    if(parentRowElement !== lastFilledRow) {
        return;
    }

    const lastUnfilledRow = findNextUnfilledVisibleRowRecursive(parentRowElement);
    if(parentRowElement !== lastUnfilledRow) {
        lastUnfilledRow.scrollIntoView();
    } else {
        window.scrollTo(0, document.body.scrollHeight);
    }
}