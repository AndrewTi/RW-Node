const messages = {
    101: 'Switching Protocols',
    102: 'Processing',
    200: 'Ok',
    201: 'Created',
    204: 'No Content',
    301: 'Moved Permanently',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Already Exists',
    500: 'Internal Server Error'
  };
  
  /**
   * @param {Number=} code
   * @param {String=} message
   */
module.exports = function CustomError(code = 500, message) {
    this.name = this.constructor.name;
    this.message = message || messages[code] || 'Unknown error';
    this.statusCode = code;
}