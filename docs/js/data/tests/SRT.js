import Test from "../../data-types/Test.js";
import { getTemplateContent } from "./utils.js";

const templateContent = await getTemplateContent("SRT.html");

export default new Test({
    id: "srt",
    shortName: "SRT",
    longName: "Steep Ramp Test",
    description: `
De Steep Ramp Test (SRT) is een korte <strong>maximale inspanningstest</strong> op een geijkte fietsergometer om de <strong>aerobe capaciteit</strong> te meten. Vanuit het testresultaat kan een schatting worden verkregen van de VO2max en het maximaal inspanningsvermogen (MSEC).
    `.trim(),
    templateContent,
    externalSourceUrl: "https://meetinstrumentenzorg.nl/instrumenten/steep-ramp-test/",
    onStateChange: (newState) => {
    }
});