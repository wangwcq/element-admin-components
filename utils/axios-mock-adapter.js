import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import _ from 'lodash';
import uuid from 'uuid/v1';

const mock = new MockAdapter(axios);

mock.onGet('/api/admin/api-table').reply(200, {
  code: 0,
  data: _.map(_.range(100), x => {
    return {
      "_id": "5c774f397123190021a08cc2",
      "agreeTerms": "off",
      "lang": "en-US",
      "updatedAt": "2019-02-26T05:12:02.373Z",
      "createdAt": "2019-02-28 11:02:17",
      "firstName": "",
      "lastName": "",
      "companyName": "",
      "role": "",
      "country": "",
      "email": "data@example.com",
      "phone": "",
      "type": "article-download",
      "message": "http://www.example.com/test.pdf",
      "scene": "article-download",
      "token": uuid(),
      "__v": 0,
      "url": `/api/download/${uuid()}`,
      "ip": "192.168.1.103",
      "request": [
        {
          "_id": uuid(),
          "agreeTerms": "off",
          "lang": "en-US",
          "updatedAt": "2019-02-26T05:12:02.373Z",
          "createdAt": "2019-02-26T05:12:02.373Z",
          "firstName": "",
          "lastName": "",
          "companyName": "",
          "role": "",
          "country": "",
          "email": "user@example.com",
          "phone": "",
          "type": "article-download",
          "message": "http://www.example.com/test.pdf",
          "scene": "article-download",
          "token": uuid(),
          "__v": 0
        }
      ],
    };
  }),
});

mock.onGet('/api/admin/categories/list').reply(200, {
  code: 0,
  data: [
    { id: 1, title: 'About' },
    { id: 20, title: 'News' },
  ],
});

