import _ from 'lodash';
import prettyRender from './prettyRender';
import plainTextRender from './plainTextRender';

const mappingToRender = {
  pretty: prettyRender,
  plain: plainTextRender,
  json: JSON.stringify,
};

const renderers = (ast, typeRender) => {
  if (!_.has(mappingToRender, typeRender)) {
    throw new Error(`not possible to render in type presentation: ${typeRender}`);
  }
  return mappingToRender[typeRender](ast);
};

export default renderers;
