import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';

const random = (num, skew = 1) => (
  Math.floor(Math.random() ** skew * num)
);

export const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '1m', target: 1000 },
    { duration: '1m', target: 1500 },
    { duration: '2m', target: 1500 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    errors: ['rate<0.01'],
    http_req_duration: ['p(99)<50'],
  },
};

export default () => {
  const res = http.get(`http://localhost:3002/api/listings/${random(10000000) + 1}`);

  const result = check(res, {
    'status is 200': (r) => r.status == 200,
  });

  errorRate.add(!result);

  sleep(1);
};
