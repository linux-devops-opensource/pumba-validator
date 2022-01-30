import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

require('dotenv').config();

const BASE_URL = process.env.K8S_BASE_URL;
const JOB_URL = process.env.JOB_URL;

if (BASE_URL == undefined || JOB_URL == undefined) {
	throw new Error('base urls are undefined somehow -- k8s ds');
}

const config = {
	name: 'k8s',
	connector: 'rest',
	baseURL: BASE_URL,
	crud: false,
	options: {
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			Authorization: process.env.K8S_TOKEN
		},
		strictSSL: false
	},
	operations: [
		{
			template: {
				method: 'POST',
				url: BASE_URL + JOB_URL,
				body: '{data}'
			},
			functions: {
				startJob: [ 'data' ]
			}
		}
	]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class K8SDataSource extends juggler.DataSource implements LifeCycleObserver {
	static dataSourceName = 'k8s';
	static readonly defaultConfig = config;

	constructor(
		@inject('datasources.config.k8s', { optional: true })
		dsConfig: object = config
	) {
		super(dsConfig);
	}
}
