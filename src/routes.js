import Offices from './Offices.vue';
import Office from './Office.vue';
import Candidate from './Candidate.vue';

export const routes = [
  {
    path: '',
    component: Offices
  },{
    path: '/district/:id',
    component: Offices
  },{
    path: '/office/:office',
    component: Office
  },{
    path: '/candidate/:office/:id',
    component: Candidate
  }
];
