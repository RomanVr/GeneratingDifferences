import _ from 'lodash';

const signToRender = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const render = (ast) => {
  const iter = (astIter, deep) => astIter.map((item) => {
    const data = _.isArray(item.data) ? `{${iter(item.data, `${deep}    `)}\n${deep}    }` : item.data;
    return `\n ${deep} ${signToRender[item.sign]} ${item.name}: ${data}`;
  }).join('');
  return `{${iter(ast, '')}\n}\n`;
};

export default render;
