export const arrTests = await Promise.all([
    "6MWT.js",
    "BBS.js",
    "BodyInfo.js",
    "DEMMI.js",
    "MI.js",
    "SRT.js",
    "SWT.js",
    "TCT.js",
    "TIS.js",
].map(filename => import("./tests/" + filename).then(module => module.default)))
.then(tests => tests.sort((a, b) => a.longName.localeCompare(b.longName)));

export const objTests = arrTests.reduce((previousValue, currentValue) => ({ ...previousValue, [currentValue.id]: currentValue}), {});