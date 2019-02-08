import axios from 'axios';

export default class BordaApi {
  testFunc = () => console.log('test')
}

const bordaApi = new BordaApi();
bordaApi.testFunc();
