import faker from 'faker';
import './performance-observer.js';

/**
 * @typedef {Object} NestedObject
 * @property {number} id
 * @property {string} dataField
 */

/**
 * @typedef {Object} ComplexObject
 * @property {number} veryLongNameForSomeDataId
 * @property {number} thisCouldBeLoremIpsumFieldOrSomething
 * @property {number} thirdFieldIsShorter
 * @property {string} letsTryATextField
 * @property {NestedObject} andANestedObjectWhyNot
 */

/**
 * @type {ComplexObject[]}
 */
let data = [];

performance.mark('generate-data');
for (let i = 0; i < 300000; i++) {

  /**
   * @type {ComplexObject}
   */
  const randomComplexObject = {
    veryLongNameForSomeDataId: faker.datatype.number(999999999),
    thisCouldBeLoremIpsumFieldOrSomething: faker.datatype.number(999999999),
    thirdFieldIsShorter: faker.datatype.number(999999),
    letsTryATextField: faker.lorem.text(),
    andANestedObjectWhyNot: {
      id: faker.datatype.number(999999999),
      dataField: faker.datatype.string(20)
    }
  };

  data.push(randomComplexObject);
}
performance.measure('generate-data', 'generate-data');

export { data };
