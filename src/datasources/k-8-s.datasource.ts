import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

require('dotenv').config()

const BASE_URL = process.env.K8S_BASE_URL ?? process.env.DEFAULT_K8S_BASE_URL ?? 'variable not defined'
const JOB_URL = process.env.K8S_JOB_URL ?? process.env.DEFAULT_K8S_JOB_API ?? 'variable not defined'

const config = {
  name: 'k8s',
  connector: 'rest',
  baseURL: BASE_URL,
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'Authorization': process.env.K8S_TOKEN,
    },
  },
  operations: [
    {
      template: {
        method: 'POST',
        url: BASE_URL + JOB_URL,
        body: 'data'
      },
      functions: {
        startJob: ['data'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class K8SDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'k8s';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.k8s', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
