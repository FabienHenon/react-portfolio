import { Selector, RequestMock, ClientFunction } from 'testcafe';
import { config as dotenv } from 'dotenv';
import { resolve } from 'path';

dotenv({ path: resolve(process.cwd(), '../../.env') });

const eventNameForEntity = (state) => "domain:entity-edit:" + state

fixture`Component`
  .page`http://localhost:${process.env.PORT}/?params={id:'entity-id'}`;


var mock = RequestMock()
  .onRequestTo(`${process.env.API_BASE_URL}/api/users/entity-id`)
  .respond('', 404, {
    'access-control-allow-credentials': true,
    'access-control-allow-origin': '*'
  });

var mockUpdate = RequestMock()
  .onRequestTo({ url: `${process.env.API_BASE_URL}/api/users/entity-id`, method: 'PUT', isAjax: true })
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
      .expect(Selector('[data-test-id=entity-input-firstname]').value).eql('')
      .expect(Selector('[data-test-id=entity-input-lastname]').value).eql('')
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
    .expect(Selector('[data-test-id=entity-input-firstname]').value).eql('John')
    .expect(Selector('[data-test-id=entity-input-lastname]').value).eql('Doe')
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
      .expect(Selector('[data-test-id=entity-input-firstname]').value).eql('')
      .expect(Selector('[data-test-id=entity-input-lastname]').value).eql('')
      .expect(eventEmittedFetch()).ok('Fetch event has been emitted')
      .expect(eventEmittedNotFetched()).ok('Fetched event has been emitted');
  });

test('Form not submitable if firstname is empty', async t => {
  const eventEmittedSubmitted = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('submitted'), args: [{}] } }
  );

  const eventEmittedChanged = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('changed'), args: [{ value: '', field: 'firstname' }] } }
  );

  const firstnameSelector = Selector('[data-test-id=entity-input-firstname]');
  const lastnameSelector = Selector('[data-test-id=entity-input-lastname]');

  await t
    .expect(firstnameSelector.value).eql('John')
    .expect(lastnameSelector.value).eql('Doe')
    .selectText(firstnameSelector).pressKey("delete")
    .expect(eventEmittedChanged()).ok('Changed event emitted')
    .expect(Selector('[data-test-id=entity-submit]').hasAttribute('disabled')).ok('Form is disabled')
    .click(Selector('[data-test-id=entity-submit]'))
    .expect(eventEmittedSubmitted()).notOk('Submitted event has not been emitted');
});

test('Form not submitable if lastname is empty', async t => {
  const eventEmittedSubmitted = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('submitted'), args: [{}] } }
  );

  const eventEmittedChanged = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('changed'), args: [{ value: '', field: 'lastname' }] } }
  );

  const firstnameSelector = Selector('[data-test-id=entity-input-firstname]');
  const lastnameSelector = Selector('[data-test-id=entity-input-lastname]');

  await t
    .expect(firstnameSelector.value).eql('John')
    .expect(lastnameSelector.value).eql('Doe')
    .selectText(lastnameSelector).pressKey("delete")
    .expect(eventEmittedChanged()).ok('Changed event emitted')
    .expect(Selector('[data-test-id=entity-submit]').hasAttribute('disabled')).ok('Form is disabled')
    .click(Selector('[data-test-id=entity-submit]'))
    .expect(eventEmittedSubmitted()).notOk('Submitted event has not been emitted');
});

test('Edit entity', async t => {
  const eventEmittedSubmitted = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('submitted'), args: [{}] } }
  );

  const eventEmittedChangedFirstname = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('changed'), args: [{ value: 'My firstname', field: 'firstname' }] } }
  );

  const eventEmittedChangedLastname = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('changed'), args: [{ value: 'My lastname', field: 'lastname' }] } }
  );

  const eventEmittedUpdated = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('updated'), args: [{ id: 'my-id' }] } }
  );

  const firstnameSelector = Selector('[data-test-id=entity-input-firstname]');
  const lastnameSelector = Selector('[data-test-id=entity-input-lastname]');

  await t
    .expect(firstnameSelector.value).eql('John')
    .expect(lastnameSelector.value).eql('Doe')
    .selectText(firstnameSelector).pressKey("delete")
    .typeText(firstnameSelector, 'My firstname')
    .expect(eventEmittedChangedFirstname()).ok('Changed event emitted')
    .selectText(lastnameSelector).pressKey("delete")
    .typeText(lastnameSelector, 'My lastname')
    .expect(eventEmittedChangedLastname()).ok('Changed event emitted')
    .expect(Selector('[data-test-id=entity-submit]').hasAttribute('disabled')).notOk('Form is not disabled')
    .click(Selector('[data-test-id=entity-submit]'))
    .expect(eventEmittedSubmitted()).ok('Submitted event has been emitted')
    .expect(eventEmittedUpdated()).ok('Updated event has been emitted')
    .expect(Selector('[data-test-id=edit-entity-updated]').exists).ok('Entity updated');
});

test
  .requestHooks(mockUpdate)
  ('Error updating entity', async t => {
    const eventEmittedSubmitted = ClientFunction(
      () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
      { dependencies: { eventName: eventNameForEntity('submitted'), args: [{}] } }
    );

    const eventEmittedChangedFirstname = ClientFunction(
      () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
      { dependencies: { eventName: eventNameForEntity('changed'), args: [{ value: 'My firstname', field: 'firstname' }] } }
    );

    const eventEmittedChangedLastname = ClientFunction(
      () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
      { dependencies: { eventName: eventNameForEntity('changed'), args: [{ value: 'My lastname', field: 'lastname' }] } }
    );

    const eventEmittedNotUpdated = ClientFunction(
      () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
      { dependencies: { eventName: eventNameForEntity('not-updated'), args: [{ id: 'entity-id' }] } }
    );

    const firstnameSelector = Selector('[data-test-id=entity-input-firstname]');
    const lastnameSelector = Selector('[data-test-id=entity-input-lastname]');

    await t
      .expect(firstnameSelector.value).eql('John')
      .expect(lastnameSelector.value).eql('Doe')
      .selectText(firstnameSelector).pressKey("delete")
      .typeText(firstnameSelector, 'My firstname')
      .expect(eventEmittedChangedFirstname()).ok('Changed event emitted')
      .selectText(lastnameSelector).pressKey("delete")
      .typeText(lastnameSelector, 'My lastname')
      .expect(eventEmittedChangedLastname()).ok('Changed event emitted')
      .expect(Selector('[data-test-id=entity-submit]').hasAttribute('disabled')).notOk('Form is not disabled')
      .click(Selector('[data-test-id=entity-submit]'))
      .expect(eventEmittedSubmitted()).ok('Submitted event has been emitted')
      .expect(eventEmittedNotUpdated()).ok('Not updated event has been emitted')
      .expect(Selector('[data-test-id=edit-entity-error]').exists).ok('Entity not updated');
  });