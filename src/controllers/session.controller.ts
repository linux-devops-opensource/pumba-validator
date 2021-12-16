import {inject} from '@loopback/core';
import {
  FilterExcludingWhere,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Session} from '../models';
import {SessionRepository} from '../repositories';
import {K8S} from '../services';

export class SessionController {
  constructor(
    @repository(SessionRepository)
    public sessionRepository : SessionRepository,
    @inject('services.K8S')
    protected k8sService: K8S,
  ) {}

  @post('/session')
  @response(200, {
    description: 'Session model instance',
    content: {'application/json': {schema: getModelSchemaRef(Session)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Session, {
            title: 'NewSession',
          }),
        },
      },
    })
    session: Session,
  ): Promise<Session> {
    const data = {
      "apiVersion": "batch/v1",
      "kind": "Job",
      "metadata": {
        "name": "validator-" + session.type + "-" + session.sid
      },
      "spec": {
        "template": {
          "spec": {
            "containers": [{
              "name": "validator-" + session.type + "-" + session.sid,
              "image": 'gcr.io/sodium-inverter-285420/pumba-' + session.type + '-validator:test',
              "env": [{
                "name": "SID",
                "value": session.sid
              },
              {
                "name": "DEBUG",
                "value": "debug:*"
              }],
            }],
            "restartPolicy": "Never"
          }
        }
      }
    }

    await this.k8sService.startJob(data)
    return this.sessionRepository.create(session);
  }

  @get('/sessions/{id}')
  @response(200, {
    description: 'Session model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Session, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Session, {exclude: 'where'}) filter?: FilterExcludingWhere<Session>
  ): Promise<Session> {
    return this.sessionRepository.findById(id, filter);
  }

  @put('/sessions/{id}')
  @response(204, {
    description: 'Session PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() session: Session,
  ): Promise<void> {
    await this.sessionRepository.replaceById(id, session);
  }

  @del('/sessions/{id}')
  @response(204, {
    description: 'Session DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sessionRepository.deleteById(id);
  }
}
