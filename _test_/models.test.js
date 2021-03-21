'use strict';

require('@code-fellows/supergoose');
const dawitCollection = require('../src/models/models-collection.js');

const food = new dawitCollection(Food);

describe ('test module', () => {
    it('should create a valid module', async () => {
        const newFood = await food.create({name: 'test food item', type: 'PROD' });
        expect(newFood.name).toEqual('test food item');
    })
})
