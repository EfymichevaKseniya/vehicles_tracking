import data from '../../cars.json';
import { isCode200 } from './generateRequestStatus';

export default function fetchMockData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isCode200()) {
        resolve(data);
      } else {
        reject('There was a problem with the server, please try again.');
      }
    }, 2000);
  });
}