const fs = require('fs');
const pool = require('../lib/utils/pool');
const Recipe = require('../lib/models/recipe');
const Log = require('../lib/models/log');


describe('LOG Model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('tests the insert method', async() => {
    const newRecipe = await Recipe.insert({
      name: 'pizza',
      directions:[
        'Make dough',
        'Preheat oven to 450',
        'Make Pizza Sauce',
        'Roll out dough',
        'Add sauce to pizza',
        'Add cheese ontop of sauce',
        'Put in oven for 15 minutes or untill golden brown'
      ]  
    });
    const newLog = await Log.insert({
      recipeId: newRecipe.id,
      dateOfEvent: '2020-09-22',
      notes: 'Need to add more toppings',
      rating: 9
    });


    expect(newLog).toEqual({
      id:expect.any(String),
      recipeId: newRecipe.id,
      dateOfEvent: newLog.dateOfEvent,
      notes: 'Need to add more toppings',
      rating: 9
    });
  });

  it('tests the find method', async() => {
    const newRecipes = await Promise.all([
      {
        name: 'Pizza',
        directions:[
          'Make dough',
          'Preheat oven to 450',
          'Make Pizza Sauce',
          'Roll out dough',
          'Add sauce to pizza',
          'Add cheese ontop of sauce',
          'Put in oven for 15 minutes or until golden brown'
        ] }, 
      {
        name: 'Oatmeal',
        directions:[
          'Mix oatmeal, berries and milk in a bowl',
          'Put bowl into microwave for 2 minutes'
        ]  
      }].map(recipe => Recipe.insert(recipe)));

    const newLogs = await Promise.all ([
      {
        recipeId: newRecipes[0].id,
        dateOfEvent: '2020-09-22',
        notes: 'Need to add more toppings',
        rating: 9
      },
      {
        recipeId: newRecipes[0].id,
        dateOfEvent: '2020-09-21',
        notes: 'Need sugar',
        rating: 4
      }    
    ].map(log => Log.insert(log)));

    const allLogs = await Log.find();

    expect(allLogs).toEqual(newLogs);
  });

  it('tests findById method', async() =>  {
    const newRecipe = await Recipe.insert({
      name: 'pizza',
      directions:[
        'Make dough',
        'Preheat oven to 450',
        'Make Pizza Sauce',
        'Roll out dough',
        'Add sauce to pizza',
        'Add cheese ontop of sauce',
        'Put in oven for 15 minutes or untill golden brown'
      ]  
    });

    const newLog = await Log.insert({
      recipeId: newRecipe.id,
      dateOfEvent: '2020-09-22',
      notes: 'Need to add more toppings',
      rating: 9
    });

    const pizzaLog = await Log.findById(newLog.id);

    expect(newLog).toEqual(pizzaLog);

  });

  it('tests update method', async() => {
    const newRecipe = await Recipe.insert({
      name: 'pizza',
      directions:[
        'Make dough',
        'Preheat oven to 450',
        'Make Pizza Sauce',
        'Roll out dough',
        'Add sauce to pizza',
        'Add cheese ontop of sauce',
        'Put in oven for 15 minutes or untill golden brown'
      ]  
    });
  
    const newLog = await Log.insert({
      recipeId: newRecipe.id,
      dateOfEvent: '2020-09-22',
      notes: 'Need to add more toppings',
      rating: 9
    });

    const updatedLog = await Log.update(newLog.id, {
      recipeId: newRecipe.id,
      dateOfEvent: '2020-09-10',
      notes: 'USE more sauce',
      rating: 10
    });

    expect(updatedLog).toEqual({
      id: newLog.id,
      recipeId: newRecipe.id,
      dateOfEvent: '2020-09-10',
      notes: 'USE more sauce',
      rating: 10
    });
  });


  it('tests delete method', async() => {
    const newRecipes = await Promise.all([
      {
        name: 'Pizza',
        directions:[
          'Make dough',
          'Preheat oven to 450',
          'Make Pizza Sauce',
          'Roll out dough',
          'Add sauce to pizza',
          'Add cheese ontop of sauce',
          'Put in oven for 15 minutes or until golden brown'
        ] 
      }, 
      {
        name: 'Oatmeal',
        directions:[
          'Mix oatmeal, berries and milk in a bowl',
          'Put bowl into microwave for 2 minutes'
        ]  
      }].map(recipe => Recipe.insert(recipe)));

    const newLog = await Log.insert({
      recipeId: newRecipes[0].id,
      dateOfEvent: '2020-09-22',
      notes: 'Need to add more toppings',
      rating: 9
    });

    const deletedLog = await Log.delete(newLog.id);

    expect(deletedLog).toEqual({
      id: newLog.id,
      recipeId: newRecipes[0].id,
      dateOfEvent: '2020-09-22',
      notes: 'Need to add more toppings',
      rating: 9
    });
  });


});
