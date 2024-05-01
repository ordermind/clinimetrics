import Test from "../../data-types/Test.js";

const description = `

`.trim();

export default new Test({
    id: "",
    shortName: "",
    longName: "",
    description,
    externalSourceUrl: "",
    getformContentHTML: () => {
        return `

        `.trim();
    },
    onStateChange: (newState) => {
    }
});