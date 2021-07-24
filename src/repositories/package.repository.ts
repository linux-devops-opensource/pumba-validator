import {DefaultCrudRepository} from '@loopback/repository';
import {Package, PackageRelations} from '../models';
import {SessionStateDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PackageRepository extends DefaultCrudRepository<
  Package,
  typeof Package.prototype.name,
  PackageRelations
> {
  constructor(
    @inject('datasources.sessionStateDS') dataSource: SessionStateDsDataSource,
  ) {
    super(Package, dataSource);
  }
}
