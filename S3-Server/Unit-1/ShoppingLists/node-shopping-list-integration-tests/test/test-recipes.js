const chai = require('chai')
const chaiHttp = require('chai-http')

const { app, runServer, closeServer } = require("../server")

const { expect } = chai

chai.use(chaiHttp)

describe('Recipes', function(){

  before(function(){
    return runServer()
  })

  after(function(){
    return closeServer()
  })

  it('should list recipes on GET', function() {

    return chai
      .request(app)
      .get('/recipes')
      .then(function(res) {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        expect(res.body.length).to.be.at.least(1)
        const expectedKeys = ['id', 'name', 'ingredients']
        res.body.forEach(function(recipe) {
          expect(recipe).to.be.a('object')
          expect(recipe).to.include.keys(expectedKeys)
        })
      })
  })  
  
  it('should create an recipe on POST', function(){
    const newRecipe = {name:'turnip surprise', ingredients:['live lizard', 'turnips']}
    return chai
      .request(app)
      .post('/recipes')
      .send(newRecipe)
      .then(function(res) {
        expect(res).to.have.status(201)
        expect(res).to.be.json
        expect(res.body).to.be.a('object')
        expect(res.body).to.include.keys('id', 'name', 'ingredients')
        expect(res.body.id).to.not.equal(null)
        expect(res.body).to.deep.equal(
          Object.assign(newRecipe, {id: res.body.id})
        )
      })
  })

  it('should update a recipe on PUT', function(){
    const updateRecipe = {name: 'cheese', ingredients:['milk', 'lemon']}
    return chai
      .request(app)
      .get('/recipes')
      .then(function(res) {
        updateRecipe.id = res.body[0].id
        return chai
          .request(app)
          .put(`/recipes/${updateRecipe.id}`)
          .send(updateRecipe)
      })
      .then(function(res) {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('object')
        expect(res.body).to.deep.equal(updateRecipe)
      })
  })

  it('should delete a recipe on DELETE', function(){
    return chai
      .request(app)
      .get('/recipes')
      .then(function(res) {
        return chai
          .request(app)
          .delete('/recipes/'+ res.body[0].id)
      })
      .then(function(res){
        expect(res).to.have.status(204)
      })
  })
})