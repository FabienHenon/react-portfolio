import { Selector, ClientFunction } from 'testcafe';

const eventNameForEntity = (state) => "domain:entity-master:" + state

fixture`Editable`
  .page`http://localhost:${process.env.PORT}/`;



test('Click on an entity', async t => {
  const elt = Selector('[data-test-id="entity:my-id-1"]');

  const eventEmitted = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('clicked'), args: [{ id: 'my-id-1' }] } }
  );

  await t
    .expect(elt.exists).ok('Entity is there')
    .click(elt)
    .expect(eventEmitted()).ok('Click event has been emitted');
});
