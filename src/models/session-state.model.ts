import {Entity, model, property, hasOne} from '@loopback/repository';
import {Package} from './package.model';

@model()
export class SessionState extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  sid: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @hasOne(() => Package)
  package: Package;

  constructor(data?: Partial<SessionState>) {
    super(data);
  }
}

export interface SessionStateRelations {
  // describe navigational properties here
}

export type SessionStateWithRelations = SessionState & SessionStateRelations;
