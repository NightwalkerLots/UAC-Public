export function getFunctionName(fn) {
    return `${fn.name || '<anonymous>'} (${fn.fileName ? `defined at ${fn.fileName}:${fn.lineNumber}` : 'native'})`;
}

export function getStackTrace(deleteCount = 0) {
    return new Error().stack?.replace(new RegExp(`^(.*(\n|$)){0,${deleteCount + 1}}`), '') ?? '';
}