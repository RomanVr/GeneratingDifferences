import _ from 'lodash';

const getAstDiff = (beforeObj, afterObj) => {
  const iter = (bObj, aObj, astAcc) => {
    const keys = _.union(_.keys(bObj), _.keys(aObj));

    const reducer = (acc, key) => {
      // Ключ только у beforeObj
      if (_.has(bObj, key) && !_.has(aObj, key)) {
        if (_.isPlainObject(bObj[key])) {
          const newItemObj = { name: key, sign: '-', data: iter(bObj[key], {}, []) };
          return [...acc, newItemObj];
        }
        const newItemObj = { name: key, sign: _.keys(aObj).length !== 0 ? '-' : ' ', data: bObj[key] };
        return [...acc, newItemObj];
      }
      // Ключ только у afterObj
      if (!_.has(bObj, key) && _.has(aObj, key)) {
        if (_.isPlainObject(aObj[key])) {
          const newItemObj = { name: key, sign: '+', data: iter({}, aObj[key], []) };
          return [...acc, newItemObj];
        }
        // console.log(`bObj !== {}: ${bObj !== {}}`);
        const newItemObj = { name: key, sign: _.keys(bObj).length !== 0 ? '+' : ' ', data: aObj[key] };
        return [...acc, newItemObj];
      }
      // Если значение ключа типа Object
      if (_.isPlainObject(bObj[key]) && _.isPlainObject(aObj[key])) {
        const newItemObj = { name: key, sign: ' ', data: iter(bObj[key], aObj[key], []) };
        return [...acc, newItemObj];
      }
      // Если значение ключа типа Object только у before
      if (_.isPlainObject(bObj[key])) {
        const newItemObjBefore = { name: key, sign: '-', data: iter(bObj[key], {}, []) };
        const newItemObjAfter = { name: key, sign: '+', data: aObj[key] };
        return [...acc, newItemObjBefore, newItemObjAfter];
      }
      // Если значение ключа типа Object только у after
      if (_.isPlainObject(aObj[key])) {
        const newItemObjBefore = { name: key, sign: '-', data: bObj[key] };
        const newItemObjAfter = { name: key, sign: '+', data: iter({}, aObj[key], []) };
        return [...acc, newItemObjBefore, newItemObjAfter];
      }
      // Если значение ключа у всех типа string
      if (bObj[key] === aObj[key]) {
        const newItemObj = { name: key, sign: ' ', data: bObj[key] };
        return [...acc, newItemObj];
      }
      const newItemObjBefore = { name: key, sign: '-', data: bObj[key] };
      const newItemObjAfter = { name: key, sign: '+', data: aObj[key] };
      return [...acc, newItemObjAfter, newItemObjBefore];
    };
    return keys.reduce(reducer, astAcc);
  };
  return iter(beforeObj, afterObj, []);
};

export default getAstDiff;
