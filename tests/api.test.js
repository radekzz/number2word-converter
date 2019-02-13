const expect = require('expect')
const request = require('supertest')

const app = require('../server')

describe('POST /convert', () => {
    it('should return json with array of words', (done) => {
        const data = { numericString: '3673' }

        request(app)
            .post('/api/convert')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                expect(res.body.words instanceof Array).toBe(true)
            })
            .end(done)
    })
    it('should return array of 4 letters for number 7', (done) => {
        const data = { numericString: '7' }

        const arr = ['p', 'q', 'r', 's']

        request(app)
            .post('/api/convert')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                expect(res.body.words).toHaveLength(4)
                expect(res.body.words).toEqual(expect.arrayContaining(arr))
            })
            .end(done)
    })
    it('should return word hello for numbers 43556', (done) => {
        const data = { numericString: '43556' }

        request(app)
            .post('/api/convert')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                expect(res.body.words).toContain('hello')
            })
            .end(done)
    })
    it('should return status 400 if letters are submitted', (done) => {
        const data = { numericString: 'ab' }

        request(app)
            .post('/api/convert')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(done)
    })
    it('should return status 400 if 0 is submitted', (done) => {
        const data = { numericString: '0' }

        request(app)
            .post('/api/convert')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(done)
    })
    it('should return status 400 if 1 is submitted', (done) => {
        const data = { numericString: '1' }

        request(app)
            .post('/api/convert')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(done)
    })
})
