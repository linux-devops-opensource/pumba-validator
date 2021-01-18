import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {Pkg, Session} from '../models';
import {SessionRepository} from '../repositories';

const axios = require('axios').default;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export class SessionsController {
  constructor(
    @repository(SessionRepository)
    public sessionRepository: SessionRepository,
  ) { }

  @post('/sessions', {
    responses: {
      '200': {
        description: 'Session model instance',
        content: {'application/json': {schema: getModelSchemaRef(Session)}},
      },
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
    let type:any = (Object.values(session.pkgs[0])[0])
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
              "name": type,
              "image": "perl",
              "command": ["perl", "-Mbignum=bpi", "-wle", "print bpi(2000)"]
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
        console.log(error.response.status);
      });

    return this.sessionRepository.create(session);
  }

  @get('/sessions/count', {
    responses: {
      '200': {
        description: 'Session model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Session) where?: Where<Session>,
  ): Promise<Count> {
    return this.sessionRepository.count(where);
  }

  @get('/sessions', {
    responses: {
      '200': {
        description: 'Array of Session model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Session, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Session) filter?: Filter<Session>,
  ): Promise<Session[]> {
    return this.sessionRepository.find(filter);
  }

  @patch('/sessions', {
    responses: {
      '200': {
        description: 'Session PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Session, {partial: true}),
        },
      },
    })
    session: Session,
    @param.where(Session) where?: Where<Session>,
  ): Promise<Count> {
    return this.sessionRepository.updateAll(session, where);
  }

  @get('/sessions/{id}', {
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

  @patch('/sessions/{id}', {
    responses: {
      '204': {
        description: 'Session PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Session, {partial: true}),
        },
      },
    })
    session: Session,
  ): Promise<void> {
    await this.sessionRepository.updateById(id, session);
  }

  @put('/sessions/{id}', {
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

  @del('/sessions/{id}', {
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
