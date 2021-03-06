import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import click from '../../helpers/click';

const {
  Component
} = Ember;

moduleForComponent('ember-native-dom-event-dispatcher - integration tests', {
  integration: true
});

test('a component can handle the click event', function(assert) {
  assert.expect(1);

  this.register('component:handles-click', Component.extend({
    click() {
      assert.ok(true, 'click was fired!');
    }
  }));

  this.register('template:components/handles-click', hbs`<button>Click me</button>`);

  this.render(hbs`{{handles-click id='clickey'}}`);

  click('#clickey');
});

test('actions are properly looked up when clicked directly', function(assert) {
  assert.expect(1);

  this.register('component:handles-click', Component.extend({
    actions: {
      handleClick() {
        assert.ok(true, 'click was fired!');
      }
    }
  }));

  this.register('template:components/handles-click', hbs`<button {{action 'handleClick'}}>Click me</button>`);

  this.render(hbs`{{handles-click id='clickey'}}`);

  click('button');
});

test('actions are properly looked up when clicking nested contents', function(assert) {
  assert.expect(1);

  this.register('component:handles-click', Component.extend({
    actions: {
      handleClick() {
        assert.ok(true, 'click was fired!');
      }
    }
  }));

  this.register('template:components/handles-click', hbs`<div {{action 'handleClick'}}><button>Click me</button></div>`);

  this.render(hbs`{{handles-click id='clickey'}}`);

  click('button');
});

test('unhandled events do not trigger an error', function(assert) {
  assert.expect(0);

  this.render(hbs`<button>Click Me!</button>`);

  click('button');
});
