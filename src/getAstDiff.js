import _ from 'lodash';

const getAstDiff = (beforeObj, afterObj) => {
  const iter = (bObj, aObj, astAcc) => {
    const keys = _.union(_.keys(bObj), _.keys(aObj));

    const reducer = (acc, key) => {
      // Ключ только у beforeObj
      if (_.has(bObj, key) && !_.has(aObj, key)) return [...acc, { nameProperty: key, statusProperty: 'deleted', dataProperty: bObj[key] }];
      // Ключ только у afterObj
      if (!_.has(bObj, key) && _.has(aObj, key)) return [...acc, { nameProperty: key, statusProperty: 'added', dataProperty: aObj[key] }];
      // Если значение ключа типа Object, одинаковые у обоих
      if (_.isPlainObject(bObj[key]) && _.isPlainObject(aObj[key])) return [...acc, { nameProperty: key, statusProperty: 'unchanged', dataProperty: iter(bObj[key], aObj[key], []) }];
      // Если значение ключа у всех типа string
      if (bObj[key] === aObj[key]) return [...acc, { nameProperty: key, statusProperty: 'unchanged', dataProperty: bObj[key] }];
      // В остальных случаях у свойства изменились данные
      return [...acc, {
        nameProperty: key, statusProperty: 'changed', beforeProperty: bObj[key], afterProperty: aObj[key],
      }];
    };
    return keys.reduce(reducer, astAcc);
  };
  return iter(beforeObj, afterObj, []);
};

export default getAstDiff;
