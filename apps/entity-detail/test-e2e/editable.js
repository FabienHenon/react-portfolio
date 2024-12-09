import { Selector, ClientFunction } from 'testcafe';

const eventNameForEntity = (state) => "domain:entity-detail:" + state

fixture`Editable`
  .page`http://localhost:${process.env.PORT}/?params={id:'entity-id',editable:true}`;


test
  .page`http://localhost:${process.env.PORT}/?params={id:'entity-id'}`
  ('Not editable', async t => {
    await t
      .expect(Selector('[data-test-id=edit-entity]').exists).notOk('Entity is not editable');
  });

test('Editable entity', async t => {
  const elt = Selector('[data-test-id=edit-entity]');

  const eventEmitted = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('edit'), args: [{ id: 'entity-id' }] } }
  );

  await t
    .expect(elt.exists).ok('Entity is editable')
    .click(elt)
    .expect(eventEmitted()).ok('Edit event has been emitted');
});
