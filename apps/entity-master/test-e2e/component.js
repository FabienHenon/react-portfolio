import { Selector, RequestMock, ClientFunction } from 'testcafe';
import { config as dotenv } from 'dotenv';
import { resolve } from 'path';

dotenv({ path: resolve(process.cwd(), '../../.env') });

const eventNameForEntity = (state) => "domain:entity-master:" + state

fixture`Component`
  .page`http://localhost:${process.env.PORT}/`;


var mock = RequestMock()
  .onRequestTo(`${process.env.API_BASE_URL}/api/users`)
  .respond('', 404, {
    'access-control-allow-credentials': true,
    'access-control-allow-origin': '*'
  });


test('Entities are loaded', async t => {
  const eventEmittedFetch = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('fetch'), args: [{}] } }
  );

  const eventEmittedFetched = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('fetched'), args: [{}] } }
  );

  await t
    .expect(Selector('[data-test-id=entities-fetched]').exists).ok('Entity fetched')
    .expect(Selector('[data-test-class=entity]').count).eql(4)
    .expect(eventEmittedFetch()).ok('Fetch event has been emitted')
    .expect(eventEmittedFetched()).ok('Fetched event has been emitted');
});

test
  .requestHooks(mock)
  ('An error occurred when loading the entities', async t => {
    const eventEmittedFetch = ClientFunction(
      () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
      { dependencies: { eventName: eventNameForEntity('fetch'), args: [{}] } }
    );

    const eventEmittedNotFetched = ClientFunction(
      () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
      { dependencies: { eventName: eventNameForEntity('not-fetched'), args: [{}] } }
    );

    await t
      .expect(Selector('[data-test-id=entities-error]').exists).ok('Error with entity')
      .expect(eventEmittedFetch()).ok('Fetch event has been emitted')
      .expect(eventEmittedNotFetched()).ok('Fetched event has been emitted');
  });
