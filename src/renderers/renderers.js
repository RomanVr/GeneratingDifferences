import jsonRender from './jsonRender';
import plainTextRender from './plainTextRender';

const mappingToRender = {
  json: jsonRender,
  plain: plainTextRender,
};

const renderers = (ast, typeRender) => mappingToRender[typeRender](ast);

export default renderers;
