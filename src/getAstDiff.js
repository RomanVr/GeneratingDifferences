import _ from 'lodash';

const getAstDiff = (beforeObj, afterObj) => {
  const iter = (bObj, aObj, astAcc) => {
    const keys = _.union(_.keys(bObj), _.keys(aObj));

    const reducer = (acc, key) => {
      // Ключ только у beforeObj
      if (_.has(bObj, key) && !_.has(aObj, key)) {
        if (_.isPlainObject(bObj[key])) {
          const property = { nameProperty: key, statusProperty: 'deleted', dataProperty: iter(bObj[key], {}, []) };
          return [...acc, property];
        }
        const property = { nameProperty: key, statusProperty: _.keys(aObj).length !== 0 ? 'deleted' : 'unchanged', dataProperty: bObj[key] };
        return [...acc, property];
      }
      // Ключ только у afterObj
      if (!_.has(bObj, key) && _.has(aObj, key)) {
        if (_.isPlainObject(aObj[key])) {
          const property = { nameProperty: key, statusProperty: 'added', dataProperty: iter({}, aObj[key], []) };
          return [...acc, property];
        }
        // console.log(`bObj !== {}: ${bObj !== {}}`);
        const property = { nameProperty: key, statusProperty: _.keys(bObj).length !== 0 ? 'added' : 'unchanged', dataProperty: aObj[key] };
        return [...acc, property];
      }
      // Если значение ключа типа Object, одинаковые у обоих
      if (_.isPlainObject(bObj[key]) && _.isPlainObject(aObj[key])) {
        const property = { nameProperty: key, statusProperty: 'unchanged', dataProperty: iter(bObj[key], aObj[key], []) };
        return [...acc, property];
      }
      // Если значение ключа типа Object только у before, у after тип string
      if (_.isPlainObject(bObj[key])) {
        const propertyBefore = { nameProperty: key, statusProperty: 'changed', dataProperty: iter(bObj[key], {}, []) };
        const propertyAfter = { nameProperty: key, statusProperty: 'added', dataProperty: aObj[key] };
        return [...acc, propertyBefore, propertyAfter];
      }
      // Если значение ключа типа Object только у after, у before тип String
      if (_.isPlainObject(aObj[key])) {
        const propertyBefore = { nameProperty: key, statusProperty: 'changed', dataProperty: bObj[key] };
        const propertyAfter = { nameProperty: key, statusProperty: 'added', dataProperty: iter({}, aObj[key], []) };
        return [...acc, propertyBefore, propertyAfter];
      }
      // Если значение ключа у всех типа string
      if (bObj[key] === aObj[key]) {
        const property = { nameProperty: key, statusProperty: 'unchanged', dataProperty: bObj[key] };
        return [...acc, property];
      }
      const propertyBefore = { nameProperty: key, statusProperty: 'changed', dataProperty: bObj[key] };
      const propertyAfter = { nameProperty: key, statusProperty: 'added', dataProperty: aObj[key] };
      return [...acc, propertyAfter, propertyBefore];
    };
    return keys.reduce(reducer, astAcc);
  };
  return iter(beforeObj, afterObj, []);
};

export default getAstDiff;
