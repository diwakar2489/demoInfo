class ApiError {
    constructor(code, message) {
      this.code = code;
      this.message = message;
    }
  
    static badRequest(msg) {
      return new ApiError(400, msg);
    }
    static internal(msg) {
      return new ApiError(500, msg);
    }
    static notFound(msg) {
        return new ApiError(404, msg);
    }
    static DBQueryError(msg) {
        return new ApiError(202, msg);
    }
    static userNotFound(msg) {
        return new ApiError(201, msg);
    }
    static OK(msg) {
        return new ApiError(200, msg);
    }
  }
  
  module.exports = ApiError;