import { Moment } from 'moment';

export interface IExampleModel {
  name: string;
  description: string;
  stargazersCount: any;
  forksCount: any;
  language: string;
}

export interface IExampleStore {
  getInfosJs: () => IExampleModel[];
  loadMoreRepositories: () => any;
}
