import ApiManager from './ApiManager';
import { Http } from '../definitions/httpMethod';

export class RepositorieApi {
  getRepositories(
    page: number,
    date : any,
  ) {
    return ApiManager.fetch({
      m: Http.GET,
      ep : `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${page}&per_page=10`
    });
  }

}

export default new RepositorieApi();
