export default class extends Error {
  constructor(typeData) {
    super(`not possible to parse type: ${typeData}`);

    this.name = this.constructor.name;
    this.stack = (new Error()).stack;
    this.typeData = typeData;
  }
}
