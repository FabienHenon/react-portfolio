import { Selector, ClientFunction } from 'testcafe';

const eventNameForEntity = (state) => "domain:entity-master:" + state

fixture`Editable`
  .page`http://localhost:${process.env.PORT}/?params={editable:true}`;


test
  .page`http://localhost:${process.env.PORT}/`
  ('Not editable', async t => {
    await t
      .expect(Selector('[data-test-id="edit-entity:my-id-1"]').exists).notOk('Entity is not editable');
  });

test('Editable entity', async t => {
  const elt = Selector('[data-test-id="edit-entity:my-id-1"]');

  const eventEmitted = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('edit'), args: [{ id: 'my-id-1' }] } }
  );

  await t
    .expect(elt.exists).ok('Entity is editable')
    .click(elt)
    .expect(eventEmitted()).ok('Edit event has been emitted');
});
