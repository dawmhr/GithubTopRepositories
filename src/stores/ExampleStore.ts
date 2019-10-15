import { observable, toJS } from 'mobx';
import { IExampleStore, IExampleModel } from './ExampleStore.d';
import { get } from 'lodash';
import Api from '../api/RepositorieApi';
import moment from 'moment';

export class ExampleStore implements IExampleStore {
  @observable info: IExampleModel;
  @observable infos: IExampleModel[];
  @observable totalCount: number;
  @observable page: number;
  @observable hasMoreRepo: boolean;

  constructor() {
    this.info = {
      name: '',
      description: '',
      forksCount: 0,
      language: '',
      stargazersCount: 0,
      htmlUrl: ''
    };
    this.infos = [] as IExampleModel[];
    this.hasMoreRepo = true;
    this.totalCount = 0;
    this.page = 1;
  }

  async loadMoreRepositories() {
    try {
      if (!this.hasMoreRepo) {
        return;
      }
      const date = moment()
        .add(-30, 'days')
        .format('YYYY-MM-DD');
      const result = await Api.getRepositories(this.page, date);
      if (result) {
        this.totalCount = result.totalCount;
        this.hasMoreRepo = this.page * 10 > this.totalCount ? false : true;
        const products = get(result, 'items', []);
        this.infos = this.infos.concat(products);
        this.page = this.page + 1;
      }
    } catch (error) {}
  }

  getInfosJs() {
    return toJS(this.infos);
  }

  getHasMoreRepoJs() {
    return toJS(this.hasMoreRepo);
  }
}

export default new ExampleStore();
