import Test from "../../data-types/Test.js";

export default new Test({
    id: "",
    shortName: "",
    longName: "",
    description: `

    `.trim(),
    externalSourceUrl: "",
    getformContentHTML: () => {
        return `

        `.trim();
    },
    onStateChange: (newState) => {
    }
});