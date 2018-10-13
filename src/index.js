import fs from 'fs';
import path from 'path';
import getAstdiff from './getAstDiff';
import render from './renderers';
import parse from './parsers';

const gendiffProperties = (path1, path2, typeOutput = 'pretty') => {
  const dataBefore = fs.readFileSync(path1, 'utf8');
  const dataAfter = fs.readFileSync(path2, 'utf8');
  const typeDataBefore = path.extname(path1).substring(1);
  const typeDataAfter = path.extname(path2).substring(1);
  const beforeObj = parse(typeDataBefore, dataBefore);
  const afterObj = parse(typeDataAfter, dataAfter);
  const astDiff = getAstdiff(beforeObj, afterObj);
  return render(astDiff, typeOutput);
};

export default gendiffProperties;
