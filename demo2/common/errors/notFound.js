class NotFound extends Error {
    constructor(statusCode, error) { 
        super();
        this.statusCode = statusCode || 404;
        this.error = error || 'Not found';
    }
};

module.exports = NotFound;

