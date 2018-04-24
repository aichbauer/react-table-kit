import faker from 'faker';

export const data = [
  {
    number: 1,
    first: 'Mark',
    last: 'Otto',
    handle: '@mdo',
  },
  {
    number: 2,
    first: 'Jacob',
    last: 'Thornton',
    handle: '@fat',
  },
  {
    number: 3,
    first: 'Larry',
    last: 'the Bird',
    handle: '@twitter',
  },
];

export const dataOneHundred = () => {
  const array =  Array.apply(null, Array(100));
  const myArray = [];

  array.forEach((el, i) => {
    myArray.push({
    number: i+1,
    first: faker.name.firstName(i%2),
    last: faker.name.lastName(i%2),
    handle: `@${faker.company.bsBuzz()}`,
    });
  });

  return myArray;
}
