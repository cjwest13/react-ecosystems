import { expect } from 'chai';
import { getCompleteTodos } from '../src/todos/selector';

describe('The getCompletedTodos selector', () => {
  it('Returns only completed todos', () => {
    const fakeTodos = [{
      text: 'Say Hello',
      isCompleted: true
    }, {
      text: 'Say Goodbye',
      isCompleted: false
    }, {
      text: 'Climb Mount Everset',
      isCompleted: false
    }];
    const expected = [{
      text: 'Say Hello',
      isCompleted: true
    }];

    const actual = getCompleteTodos.resultFunc(fakeTodos);
    expect(actual).to.eql(expected);
  })
})