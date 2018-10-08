
import fs from 'fs';
import getAstdiff from './getAstDiff';
import render from './render';

const gendiffFunction = (path1, path2) => {
  const dataBefore = fs.readFileSync(path1, 'utf8');
  const dataAfter = fs.readFileSync(path2, 'utf8');
  const beforeObj = JSON.parse(dataBefore);
  const afterObj = JSON.parse(dataAfter);
  const astDiff = getAstdiff(beforeObj, afterObj);
  return render(astDiff);
};

export default gendiffFunction;
