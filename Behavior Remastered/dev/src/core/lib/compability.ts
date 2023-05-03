import sdefault from "./sdefault.js"

export const compability = {
    disableMessageCancel: false,
    integrateMessageTargets: false
}

sdefault.addEventListener('save', ({data}) => {
    data.compability = compability
})

sdefault.addEventListener('load', ({data}) => {
    if (!data.compability) return
    Object.assign(compability, data.compability)
})

