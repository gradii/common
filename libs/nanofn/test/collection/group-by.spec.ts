import { groupBy } from '../../src/collection/group-by';

describe('groupBy', function() {

  it('return grouped data using fn map', function() {
    const list = [
      {name: 'name1', value: 'value1'},
      {name: 'name1', value: 'value2'},
      {name: 'name2', value: 'value3'},
      {name: 'name2', value: 'value4'},
      {name: 'name3', value: 'value5'},
    ];

    const result = groupBy(list, it => it.name);
    expect(result).toEqual({
      'name1': [
        {'name': 'name1', 'value': 'value1'},
        {'name': 'name1', 'value': 'value2'}
      ],
      'name2': [
        {'name': 'name2', 'value': 'value3'},
        {'name': 'name2', 'value': 'value4'}
      ],
      'name3': [
        {'name': 'name3', 'value': 'value5'}
      ]
    });
  });

  it('return grouped data using string map', function() {
    const list = [
      {name: 'name1', value: 'value1'},
      {name: 'name1', value: 'value2'},
      {name: 'name2', value: 'value3'},
      {name: 'name2', value: 'value4'},
      {name: 'name3', value: 'value5'},
    ];

    const result = groupBy(list, 'name');
    expect(result).toEqual({
      'name1': [
        {'name': 'name1', 'value': 'value1'},
        {'name': 'name1', 'value': 'value2'}
      ],
      'name2': [
        {'name': 'name2', 'value': 'value3'},
        {'name': 'name2', 'value': 'value4'}
      ],
      'name3': [
        {'name': 'name3', 'value': 'value5'}
      ]
    });
  });

});
