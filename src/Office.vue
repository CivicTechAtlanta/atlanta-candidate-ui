<template>
  <div>
    <v-breadcrumbs icons divider="chevron_right">
      <v-breadcrumbs-item v-for="crumb in breadcrumbs" :key="crumb" :href="crumb.href" router>
        {{ crumb.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-layout row wrap class="ma-2">
      <v-flex xs12 sm6 md4 v-for="candidate in candidates" :key="candidate">
        <v-card class="my-3"
        >
          <v-card-title primary-title class="blue darken-4 white--text">
            <div class="headline">
              <router-link :to="`/candidate/${officeSlug}/${candidate.id}`">
                {{ candidate.first_name }} {{ candidate.last_name }}
              </router-link>
            </div>
          </v-card-title>
          <v-card-text>
            Information coming soon.
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios';

export default {
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
.headline {
  a {
    color: white;
    text-decoration: none;
  }
}
</style>
