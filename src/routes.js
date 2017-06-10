import Offices from './Offices.vue'; // TODO: is this needed now?
import Office from './Office.vue';

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
  // },{
  //   path: '/office/:office/:candidate',
  //   component: Candidate
  }
];
