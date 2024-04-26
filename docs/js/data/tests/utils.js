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
