function getWHtRCutoffsForChild() {
    return [
        {
            minValue: 0,
            label: "Ernstig ondergewicht",
        },
        {
            minValue: 0.35,
            label: "Ondergewicht",
        },
        {
            minValue: 0.46,
            label: "Gezond gewicht",
        },
        {
            minValue: 0.52,
            label: "Overgewicht",
        },
        {
            minValue: 0.64,
            label: "Ernstig overgewicht (obesitas)",
        },
    ];
}

function getWHtRCutoffsForMan() {
    return [
        {
            minValue: 0,
            label: "Ernstig ondergewicht",
        },
        {
            minValue: 0.35,
            label: "Ondergewicht",
        },
        {
            minValue: 0.43,
            label: "Gezond gewicht",
        },
        {
            minValue: 0.53,
            label: "Overgewicht",
        },
        {
            minValue: 0.58,
            label: "Groot overgewicht",
        },
        {
            minValue: 0.63,
            label: "Ernstig overgewicht (obesitas)",
        },
    ];
}

function getWHtRCutoffsForWoman() {
    return [
        {
            minValue: 0,
            label: "Ernstig ondergewicht",
        },
        {
            minValue: 0.35,
            label: "Ondergewicht",
        },
        {
            minValue: 0.42,
            label: "Gezond gewicht",
        },
        {
            minValue: 0.49,
            label: "Overgewicht",
        },
        {
            minValue: 0.54,
            label: "Groot overgewicht",
        },
        {
            minValue: 0.58,
            label: "Ernstig overgewicht (obesitas)",
        },
    ];
}

/**
 * Source: https://www.mdapp.co/waist-to-height-ratio-whtr-calculator-433/
 */
export function getWHtRCutoffsForPerson({age, sex}) {
    const intAge = parseInt(age);

    if(intAge < 15) {
        return getWHtRCutoffsForChild();
    }

    if(sex === "M") {
        return getWHtRCutoffsForMan();
    } else if(sex === "F") {
        return getWHtRCutoffsForWoman();
    }

    throw new Error(`Sex "${sex}" not supported`);
}
