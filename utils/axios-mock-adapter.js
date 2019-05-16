import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet('/api/mock').reply(200, {
  code: 0,
  data: 'Hello mock!',
});

mock.onAny().passThrough();
