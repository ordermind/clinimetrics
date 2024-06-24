function getFatPercentageCutoffsForMan(age) {
    if(age < 20) {
        return []; // No norm values yet for children
    }

    if(age < 40) {
        return [
            {
                minValue: 0,
                label: "Ondergewicht",
            },
            {
                minValue: 7,
                label: "Gezond gewicht",
            },
            {
                minValue: 20,
                label: "Overgewicht",
            },
            {
                minValue: 25,
                label: "Ernstig overgewicht (obesitas)",
            },
        ];
    }

    if(age < 60) {
        return [
            {
                minValue: 0,
                label: "Ondergewicht",
            },
            {
                minValue: 10.5,
                label: "Gezond gewicht",
            },
            {
                minValue: 22,
                label: "Overgewicht",
            },
            {
                minValue: 27.5,
                label: "Ernstig overgewicht (obesitas)",
            },
        ];
    }


    return [
        {
            minValue: 0,
            label: "Ondergewicht",
        },
        {
            minValue: 12,
            label: "Gezond gewicht",
        },
        {
            minValue: 25,
            label: "Overgewicht",
        },
        {
            minValue: 30,
            label: "Ernstig overgewicht (obesitas)",
        },
    ];
}

function getFatPercentageCutoffsForWoman(age) {
    if(age < 20) {
        return []; // No norm values yet for children
    }

    if(age < 40) {
        return [
            {
                minValue: 0,
                label: "Ondergewicht",
            },
            {
                minValue: 21,
                label: "Gezond gewicht",
            },
            {
                minValue: 33,
                label: "Overgewicht",
            },
            {
                minValue: 39.5,
                label: "Ernstig overgewicht (obesitas)",
            },
        ];
    }

    if(age < 60) {
        return [
            {
                minValue: 0,
                label: "Ondergewicht",
            },
            {
                minValue: 23,
                label: "Gezond gewicht",
            },
            {
                minValue: 34,
                label: "Overgewicht",
            },
            {
                minValue: 40,
                label: "Ernstig overgewicht (obesitas)",
            },
        ];
    }


    return [
        {
            minValue: 0,
            label: "Ondergewicht",
        },
        {
            minValue: 24,
            label: "Gezond gewicht",
        },
        {
            minValue: 36,
            label: "Overgewicht",
        },
        {
            minValue: 41.5,
            label: "Ernstig overgewicht (obesitas)",
        },
    ];
}

/**
 * Sources:
 * - https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2022.906659/full
 */
export function getFatPercentageCutoffsForPerson({age, sex}) {
    const intAge = parseInt(age);

    if(sex === "M") {
        return getFatPercentageCutoffsForMan(intAge);
    } else if(sex ==="F") {
        return getFatPercentageCutoffsForWoman(intAge);
    }

    throw new Error(`Sex "${sex}" not supported`);
}