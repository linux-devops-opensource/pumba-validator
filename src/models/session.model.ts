import {Entity, model, property} from '@loopback/repository';

@model()
export class Session extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  sid: string;

  @property({
    type: 'number',
    required: true,
  })
  statusCode: number;

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
