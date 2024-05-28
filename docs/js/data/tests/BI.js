import Test from "../../data-types/Test.js";
import { getTemplateContent } from "./utils.js";

function getQuestionsAndAnswers() {
    return [
        {
            label: "Incontinentie darmen (voorgaande week)",
            answers: [
                "De patiënt is incontinent",
                "Er gebeurt af en toe een ongelukje (max eenmaal per week)",
                "De patiënt is continent",
            ],
        },
        {
            label: "Incontinentie blaas (voorgaande week)",
            answers: [
                "De patiënt is incontinent of gebruikt een katheter en niet in staat daarmee om te gaan",
                "Er gebeurt af en toe een ongelukje (maximaal 1 keer per 24 uur)",
                "De patiënt is continent (gedurende meer dan 7 dagen)",
            ],
        },
        {
            label: "Uiterlijke verzorging",
            description: "verwijst naar persoonlijke hygiëne: tanden poetsen, gebit in en uit doen, haar verzorgen etc.",
            answers: [
                "De patiënt heeft hulp nodig bij de verzorging",
                "De patiënt is onafhankelijk; gezicht, haar, tanden, scheren, gezicht wassen",
            ],
        },
        {
            label: "Toiletgebruik",
            description: "de patiënt moet in staat zijn om naar toilet te  gaan, zich voldoende uit te kleden, schoon te maken, aan te kleden en weg te gaan",
            answers: [
                "De patiënt is afhankelijk bij toiletgebruik",
                "De patiënt heeft enige hulp nodig maar kan sommige dingen zelf",
                "De patiënt is onafhankelijk (op en af, uiten aankleden, afvegen)",
            ],
        },
        {
            label: "Eten",
            description: "anderen mogen het eten koken en opdienen, maar niet fijnmaken",
            answers: [
                "De patiënt is niet in staat om normaal voedsel te eten",
                "De patiënt heeft hulp nodig bij snijden, smeren van boter, enzovoort",
                "De patiënt is onafhankelijk",
            ],
        },
        {
            label: "Transfers",
            description: "de patiënt maakt de transfer van bed naar stoel en terug",
            answers: [
                "De patiënt is niet in staat om transfers te maken",
                "De patiënt heeft veel hulp nodig (1-2 mensen lichamelijk)",
                "De patiënt heeft weinig hulp nodig (met woorden of lichamelijk)",
                "De patiënt kan onafhankelijk transfers maken",
            ],
        },
        {
            label: "Mobiliteit",
            description: "verwijst naar zich kunnen verplaatsen in huis of op de afdeling; de patiënt mag een hulpmiddel gebruiken",
                answers: [
                "De patiënt kan zich niet verplaatsen",
                "De patiënt kan zich onafhankelijk met de rolstoel verplaatsen, inclusief hoeken, enzovoort",
                "De patiënt loopt met hulp van 1 persoon (met hulp van woorden of lichamelijk)",
                "De patiënt is onafhankelijk (maar mag gebruikmaken van een hulpmiddel, bijvoorbeeld een stok)",
            ],
        },
        {
            label: "Uit- en aankleden",
            answers: [
                "De patiënt is afhankelijk bij het uit- en aankleden",
                "De patiënt heeft hulp nodig maar kan ongeveer de helft zelf",
                "De patiënt kan onafhankelijk uit- en aankleden",
            ],
        },
        {
            label: "Traplopen",
            description: "om onafhankelijk te zijn, moet de patiënt zelf een hulpmiddel kunnen dragen",
            answers: [
                "De patiënt is niet in staat om te traplopen",
                "De patiënt heeft hulp nodig (met woorden, lichamelijk, het dragen van een hulpmiddel)",
                "De patiënt kan onafhankelijk naar boven en naar beneden traplopen",
            ],
        },
        {
            label: "Baden/douchen",
            description: "de patiënt moet zonder toezicht in en uit bad stappen en zichzelf wassen",
            answers: [
                "De patiënt is afhankelijk bij het baden/douchen",
                "De patiënt is onafhankelijk bij het baden/douchen",
            ],
        },
    ];
}

function renderQuestionAndAnswer(question, score) {
    function getRowClass() {
        if(parseInt(score) === question.answers.length - 1) {
            return "bg-success-subtle";
        }

        if(parseInt(score) === 0) {
            return "bg-danger-subtle";
        }

        return "bg-warning-subtle";
    }

    return `
<tr class="${getRowClass()}">
    <td class="fw-bold">${question.label}:</td>
    <td>${question.answers[score]}</td>
    <td>${question.description ?? ""}</td>
</tr>
    `.trim();
}

function getTotalScoreInterpretation(totalScore) {
    if(totalScore < 5) {
        return "Score 0-4 => De patiënt is volledig hulpbehoevend";
    }
    if(totalScore < 10) {
        return "Score 5-9 => De patiënt is ernstig hulpbehoevend";
    }
    if(totalScore < 15) {
        return "Score 10-14 => De patiënt heeft wel hulp nodig maar doet ook veel zelf";
    }
    if(totalScore < 20) {
        return "Score 15-19 => De patiënt is redelijk tot goed zelfstandig";
    }

    return "Score 20 => De patiënt is volledig zelfstandig in basale ADL en mobiliteit";
}

function displayResults(scores) {
    const splitScores = Array.from(scores.matchAll(/([0-9]+)/g)).map(item => item[0]);
    const questions = getQuestionsAndAnswers();

    const interpretationsPerQuestion = splitScores.map((score, index) => renderQuestionAndAnswer(questions[index], score));
    const totalScore = splitScores.reduce((previousValue, currentValue) => parseInt(currentValue) + previousValue, 0);

    document.getElementById("bi-interpretation-questions").innerHTML = ` 
<tr>
    <th>Item</th>
    <th>Uitslag</th>
    <th>Toelichting</th>
</tr>
${interpretationsPerQuestion.join("")}
    `.trim();

    document.getElementById("bi-total-score").innerHTML = `<span class="fs-3 fw-bold">${totalScore}</span>&nbsp;/&nbsp;20`;
    document.getElementById("bi-interpretation").innerText = getTotalScoreInterpretation(totalScore);

    document.getElementById("results-wrapper").classList.remove("d-none");
}

function hideResults() {
    document.getElementById("results-wrapper").classList.add("d-none");
    document.getElementById("bi-interpretation-questions").innerText = "";
    document.getElementById("bi-total-score").innerText = "";
}

const templateContent = await getTemplateContent("BI.html");

export default new Test({
    id: "bi",
    shortName: "BI",
    longName: "Barthel Index - 10 items",
    description: `
Met de Barthel Index kan de mate van (lichamelijke of verbale) hulp die een persoon nodig heeft om algemene dagelijkse (ADL) handelingen uit te voeren worden vastgesteld, ongeacht de onderliggende pathologie.
    `.trim(),
    templateContent,
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/barthel-index/",
    onStateChange: (newState) => {
        if(newState?.bi?.pre?.scores?.length) {
            displayResults(newState.bi.pre.scores);
        } else {
            hideResults();
        }
    }
});