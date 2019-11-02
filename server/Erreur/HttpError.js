class HttpError extends Error {

    constructor(code,message) {
        super(message)
        this.name = this.constructor.name;
        this.status = code;
    }

}

module.exports = HttpError 