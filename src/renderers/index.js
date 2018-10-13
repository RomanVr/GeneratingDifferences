import _ from 'lodash';
import jsonRender from './jsonRender';
import plainTextRender from './plainTextRender';

const mappingToRender = {
  json: jsonRender,
  plain: plainTextRender,
};

const renderers = (ast, typeRender) => {
  if (!_.has(typeRender, mappingToRender)) {
    throw new Error(`not possible to render in type presentation: ${typeRender}`);
  }
  return mappingToRender[typeRender](ast);
};

export default renderers;
