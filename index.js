const _ = require('lodash');
const Boom = require('@hapi/boom');
const sharp = require('sharp');

const INVALID_QUEUE = 'Image transformation queue was invalid.';

async function lipoKoa(ctx) {
  try {
    const err = Boom.badRequest(
      _.isFunction(ctx.request.t) ? ctx.request.t(INVALID_QUEUE) : INVALID_QUEUE
    );

    if (!_.isString(ctx.request.body.queue)) throw Boom.badRequest(err);

    const queue = JSON.parse(ctx.request.body.queue);

    if (!_.isArray(queue)) throw Boom.badRequest(err);

    const options = _.isString(ctx.request.body.options)
      ? JSON.parse(ctx.request.body.options)
      : null;

    let metadata = false;

    const transform = _.reduce(
      queue,
      (transform, task) => {
        if (task[0] === 'metadata') {
          metadata = true;
          return transform;
        }

        return transform[task.shift()](...task);
      },
      _.isObject(options) ? sharp(options) : sharp()
    );

    if (_.isFunction(transform.on))
      transform.on('info', info => {
        Object.keys(info).forEach(key => {
          ctx.set(`x-sharp-${key}`, info[key]);
        });
      });

    if (metadata) {
      if (ctx.req.file) ctx.req.file.stream.pipe(transform);
      else if (ctx.request.file) ctx.request.file.stream.pipe(transform);
      ctx.body = await transform.metadata();
    } else if (ctx.req.file) ctx.body = ctx.req.file.stream.pipe(transform);
    else if (ctx.request.file)
      ctx.body = ctx.request.file.stream.pipe(transform);
    else ctx.body = transform;
  } catch (error) {
    ctx.throw(error);
  }
}

module.exports = lipoKoa;
