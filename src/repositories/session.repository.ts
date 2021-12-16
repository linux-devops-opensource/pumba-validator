import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SessionDsDataSource} from '../datasources';
import {Session, SessionRelations} from '../models';

export class SessionRepository extends DefaultCrudRepository<
  Session,
  typeof Session.prototype.sid,
  SessionRelations
> {
  constructor(
    @inject('datasources.sessionDS') dataSource: SessionDsDataSource,
  ) {
    super(Session, dataSource);
  }
}
