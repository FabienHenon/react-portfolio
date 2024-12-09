import { Selector, RequestMock, ClientFunction } from 'testcafe';
import { config as dotenv } from 'dotenv';
import { resolve } from 'path';

dotenv({ path: resolve(process.cwd(), '../../.env') });

const eventNameForEntity = (state) => "domain:entity-new:" + state

fixture`Component`
  .page`http://localhost:${process.env.PORT}/`;


var mock = RequestMock()
  .onRequestTo({ url: `${process.env.API_BASE_URL}/api/users`, method: 'POST', isAjax: true })
  .respond('', 404, {
    'access-control-allow-credentials': true,
    'access-control-allow-origin': '*'
  });

test('Form not submitable if firstname is empty', async t => {
  const eventEmittedSubmitted = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('submitted'), args: [{}] } }
  );

  const eventEmittedChanged = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('changed'), args: [{ value: 'My lastname', field: 'lastname' }] } }
  );

  const firstnameSelector = Selector('[data-test-id=entity-input-firstname]');
  const lastnameSelector = Selector('[data-test-id=entity-input-lastname]');

  await t
    .expect(firstnameSelector.value).eql('')
    .expect(lastnameSelector.value).eql('')
    .typeText(lastnameSelector, 'My lastname')
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
    { dependencies: { eventName: eventNameForEntity('changed'), args: [{ value: 'My firstname', field: 'firstname' }] } }
  );

  const firstnameSelector = Selector('[data-test-id=entity-input-firstname]');
  const lastnameSelector = Selector('[data-test-id=entity-input-lastname]');

  await t
    .expect(firstnameSelector.value).eql('')
    .expect(lastnameSelector.value).eql('')
    .typeText(firstnameSelector, 'My firstname')
    .expect(eventEmittedChanged()).ok('Changed event emitted')
    .expect(Selector('[data-test-id=entity-submit]').hasAttribute('disabled')).ok('Form is disabled')
    .click(Selector('[data-test-id=entity-submit]'))
    .expect(eventEmittedSubmitted()).notOk('Submitted event has not been emitted');
});

test('New entity', async t => {
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

  const eventEmittedCreated = ClientFunction(
    () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
    { dependencies: { eventName: eventNameForEntity('created'), args: [{ id: 'my-id' }] } }
  );

  const firstnameSelector = Selector('[data-test-id=entity-input-firstname]');
  const lastnameSelector = Selector('[data-test-id=entity-input-lastname]');

  await t
    .expect(firstnameSelector.value).eql('')
    .expect(lastnameSelector.value).eql('')
    .typeText(firstnameSelector, 'My firstname')
    .expect(eventEmittedChangedFirstname()).ok('Changed event emitted')
    .typeText(lastnameSelector, 'My lastname')
    .expect(eventEmittedChangedLastname()).ok('Changed event emitted')
    .expect(Selector('[data-test-id=entity-submit]').hasAttribute('disabled')).notOk('Form is not disabled')
    .click(Selector('[data-test-id=entity-submit]'))
    .expect(eventEmittedSubmitted()).ok('Submitted event has been emitted')
    .expect(eventEmittedCreated()).ok('Created event has been emitted')
    .expect(Selector('[data-test-id=new-entity-created]').exists).ok('Entity created');
});

test
  .requestHooks(mock)
  ('Error creating entity', async t => {
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

    const eventEmittedNotCreated = ClientFunction(
      () => window.MfMaestro.eventHasBeenEmitted(eventName, args).isOk,
      { dependencies: { eventName: eventNameForEntity('not-created'), args: [{}] } }
    );

    const firstnameSelector = Selector('[data-test-id=entity-input-firstname]');
    const lastnameSelector = Selector('[data-test-id=entity-input-lastname]');

    await t
      .expect(firstnameSelector.value).eql('')
      .expect(lastnameSelector.value).eql('')
      .typeText(firstnameSelector, 'My firstname')
      .expect(eventEmittedChangedFirstname()).ok('Changed event emitted')
      .typeText(lastnameSelector, 'My lastname')
      .expect(eventEmittedChangedLastname()).ok('Changed event emitted')
      .expect(Selector('[data-test-id=entity-submit]').hasAttribute('disabled')).notOk('Form is not disabled')
      .click(Selector('[data-test-id=entity-submit]'))
      .expect(eventEmittedSubmitted()).ok('Submitted event has been emitted')
      .expect(eventEmittedNotCreated()).ok('Not created event has been emitted')
      .expect(Selector('[data-test-id=new-entity-error]').exists).ok('Entity not created');
  });