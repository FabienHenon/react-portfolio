import { Selector, ClientFunction } from 'testcafe';

const eventNameForEntity = (state) => "domain:entity-new:" + state

fixture`Closable`
  .page`http://localhost:${process.env.PORT}/?params={closable:true}`;


test
  .page`http://localhost:${process.env.PORT}/`
  ('Not closable', async t => {
    await t
      .expect(Selector('[data-test-id=close-entity]').exists).notOk('Entity is not closable');
  });

test('Closable entity', async t => {
  const elt = Selector('[data-test-id=close-entity]');

  const eventEmitted = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('close'), args: [{}] } }
  );

  await t
    .expect(elt.exists).ok('Entity is closable')
    .click(elt)
    .expect(eventEmitted()).ok('Close event has been emitted');
});
