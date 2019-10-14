import flow from 'lodash/flow';
import qs from 'qs';

export default class UrlUtils {
  static buildUrl(...urls: string[]) {
    return urls.map(this.stripLeadingAndTrailingSlash).join('/');
  }

  static buildUrlWithParams(path: string, query: any, locale?: string) {
    const params = query;
    if (locale) {
      params.locale = locale;
    }

    const queryString = qs.stringify(params, {
      arrayFormat: 'repeat',
      encode: true,
    });
    return queryString ? `${path}?${queryString}` : path;
  }

  static getUrlWithoutTrailingSlash(url: string) {
    if (!url) {
      return '';
    }

    const index = url.length - 1;
    if (url[index] === '/') {
      return url.substring(0, index);
    }
    return url;
  }

  static getUrlWithoutLeadingSlash(url: string) {
    if (!url) {
      return '';
    }

    if (url[0] === '/') {
      return url.substring(1);
    }

    return url;
  }

  static stripLeadingAndTrailingSlash(url: string) {
    if (!url) {
      return '';
    }

    return flow(
      UrlUtils.getUrlWithoutLeadingSlash,
      UrlUtils.getUrlWithoutTrailingSlash,
    )(url);
  }

  static extractPathAndParams(url: string) {
    if (!url) {
      return { path: '', params: {} };
    }

    const urls = url.split('?');
    const path = urls[0];
    const params = qs.parse(urls[1]);

    return { path: `/${this.stripLeadingAndTrailingSlash(path)}`, params };
  }

  static createUrl(
    pathWithParams: string,
    additionalPath: string = '',
    q: any = {},
  ) {
    const { path, params } = this.extractPathAndParams(pathWithParams);
    const allParams = { ...params, ...q };

    return this.buildUrlWithParams(path.concat(additionalPath), allParams);
  }
}
