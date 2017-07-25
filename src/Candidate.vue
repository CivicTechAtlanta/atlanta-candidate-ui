<template>
  <div>
    <v-breadcrumbs icons divider="chevron_right">
      <v-breadcrumbs-item v-for="crumb in breadcrumbs" :key="crumb" :href="crumb.href" router>
        {{ crumb.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <h1>{{ this.candidateInfo.first_name }} {{ this.candidateInfo.last_name}}</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      // baseURL: 'https://atlanta-candidate-api.herokuapp.com',
      baseURL: 'http://localhost:3000',
      candidateID: this.$route.params.id,
      officeSlug: this.$route.params.office,
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
        text: this.officeSlug
        // TODO: use office name for text
      }, {
        text: `${this.candidateInfo.first_name} ${this.candidateInfo.last_name}`
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
    this.getCandidateInfo();
  }
}
</script>

<style scoped>

</style>
