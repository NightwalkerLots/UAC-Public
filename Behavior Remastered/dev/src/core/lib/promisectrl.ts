export default class PromiseController<T> {
    constructor() {
        this.promise = new Promise((res, rej) => {
            this.resolve = res
            this.reject = rej
        })
    }

    declare resolve: (value: T) => void
    declare reject: (reason?: any) => void

    promise: Promise<T>
}
