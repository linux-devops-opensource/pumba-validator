import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {SessionState, SessionStateRelations, Package} from '../models';
import {SessionStateDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PackageRepository} from './package.repository';

export class SessionStateRepository extends DefaultCrudRepository<
  SessionState,
  typeof SessionState.prototype.sid,
  SessionStateRelations
> {

  public readonly package: HasOneRepositoryFactory<Package, typeof SessionState.prototype.sid>;

  constructor(
    @inject('datasources.sessionStateDS') dataSource: SessionStateDsDataSource, @repository.getter('PackageRepository') protected packageRepositoryGetter: Getter<PackageRepository>,
  ) {
    super(SessionState, dataSource);
    this.package = this.createHasOneRepositoryFactoryFor('package', packageRepositoryGetter);
    this.registerInclusionResolver('package', this.package.inclusionResolver);
  }
}
