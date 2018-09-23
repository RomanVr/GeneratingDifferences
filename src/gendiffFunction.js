
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import getAstdiff from './getAstDiff';
import render from './render';

const gendiffFunction = (path1, path2) => {
  const dataBefore = fs.readFileSync(path1, 'utf8');
  const dataAfter = fs.readFileSync(path2, 'utf8');
  const extentionFileBefore = path.extname(path1).substring(1);
  const extentionFileAfter = path.extname(path2).substring(1);
  const beforeObj = parse(extentionFileBefore, dataBefore);
  const afterObj = parse(extentionFileAfter, dataAfter);
  const astDiff = getAstdiff(beforeObj, afterObj);
  return render(astDiff);
};

export default gendiffFunction;
