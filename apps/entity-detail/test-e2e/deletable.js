import { Selector, ClientFunction } from 'testcafe';

const eventNameForEntity = (state) => "domain:entity-detail:" + state

fixture`Deletable`
  .page`http://localhost:${process.env.PORT}/?params={id:'entity-id',deletable:true}`;


test
  .page`http://localhost:${process.env.PORT}/?params={id:'entity-id'}`
  ('Not deletable', async t => {
    await t
      .expect(Selector('[data-test-id=delete-entity]').exists).notOk('Entity is not deletable');
  });

test('Deletable entity', async t => {
  const elt = Selector('[data-test-id=delete-entity]');

  const eventEmitted = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('delete'), args: [{ id: 'entity-id' }] } }
  );

  await t
    .expect(elt.exists).ok('Entity is deletable')
    .click(elt)
    .expect(eventEmitted()).ok('Delete event has been emitted');
});
