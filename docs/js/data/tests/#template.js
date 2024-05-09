import Test from "../../data-types/Test.js";
import { getTemplateContent } from "./utils.js";

const templateContent = await getTemplateContent("XXX.html");

export default new Test({
    id: "",
    shortName: "",
    longName: "",
    description: `

    `.trim(),
    templateContent,
    externalSourceUrl: "",
    onStateChange: (newState) => {
    }
});