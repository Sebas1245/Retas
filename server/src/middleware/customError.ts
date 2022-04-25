class CustomError extends Error {
    statusCode: number;
    constructor (code: number, message: string, callstack: Error["stack"]) {
        super(message);
        this.name = 'Server Error';
        this.statusCode = code;
        if (callstack) {
            this.stack = callstack;
        }
    }
}

export default CustomError;