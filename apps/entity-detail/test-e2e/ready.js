import { ClientFunction } from 'testcafe';

const eventNameForEntity = (state) => "domain:entity-detail:" + state

fixture`Ready`
  .page`http://localhost:${process.env.PORT}/`;


test('Page ready', async t => {
  const eventEmitted = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('ready'), args: [{}] } }
  );

  await t
    .expect(eventEmitted()).ok('Ready event has been emitted');
});
