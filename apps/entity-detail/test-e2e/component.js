import { Selector, RequestMock, ClientFunction } from 'testcafe';
import { config as dotenv } from 'dotenv';
import { resolve } from 'path';

dotenv({ path: resolve(process.cwd(), '../../.env') });

const eventNameForEntity = (state) => "domain:entity-detail:" + state

fixture`Component`
  .page`http://localhost:${process.env.PORT}/?params={id:'entity-id'}`;


var mock = RequestMock()
  .onRequestTo(`${process.env.API_BASE_URL}/api/users/entity-id`)
  .respond('', 404, {
    'access-control-allow-credentials': true,
    'access-control-allow-origin': '*'
  });

test
  .page`http://localhost:${process.env.PORT}/`
  ('No entity id has been specified', async t => {
    const eventEmitted = ClientFunction(
      () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
      { dependencies: { eventName: eventNameForEntity('fetch'), args: [{ id: 'entity-id' }] } }
    );

    await t
      .expect(Selector('[data-test-id=entity-not-fetched]').exists).ok('Entity not fetched')
      .expect(eventEmitted()).notOk('Fetch event has not been emitted');
  });

test('An entity id has been specified', async t => {
  const eventEmittedFetch = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('fetch'), args: [{ id: 'entity-id' }] } }
  );

  const eventEmittedFetched = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('fetched'), args: [{ id: 'entity-id' }] } }
  );

  await t
    .expect(Selector('[data-test-id=entity-fetched]').exists).ok('Entity fetched')
    .expect(eventEmittedFetch()).ok('Fetch event has been emitted')
    .expect(eventEmittedFetched()).ok('Fetched event has been emitted');
});

test
  .requestHooks(mock)
  ('An error occurred when loading the entity', async t => {
    const eventEmittedFetch = ClientFunction(
      () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
      { dependencies: { eventName: eventNameForEntity('fetch'), args: [{ id: 'entity-id' }] } }
    );

    const eventEmittedNotFetched = ClientFunction(
      () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
      { dependencies: { eventName: eventNameForEntity('not-fetched'), args: [{ id: 'entity-id' }] } }
    );

    await t
      .expect(Selector('[data-test-id=entity-error]').exists).ok('Error with entity')
      .expect(eventEmittedFetch()).ok('Fetch event has been emitted')
      .expect(eventEmittedNotFetched()).ok('Not fetched event has been emitted');
  });
