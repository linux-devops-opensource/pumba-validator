import {DefaultCrudRepository} from '@loopback/repository';
import {Session, SessionRelations} from '../models';
import {SessionsDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SessionRepository extends DefaultCrudRepository<
  Session,
  typeof Session.prototype.sid,
  SessionRelations
> {
  constructor(
    @inject('datasources.sessionsDS') dataSource: SessionsDsDataSource,
  ) {
    super(Session, dataSource);
  }
}
