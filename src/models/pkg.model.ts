import {Model, model, property} from '@loopback/repository';

@model()
export class Pkg extends Model {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  name?: string;

  @property({
    type: 'number',
    required: true,
  })
  statusCode: number;

  @property({
    type: 'string',
    default: "no status",
  })
  msg?: string;


  constructor(data?: Partial<Pkg>) {
    super(data);
  }
}

export interface PkgRelations {
  // describe navigational properties here
}

export type PkgWithRelations = Pkg & PkgRelations;
