import {Entity, model, property} from '@loopback/repository';

@model()
export class Session extends Entity {
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
  type: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  pkgs?: object[];


  constructor(data?: Partial<Session>) {
    super(data);
  }
}

export interface SessionRelations {
  // describe navigational properties here
}

export type SessionWithRelations = Session & SessionRelations;
