import fetch from 'isomorphic-unfetch';
import qs from 'qs';
import humps from 'humps';
import UrlUtils from '../utils/Url';
import { consoleLog, isObjectEmpty } from '../utils/Common';

export interface IFetchOption {
  body?: any;
  headers?: any;
  credentials?: string;
  method: any;
  timeout: number;
}

export enum RequestType {
  form = 1,
  multipart = 2,
}

export const Type = {
  form: 1,
  multipart: 2,
};

export class ApiManager {
  static Type = RequestType;
  debug: boolean = false;
  baseUrl: string;
  apiVersion: string;
  referer: any;
  cookie: any;

  constructor(baseUrl?: string, apiVersion?: string, referer?: any) {
    this.baseUrl = baseUrl;
    this.apiVersion = apiVersion || 'v1';
    this.referer = referer;
  }

  createUrl(ep: string, p: string = '', q: any = {}): string | Promise<any> {
    const { path, params } = UrlUtils.extractPathAndParams(ep);

    let url;
    try {
      url = UrlUtils.buildUrl(
        this.baseUrl,
        this.apiVersion,
        encodeURI(decodeURI(path)),
      );
    } catch (err) {
      consoleLog('Encoding endpoint error :', ep);
      consoleLog(err);
      return Promise.reject({
        message: 'TECHNICAL_ERROR',
      });
    }

    if (ep.startsWith('http')) {
      url = ep;
    }

    const allParams = { ...params, ...q };

    return UrlUtils.buildUrlWithParams(url.concat(p), allParams);
  }

  createFetchOption(
    url: string,
    m: string,
    b: any,
    t: RequestType,
    h: any,
  ): IFetchOption {
    const fetchOption: IFetchOption = {
      method: m,
      timeout: 10000,
    };
    if (b) {
      if (t === RequestType.multipart) {
        const data = new FormData();
        for (const key of Object.keys(b)) {
          data.append(key, b[key]);
        }
        fetchOption.body = data;
      } else {
        if (t === RequestType.form) {
          fetchOption.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
          };
          fetchOption.body = qs.stringify(b);
        } else {
          fetchOption.body = JSON.stringify(b);
          fetchOption.headers = { 'Content-Type': 'application/json' };
        }

        const { body } = fetchOption;
        fetchOption.headers['Content-Length'] = Buffer.byteLength(body);
      }
    }

    fetchOption.headers = Object.assign({}, fetchOption.headers, h, {
      cookie: this.cookie,
      referer: this.referer,
    });

    if (process.env.ROLE !== 'server') {
      fetchOption.credentials = 'same-origin';
    }
    if (process.env.NODE_ENV !== 'production') {
      if (this.debug) {
        consoleLog('API Call', url, fetchOption);
      }
    }
    return fetchOption;
  }

  fetch(options: {
    m?: string;
    ep?: string;
    p?: string;
    q?: any;
    b?: any;
    t?: any;
    h?: any;
  }) {
    if (!isObjectEmpty(options.b) && options.t !== RequestType.multipart) {
      options.b = humps.decamelizeKeys(options.b);
    }

    const { m, ep, p, q, b, t, h } = Object.assign(
      { m: 'GET', q: {} },
      options,
    );

    const url = this.createUrl(ep, p, q) as string;
    const fetchOption = this.createFetchOption(url, m, b, t, h);

    return fetch(url, fetchOption as any).then((res: any) => {
      if (res.status === 204) {
        return null;
      }

      if (res.ok) {
        // no response body
        if (res.status === 204) {
          return Promise.resolve();
        }

        // return res;
        return res.json().then((json: any) => {
          if (!isObjectEmpty(json)) {
            json = humps.camelizeKeys(json);
          }
          json._q = q;

          return json;
        });
      }

      // error
      // @ts-ignore
      return new Promise(async (resolve, reject) => {
        const errorResponse: any = {
          status: res.status,
        };
        res
          .json()
          .then((out: any) => {
            if (out.errorMessage) {
              errorResponse.message = out.errorMessage;
            } else if (out.message) {
              errorResponse.message = out.message;
            }

            if (out.status_code) {
              errorResponse.statusCode = out.status_code;
            }

            this.logError(res, errorResponse);

            reject(errorResponse);
          })
          .catch((err: any) => {
            this.logError(res, errorResponse, err);

            reject(errorResponse);
          });
      });
    });
  }

  logError(res: any, errorResponse: any, err?: any) {
    consoleLog('[ERROR][ApiManager][REQ]', res.url);
    consoleLog(errorResponse);

    if (err) {
      consoleLog(err);
    }
  }
}
export default new ApiManager();
