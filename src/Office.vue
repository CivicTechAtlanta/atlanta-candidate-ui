<template>
  <div>
    <v-breadcrumbs icons divider="chevron_right">
      <v-breadcrumbs-item v-for="crumb in breadcrumbs" :key="crumb.text" :href="crumb.href" router>
        {{ crumb.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-layout row wrap class="ma-2">
      <v-flex xs12 sm6 md4 v-for="candidate in candidates" :key="candidate.id">
        <CandidateSummary
          v-bind:candidate="candidate"
          v-bind:office-slug="officeSlug"
          v-bind:office-name="officeName">
        </CandidateSummary>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios';

import sortBy from 'lodash/sortBy';

import CandidateSummary from './CandidateSummary.vue';

export default {
  components: {
    CandidateSummary
  },
  data() {
    return {
      // baseURL: 'https://atlanta-candidate-api.herokuapp.com',
      baseURL: 'http://localhost:3000',
      officeSlug: this.$route.params.office,
      officeName: undefined,
      candidates: undefined,
      breadcrumbs: undefined
    }
  },
  watch: {
    '$route'(to, from) {
      this.officeSlug = to.params.office;
    }
  },
  methods: {
    createBreadcrumbs() {
      return [{
        href: '/',
        text: 'Offices'
      }, {
        text: this.officeName
      }];
    },
    getCandidates() {
      axios.get(`${this.baseURL}/api/v1/offices/${this.officeSlug}`).then(resp => {
        this.candidates = resp.data.candidates.filter(person => !person.is_dropped_out);
        this.candidates = sortBy(this.candidates, ['last_name']);
        this.officeName = resp.data.name;
        this.breadcrumbs = this.createBreadcrumbs();
      })
        .catch(error => {
          console.log(error); // TODO
        });
    }
  },
  beforeMount() {
    this.getCandidates();
  }
}
</script>

<style lang="scss" scoped>
</style>
