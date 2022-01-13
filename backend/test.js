import request from 'supertest';
import chai from 'chai';
chai.should();

const url = `http://localhost:3001`;

describe('GraphQL', () => {
    it('Returns user with id = 61d88ee4c709fa83afa77c22', (done) => {
        request(url).post('/graphql')
        .send({
            "query": "query GetUser($id: ID!) { getUser(_id: $id) {_id username}}",
            "variables": { "id": "61d88ee4c709fa83afa77c22" }
          })
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            const data = res.body.data.getUser;
            data.should.have.property('_id')
            data.should.have.property('username')
            done();
          })
     })
     it('Returns all issue posts in database', (done) => {
        request(url).post('/graphql')
        .send({
            "query": "query GetIssues {getIssues {title description upvoteCount downvoteCount user_id } }"
          })
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            const data = res.body.data.getIssues;
            data[0].should.have.property('title')
            data[0].should.have.property('description')
            data[0].should.have.property('upvoteCount')
            data[0].should.have.property('downvoteCount')
            data[0].should.have.property('user_id')
            done();
          })
     })
});
