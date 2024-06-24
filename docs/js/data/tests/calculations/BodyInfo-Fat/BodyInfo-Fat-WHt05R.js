function getWHt05RCutoffsForMan() {
    return [
        {
            minValue: 0,
            label: "Onder grenswaarde voor obesitas",
        },
        {
            minValue: 6.54,
            label: "Boven grenswaarde voor obesitas",
        },
    ];
}

function getWHt05RCutoffsForWoman() {
    return [
        {
            minValue: 0,
            label: "Onder grenswaarde voor obesitas",
        },
        {
            minValue: 6.31,
            label: "Boven grenswaarde voor obesitas",
        },
    ];
}

/**
 * Source: https://pubmed.ncbi.nlm.nih.gov/33518525/
 */
export function getWHt05RCutoffsForPerson({age, sex}) {
    const intAge = parseInt(age);

    if(sex === "M") {
        return getWHt05RCutoffsForMan();
    } else if(sex === "F") {
        return getWHt05RCutoffsForWoman();
    }

    throw new Error(`Sex "${sex}" not supported`);
}