<template>
  <div>
    <v-breadcrumbs icons divider="chevron_right">
      <v-breadcrumbs-item v-for="crumb in breadcrumbs" :key="crumb" :href="crumb.href" router>
        {{ crumb.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-list>
      <v-list-item v-for="candidate in candidates" :key="candidate">
        <router-link :to="`/office/${office}/${candidate.first_name} ${candidate.last_name}`">
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
        office: this.$route.params.office,
        officeID: this.$route.params.office.split(" ").slice(-1)[0],
        candidates: undefined,
        breadcrumbs: this.createBreadcrumbs()
      }
    },
    watch: {
      '$route'(to, from) {
        this.office = to.params.office;
        this.officeID = this.office.split(" ").slice(-1)[0]
      }
    },
    methods: {
      createBreadcrumbs() {
        let office = this.$route.params.office;
        let district = typeof(parseInt(office)) === 'number' ? `District ${office}` : office;
        return [{
          href: '/',
          text: 'Offices'
        },{
          text: district
        }];
      },
      getCandidates() {
        console.log(this.office);
        axios.get(`${this.baseURL}/api/districts/${this.officeID}`).then(resp => {
          this.candidates = resp.data.candidates;
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
