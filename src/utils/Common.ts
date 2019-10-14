import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

export function consoleLog(...logs: any[]) {
  // tslint:disable-next-line
  console.log(...logs);
}



export function isObjectEmpty(obj: any) {
  return isNil(obj) || isEmpty(obj);
}

export function isNull(obj: any) {
  return isNil(obj);
}

export function isArrayEmpty(obj: any) {
  return !(obj && Array.isArray(obj) && obj.length);
}
