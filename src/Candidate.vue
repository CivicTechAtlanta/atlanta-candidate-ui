<template>
  <div>
    <v-breadcrumbs icons divider="chevron_right">
      <v-breadcrumbs-item v-for="(crumb, index) in breadcrumbs" :key="index" :href="crumb.href" router>
        {{ crumb.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <CandidateSummary
      v-bind:candidate="candidateInfo"
      v-bind:office-name="officeName">
    </CandidateSummary>
  </div>
</template>

<script>
import axios from 'axios';

import CandidateSummary from './CandidateSummary.vue';

export default {
  components: {
    CandidateSummary
  },
  data() {
    return {
      // baseURL: 'https://atlanta-candidate-api.herokuapp.com',
      baseURL: 'http://localhost:3000',
      candidateID: this.$route.params.id,
      officeSlug: this.$route.params.office,
      officeName: '',
      candidateInfo: {},
      breadcrumbs: undefined
    }
  },
  methods: {
    createBreadcrumbs() {
      return [{
        href: '/',
        text: 'Offices'
      }, {
        href: `/office/${this.officeSlug}`,
        text: this.officeName || this.officeSlug
      }, {
        text: `${this.candidateInfo.full_name}`
      }]
    },
    getCandidateInfo() {
      axios.get(`${this.baseURL}/api/v1/candidates/${this.candidateID}`).then(resp => {
        this.candidateInfo = resp.data;
        this.breadcrumbs = this.createBreadcrumbs();
      })
        .catch(error => {
          console.log(error); // TODO
        });
    }
  },
  beforeMount() {
    this.$store.dispatch('getAllOffices')
    .then(() => {
      this.officeName = this.$store.getters.getOfficeName(this.officeSlug);
      this.getCandidateInfo();
    });
  }
}
</script>

<style scoped>

</style>
