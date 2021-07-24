import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  SessionState,
  Package,
} from '../models';
import {SessionStateRepository} from '../repositories';

export class SessionStatePackageController {
  constructor(
    @repository(SessionStateRepository) protected sessionStateRepository: SessionStateRepository,
  ) { }

  @get('/session-states/{id}/package', {
    responses: {
      '200': {
        description: 'SessionState has one Package',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Package),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Package>,
  ): Promise<Package> {
    return this.sessionStateRepository.package(id).get(filter);
  }

  @post('/session-states/{id}/package', {
    responses: {
      '200': {
        description: 'SessionState model instance',
        content: {'application/json': {schema: getModelSchemaRef(Package)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SessionSTodo
          schema: getModelSchemaRef(Package, {
            title: 'NewPackageInSessionState',
            exclude: ['name'],
            optional: ['sessionStateId']
          }),
        },
      },
    }) package: Omit<Package, 'name'>,
  ): Promise<Package> {
    return this.sessionStateRepository.package(id).create(package);
  }

  @patch('/session-states/{id}/package', {
    responses: {
      '200': {
        description: 'SessionState.Package PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Package, {partial: true}),
        },
      },
    })
    package: Partial<Package>,
    @param.query.object('where', getWhereSchemaFor(Package)) where?: Where<Package>,
  ): Promise<Count> {
    return this.sessionStateRepository.package(id).patch(package, where);
  }

  @del('/session-states/{id}/package', {
    responses: {
      '200': {
        description: 'SessionState.Package DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Package)) where?: Where<Package>,
  ): Promise<Count> {
    return this.sessionStateRepository.package(id).delete(where);
  }
}
