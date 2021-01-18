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
import {Session} from '../models';
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
    let headers = {
      Authorization: 'Bearer ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNklqZFdaSFpoTlZWd1JFMVJSbEJ5ZGtaM1NYSlVhVEZ0UkhaaFFXVm1OM3BLT0ZwR1NXRm5PVlozVTFraWZRLmV5SnBjM01pT2lKcmRXSmxjbTVsZEdWekwzTmxjblpwWTJWaFkyTnZkVzUwSWl3aWEzVmlaWEp1WlhSbGN5NXBieTl6WlhKMmFXTmxZV05qYjNWdWRDOXVZVzFsYzNCaFkyVWlPaUpyZFdKbExYTjVjM1JsYlNJc0ltdDFZbVZ5Ym1WMFpYTXVhVzh2YzJWeWRtbGpaV0ZqWTI5MWJuUXZjMlZqY21WMExtNWhiV1VpT2lKa1pXWmhkV3gwTFhSdmEyVnVMV2c0WTJ4eElpd2lhM1ZpWlhKdVpYUmxjeTVwYnk5elpYSjJhV05sWVdOamIzVnVkQzl6WlhKMmFXTmxMV0ZqWTI5MWJuUXVibUZ0WlNJNkltUmxabUYxYkhRaUxDSnJkV0psY201bGRHVnpMbWx2TDNObGNuWnBZMlZoWTJOdmRXNTBMM05sY25acFkyVXRZV05qYjNWdWRDNTFhV1FpT2lKbFpHSTBPREZtWmkwME5UUmtMVFJpWWpNdFlUWmxaUzA0TnpSalpEQmtaalF5T0RraUxDSnpkV0lpT2lKemVYTjBaVzA2YzJWeWRtbGpaV0ZqWTI5MWJuUTZhM1ZpWlMxemVYTjBaVzA2WkdWbVlYVnNkQ0o5LktnMXVSN1d1TjlVbW1fYTNVbWFsUlNTcFJVRHRnSGJKeVA4LWFCalZIZjlGeWVrOUY3clNrWmNtWEtsc2FtcjNHT1FZbXdzVVpUNEhXLVY3OGx3RHpXQVcyZDZuZ2tlZG5ZMG1MbG1zRDFUcXB3UG9rWmYxRDdPMlNPVzhIendLSzBHU3BuSWhDeFB4RGMyU1Z2SGM5dnFQRjBWeF9lbDBhWDJTcFlaWmQwS0w2Wm1oUFBjakxTYVhnM2dwenZDVlRUd19Ha3dENEVyaG5ZaDhQOWI0aEdLYXdaRmozTVp2WlJOT04yMVdXMlRVRHdqcWw4amJ0Nkw1SE9nMEVSaWNmNTJ3S0hiN0cxQnBrcnkybTBBSXY5SXFkWkxIRjNKd2lWNjFkN0p1TW9kTXFJdXJqUWJ6eU9aYW45QUpsb1RQQ3RYSXplUmlxYUhFZWpaSGpQdFlIVjRZbHQ5X2tMbXVLakhfNVRhLTNCTEd4eWdUS19BVkp0dDN0a3JlYjUwN1AySzB1alN5eTl6QllWaWtOUU9GSkFlU1FwU0pyS1A3eDA1cnJhcFVPZFJtbkNwTGZPeWEwYk9YTEh4a3JDNnQydE1wVXQ4akJNal9Rdks5MEFIYkR0MzdWWUR2cFo0TWprZ0dUQ08wVFlKLWcxMWF0ZGVtV0tMNEdtbHJyQm9NbDBqTjlpR0NmbTllbG94Z3Zub2lwYWIzMnA0TEwtX21HbmdYdDhSNmFWVnRjb1hQMUp6U0MwQ2IzLWc3cVkxenpzQktlR2RUVnB0NWp5anZ2Q1BCYzF4blZpMkRiRWFiZG1KdXlUeXBJTC1qekxheHU1WUR0a2U1WWdPZnVwa0xKT1JsS204UndfNEJHaXI0SVdTczZlUjkzQmRYMWc2cXptZnpIaXdOS05R',
      Accept: 'application/json',
      'Connection': 'close',
      'Content-Type': 'application/json'
    }

    let data = {
      "apiVersion": "batch/v1",
      "kind": "Job",
      "metadata": {
        "name": "pi-with-ttl"
      },
      "spec": {
        "ttlSecondsAfterFinished": 1,
        "template": {
          "spec": {
            "containers": [{
              "name": "pi",
              "image": "perl",
              "command": ["perl", "-Mbignum=bpi", "-wle", "print bpi(2000)"]
            }],
            "restartPolicy": "Never"
          }
        }
      }
    }
    await axios.post('https://51.138.70.243/apis/batch/v1/namespaces/pumba/jobs',
      data,
      headers)
      .then((response: any) => {
        console.log(response.status);
      })
      .catch((error: any) => {
        console.log(error);
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
