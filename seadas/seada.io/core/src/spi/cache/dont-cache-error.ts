class DontCacheError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = 'DontCacheError';
        Object.setPrototypeOf(this, DontCacheError.prototype);
    }
}

export default DontCacheError;
