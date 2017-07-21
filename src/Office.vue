<template>
  <div>
    <v-breadcrumbs icons divider="chevron_right">
      <v-breadcrumbs-item v-for="crumb in breadcrumbs" :key="crumb" :href="crumb.href" router>
        {{ crumb.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-list>
      <v-list-item v-for="candidate in candidates" :key="candidate">
        <router-link :to="`/candidate/${officeSlug}/${candidate.id}`">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ candidate.first_name }} {{ candidate.last_name }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      baseURL: 'https://atlanta-candidate-api.herokuapp.com',
      // baseURL: 'http://localhost:3000',
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
