import { showRanking } from './ranking.js';
import { deliveryByTime } from './delivery_by_time.js';
import { fetchAndDisplayErrors } from './errors.js';

document.addEventListener('DOMContentLoaded', () => {
   showRanking('3');
});

document.addEventListener('DOMContentLoaded', () => {
   deliveryByTime('3');
});

document.addEventListener('DOMContentLoaded', () => {
   fetchAndDisplayErrors('3');
});



