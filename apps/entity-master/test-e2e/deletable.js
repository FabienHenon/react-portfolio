import { Selector, ClientFunction } from 'testcafe';

const eventNameForEntity = (state) => "domain:entity-master:" + state

fixture`Deletable`
  .page`http://localhost:${process.env.PORT}/?params={deletable:true}`;


test
  .page`http://localhost:${process.env.PORT}/`
  ('Not deletable', async t => {
    await t
      .expect(Selector('[data-test-id="delete-entity:my-id-1"]').exists).notOk('Entity is not deletable');
  });

test('Deletable entity', async t => {
  const elt = Selector('[data-test-id="delete-entity:my-id-1"]');

  const eventEmitted = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('delete'), args: [{ id: 'my-id-1' }] } }
  );

  await t
    .expect(elt.exists).ok('Entity is deletable')
    .click(elt)
    .expect(eventEmitted()).ok('Delete event has been emitted');
});
