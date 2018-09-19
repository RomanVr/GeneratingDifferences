function PathToFileException() {
  this.message = 'The path to the file(s) is not correct!';
  this.toString = function toString() {
    return this.message;
  };
}

export default PathToFileException;
