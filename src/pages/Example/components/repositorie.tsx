import React from 'react';
import css from '../example.module.scss';
import { Grid } from '@material-ui/core';
import { GitHub, Code, Stars } from '@material-ui/icons';
import NumberFormat from 'react-number-format';

interface IRepositoriesProp {
  title: string;
  description: string;
  star: number;
  forks: number;
  language: string;
  htmlUrl : string;
}

interface IRepositoriesState {}

export class Repositories extends React.Component<
  IRepositoriesProp,
  IRepositoriesState
> {
  render() {
    const { title, description, star, forks, language,htmlUrl } = this.props;
    return (
      <Grid item md={6} xs={12}>
        <div className={css.item}>
          <div className={css.title}>
            <GitHub fontSize="small" /> <a href={htmlUrl} target="_blank">{title}</a>
          </div>
          <div className={css.description}>
            <span>{description}</span>
          </div>
          <div className={css.info}>
            <Grid container>
              <Grid item md={4} xs={4}>
                <Code fontSize="small" />&nbsp; <span>{language}</span>
              </Grid>
              <Grid item md={4} xs={4}>
                <Stars fontSize="small" />&nbsp;
                  <NumberFormat
                    value={star}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={value => <span>{value}</span>}
                  />
              </Grid>
              <Grid item md={4} xs={4}>
                <GitHub fontSize="small" />&nbsp;
                <NumberFormat
                    value={forks}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={value => <span>{value}</span>}
                  />
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
    );
  }
}

export default Repositories;
