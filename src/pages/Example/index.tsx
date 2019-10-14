import React from 'react';
import { observer, inject } from 'mobx-react';
import css from './example.module.scss';
import { Grid, Container } from '@material-ui/core';
import Repositories from './components/repositorie';
import { IExampleStore } from 'stores/ExampleStore.d.ts';
import InfiniteScroll from 'react-infinite-scroller';

interface IExamplePageProp {
  example?: IExampleStore;
}

interface IExamplePageState {}

export class ExamplePage extends React.Component<
  IExamplePageProp,
  IExamplePageState
> {
  constructor(props: IExamplePageProp) {
    super(props);
  }
  loadItems = async () => {
    await this.props.example.loadMoreRepositories();
  };

  render() {
    const data = this.props.example.getInfosJs();
    return (
      <div className={css.exampleContainer}>
        <Container>
          <h3>Github repositories</h3>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems.bind(this)}
            hasMore={true || false}
            loader={
              // <Loader key={0}/>
              <span key={0}>Loading...</span>
            }
          >
            <Grid container spacing={3}>
              {data.map((item, index) => {
                return (
                  <Repositories
                    key={index}
                    title={item.name}
                    description={item.description}
                    language={item.language}
                    star={item.stargazersCount}
                    forks={item.forksCount}
                    htmlUrl ={item.htmlUrl}
                  />
                );
              })}
            </Grid>
          </InfiniteScroll>
        </Container>
      </div>
    );
  }
}

export default inject('example')(observer(ExamplePage));
