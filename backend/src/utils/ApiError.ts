class ApiError extends Error {
    public statusCode: number;
    public data: unknown;
    public message: string;
    public success: boolean;
    public errors: unknown;

    constructor(statusCode: number, message: string = "Something went wrong", data?: unknown , errors?: unknown , stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = false;
    this.errors = errors;

    if(stack) {
        this.stack = stack;
    } else {
        Error.captureStackTrace(this, this.constructor);
    }

    }
}
export { ApiError }