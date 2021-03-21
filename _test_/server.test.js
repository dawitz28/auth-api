'use strict';

const mongoose = require('@code-fellows/supergoose');
const {server} = require('../src/server.js');

const Food = require('../models/food-collection.js');
const food = new Food();

const supertest = require('supertest');
const { expect } = require('@jest/globals');
const Clothes = require('../models/clothes-model.js');
const yourRequest = supertest(server.server);

describe('Food Collection', () => {
    //this test is independent from the test below
    //hence, why it is in it's own "it" block

    //404
    it('should return a 404 if no route found', async () => {
        const response = await yourRequest.get('/not-a-route')
        .then(result => {
            expect(result.status).toBe(404);
            expect(response.text).toEqual('not-a-route');

        });
    })

    it('should return a 404 if no route found', async () => {
        const response = await yourRequest.put('/food')
        .then(result => {
            expect(result.status).toBe(404);
            expect(response.text).toEqual('not found');
        });
    })

//food server test 
let id1 = [];
let id2 = [];


    //create
    it('can create a new food in the db', async () => {
        let response = await yourRequest.post('/food').send ({
        name: 'pizza',
        type: 'fast-food',
        });

    let response2 = await yourRequest.post('/food').send ({
        name: 'bigmac',
        type: 'burger'
        });

        id1 = response.body._id;
        id2 = response2.body._id;
        expect(response.status).toBe(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.name).toEqual('pizza');
        expect(response2.body.name).toEqual('bigmac');   
    })
    // //create
    // it('can create a new item food item', () => {
    //     let testFood = { name: 'test food item', calories: 9999, type: 'PROD'};
    //     let expected = { name: 'test food item', calories: 9999, type: 'PROD'};

    //     return food.create(testFood)
    //         .then(record => {
    //             console.log('test food item form DB:', record);
    //             Object.keys(testFood). forEach(key => {
    //                 expect(record[key]).toEqual(expexted[key]);
    //             });
    //         })
    // });

    //get or read

    it('should read/get by using GET /food', async () => {
        const response = await yourRequest.get('/food')
        expect(response.status).toEqual(200);
        expect(response.body[0]._id).toEqual(id1);
        expect(response.body[1]._id).toEqual(id2);

        });

        it('should read/get by using GET /food-byId', async () => {
            let food = await yourRequest.post('/food').send ({
                name: 'pizza',
                type: 'fast-food',
                });
                const response = await yourRequest.get(`/food/${food.body._id}`);
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual('pizza');    
            });

            //update

            it('should update by using put/food/:id', async () => {
        let food = await yourRequest.post('/food').send ({
        name: 'pizza',
        type: 'fast-food',
        });

    let response = await yourRequest.put(`/food/${food.body._id}`).send ({
        name: 'bigmac',
        type: 'burger'
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toEqual('bigmac');
        expect(response.body.type).toEqual('burger');   
    });
});

// });



//clothes server test 
let id3 = [];
let id4 = [];


//create
it('can create a new cloth in the db', async () => {
    let response = await yourRequest.post('/clothes').send ({
        name: 'pants',
        type: 'clothes',
    });
    
    let response2 = await yourRequest.post('/clothes').send ({
        name: 'jacket',
        type: 'clothes'
    });
    
    id3 = response.body._id;
    id4 = response2.body._id;
    expect(response.status).toBe(200);
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toEqual('pants');
    expect(response2.body.name).toEqual('jacket');   
})


it('should read/get by using GET /clothes', async () => {
    const response = await yourRequest.get('/clothes')
    expect(response.status).    toEqual(200);
    expect(response.body[0]._id).toEqual(id3);
    expect(response.body[1]._id).toEqual(id4);
    
});

it('should read/get by using GET /clothes-byId', async () => {
    let clothes = await yourRequest.post('/clothes').send ({
        name: 'pants',
        type: 'clothes',
    });
    const response = await yourRequest.get(`/clothes/${clothes.body._id}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('pants');    
});

//update

it('should update by using put/clothes/:id', async () => {
    let clothes = await yourRequest.post('/clothes').send ({
        name: 'socks',
        type: 'clothes',
    });
    
    let response = await yourRequest.put(`/clothes/${clothes.body._id}`).send ({
        name: 'shorts',
        type: 'burger'
    });
    
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('pants');
    expect(response.body.type).toEqual('jacket');   
});








// //delete
// it('should delete food from the db', async () => {
//     //we make a request to out app: DELETE /food/1
//     await yourRequest.delete(/food/)
//     .then(response => {
//         expect(response.status).toEqual(204);
//         expect(response.body).toBeFalsy();
//     })
// })


//     it('can get a food item', () => {
//         let testFood = { name: 'test food item', calories: 9999, type: 'PROD'};
//         let expected = { name: 'test food item', calories: 9999, type: 'PROD'};

//         return food.create(testFood)
//         .then(record => {
//             return food.get(record._id)
//             .then(item => {
//                 Object.keys(testFood). forEach(key => {
//                     expect(item[key]).toEqual(expected[key]);
//                 })
//             })
//         })
//     });




    // //delete
    // it('should delete food from the db', async () => {
    //     //we make a request to out app: DELETE /food/1
    //     await yourRequest.delete(/food/)
    //     .then(response => {
    //         expect(response.status).toEqual(204);
    //         expect(response.body).toBeFalsy();
    //     })
    // })

    
//     it('can get a food item', () => {
//         let testFood = { name: 'test food item', calories: 9999, type: 'PROD'};
//         let expected = { name: 'test food item', calories: 9999, type: 'PROD'};

//         return food.create(testFood)
//         .then(record => {
//             return food.get(record._id)
//             .then(item => {
//                 Object.keys(testFood). forEach(key => {
//                     expect(item[key]).toEqual(expected[key]);
//                 })
//             })
//         })
//     });
// });

// //create
    // it('can create a new item food item', () => {
    //     let testFood = { name: 'test food item', calories: 9999, type: 'PROD'};
    //     let expected = { name: 'test food item', calories: 9999, type: 'PROD'};

    //     return food.create(testFood)
    //         .then(record => {
    //             console.log('test food item form DB:', record);
    //             Object.keys(testFood). forEach(key => {
    //                 expect(record[key]).toEqual(expexted[key]);
    //             });
    //         })
    // });

    //get or read