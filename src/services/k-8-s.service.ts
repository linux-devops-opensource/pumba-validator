import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {K8SDataSource} from '../datasources';

export interface K8S {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  startJob(data: object): Promise<object>;
}

export class K8SProvider implements Provider<K8S> {
  constructor(
    // k8s must match the name property in the datasource json file
    @inject('datasources.k8s')
    protected dataSource: K8SDataSource = new K8SDataSource(),
  ) {}

  value(): Promise<K8S> {
    return getService(this.dataSource);
  }
}
