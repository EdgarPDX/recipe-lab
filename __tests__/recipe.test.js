const fs = require('fs');
const pool = require('../lib/utils/pool');
const Recipe = require('../lib/models/recipe');

describe('RECIPE model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  it('Tests the insert method', async() => {
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

    expect(newRecipe).toEqual({
      id:expect.any(String),
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
  });

  it('Tests find method', async() => {
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


    const allRecipes = await Recipe.find();

    expect(allRecipes).toEqual(newRecipes);
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

    const pizzaRecipe = await Recipe.findById(newRecipe.id);

    expect(newRecipe).toEqual(pizzaRecipe);
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

    const updatedPizzaRecipe = await Recipe.update(newRecipe.id, {
      name: 'Pizza',
      directions:[
        'Make dough',
        'Preheat oven to 450',
        'Make Pizza Sauce',
        'Roll out dough roughly 18 inches in diameter',
        'Add sauce to pizza',
        'Add cheese ontop of sauce',
        'Add toppings of your choice',
        'Put in oven for 15 minutes or untill golden brown'
      ]  
    });

    expect(updatedPizzaRecipe).toEqual({
      id: newRecipe.id,
      name: 'Pizza',
      directions:[
        'Make dough',
        'Preheat oven to 450',
        'Make Pizza Sauce',
        'Roll out dough roughly 18 inches in diameter',
        'Add sauce to pizza',
        'Add cheese ontop of sauce',
        'Add toppings of your choice',
        'Put in oven for 15 minutes or untill golden brown'
      ]  
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

    const deletedRecipe = await Recipe.delete(newRecipes[1].id);

    expect(deletedRecipe).toEqual({
      id: newRecipes[1].id,
      name: 'Oatmeal',
      directions:[
        'Mix oatmeal, berries and milk in a bowl',
        'Put bowl into microwave for 2 minutes'
      ]  
    });
  });




});
