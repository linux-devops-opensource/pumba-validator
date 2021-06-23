import {
  FilterExcludingWhere,
  repository,
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Session} from '../models';
import {SessionRepository} from '../repositories';

const axios = require('axios').default;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export class SessionsController {
  constructor(
    @repository(SessionRepository)
    public sessionRepository: SessionRepository,
  ) { }

  @post('/session', {
    responses: {
      '200': {
        description: 'Session model instance',
        content: {'application/json': {schema: getModelSchemaRef(Session)}},
      }
    },
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
    let type = session.type
    let data = {
      "apiVersion": "batch/v1",
      "kind": "Job",
      "metadata": {
        "name": "validator-" + type + "-" + session.sid
      },
      "spec": {
        "template": {
          "spec": {
            "containers": [{
              "name": "validator-" + type + "-" + session.sid,
              "image": 'gcr.io/sodium-inverter-285420/pumba-' + type + '-validator:test',
              "env": [{
                "name": "SID",
                "value": session.sid
              },{
                "name": "DEBUG",
                "value": "debug:*"
              }],
            }],
            "restartPolicy": "Never"
          }
        }
      }
    }
    var config = {
      method: 'post',
      url: 'https://51.138.70.243/apis/batch/v1/namespaces/pumba/jobs',
      headers: {
        'Authorization': process.env.K8STOKEN,
        'Content-Type': 'application/json'
      },
      data : data
    };
    await axios(config)
      .then((response: any) => {
        console.log(response.status);
      })
      .catch((error: any) => {
        console.log(error.response.data.message);
        throw new HttpErrors.BadRequest(error.response.data.message)
      });
      return this.sessionRepository.create(session);
    }

  @get('/session/{id}', {
    responses: {
      '200': {
        description: 'Session model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Session, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Session, {exclude: 'where'}) filter?: FilterExcludingWhere<Session>
  ): Promise<Session> {
    return this.sessionRepository.findById(id, filter);
  }

  @put('/session/{id}', {
    responses: {
      '204': {
        description: 'Session PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() session: Session,
  ): Promise<void> {
    await this.sessionRepository.replaceById(id, session);
  }

  @del('/session/{id}', {
    responses: {
      '204': {
        description: 'Session DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sessionRepository.deleteById(id);
  }
}
