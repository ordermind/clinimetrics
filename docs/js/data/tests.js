export const arrTests = await Promise.all([
    "6MWT.js",
].map(filename => import("./tests/" + filename).then(module => module.default)))
.then(tests => tests.sort((a, b) => a.title.localeCompare(b.title)));


export const objTests = arrTests.reduce((previousValue, currentValue) => ({ ...previousValue, [currentValue.id]: currentValue}), {});