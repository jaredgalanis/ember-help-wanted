import { module, test } from 'qunit';
import { visit, currentURL, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | basic', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visit /learning', async function(assert) {
    assert.expect(4);

    server.createList('github-issue', 10, { state: 'open' });
    await visit('/learning');
    assert.equal(currentURL(), '/learning');

    const issues = findAll('.github-issue-table tr');
    assert.ok(issues.length > 0, 'can list issues');

    const labels = findAll('.github-issue-table tr:first-child .github-label');
    assert.ok(labels.length > 0, 'can list issue labels');

    const projects = findAll('.github-issue-table tr:first-child td:first-child a');
    assert.ok(projects.length > 0, 'can list projects');
  });

  test('total issues displayed', async function(assert) {
    assert.expect(1);
    server.createList('github-issue', 5, { state: 'open' });
    await visit('/learning');
    assert.dom('.total-issues').hasText('5 issues displayed');
  });

});
