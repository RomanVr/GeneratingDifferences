function FormatException() {
  this.message = 'Not a valid file(s) format!';
  this.toString = function toString() {
    return this.message;
  };
}

export default FormatException;
