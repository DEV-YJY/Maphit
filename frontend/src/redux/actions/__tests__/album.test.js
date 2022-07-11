// api to function then mock it
import nock from 'nock'
import { fetchAlbums } from '../album'

describe('album action', () => {
  it('fetches albums', async () => {
    expect.assertions(2)
    const scope = nock('http://localhost').get('/albums').reply(200, { result: 'string' })
    const result = await fetchAlbums()
    expect(result.type).toBe('FETCH_ALBUMS')
    expect(result.payload).toBe('string')
    scope.done()
  })
})

// reducer
