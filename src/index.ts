import fastify from 'fastify'
import Joi from 'joi'

const app = fastify()

app.post(
  '/test',
  {
    schema: {
      body: Joi.object()
        .keys({
          hello: Joi.string().required()
        })
        .required(),
      response: {
        200: {
          foo: {
            type: 'string'
          }
        }
      }
    },
    validatorCompiler: ({ schema, method, url, httpPart }) => {
      return data => schema.validate(data)
    }
  },
  (request, reply) => {
    reply.code(200)

    reply.send({
      foo: 'bar'
    })
  }
)

app.listen(1996)
