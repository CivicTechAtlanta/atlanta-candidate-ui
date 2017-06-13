<template>
  <div class="container">
    <v-select
      v-bind:items="districts"
      v-model="district"
      label="Select your district">
      <!-- TODO: implement route change on option select -->
    </v-select><br>
    <v-layout row wrap>
      <v-flex xs12 sm3>
        <p>Or find your district:</p>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field
          id="address"
          v-model="address"
          label="Your address">
        </v-text-field>
      </v-flex>
      <v-flex xs12 sm3>
        <v-btn primary light v-on:click.native="findDistrict()">Submit!</v-btn>
      </v-flex>
    </v-layout>
    <v-list>
      <v-list-item v-for="office in filteredOffices" @click="viewOffice(office.office.name)">
        <router-link :to="`/office/${office.office.name}`">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ office.office.name }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
  import Office from './Office.vue';
  import axios from 'axios';
  import range from 'lodash/range';

  export default {
    data () {
      return {
        baseURL: 'https://atlanta-candidate-api.herokuapp.com',
        offices: undefined,
        office: undefined,
        districts: ['View all', ...range(1, 13)],
        district: '',
        address: ''
      }
    },
    computed: {
      filteredOffices() {
        if (this.district > 0) {
          for (var office of this.offices) {
            // TODO: instead of this, use https://atlanta-candidate-api.herokuapp.com/api/candidates/?address=1234 Terminus Rd, Atlanta GA&citywide=true
            if (office.office.name === `City Council District ${this.district}`) {
              return [office];
            }
          }
        } else {
          return this.offices;
        }
      }
    },
    methods: {
      viewOffice(office) {
        this.office = office;
      },
      getOffices() {
        axios.get(`${this.baseURL}/api/candidates`).then(resp => {
          this.offices = resp.data.offices;
        })
        .catch(error => {
          console.log(error); // TODO
        });
      },
      findDistrict() {
        // TODO: implement route change once district is found
        axios.get(`${this.baseURL}/api/candidates/?address=${this.address}`).then(resp => {
          this.district = resp.data.district_id;
          this.offices = resp.data.offices;
        })
        .catch(error => {
          console.log(error); // TODO
        });
        // TODO: also need an error if the data returned is an empty array, e.g. `{district_id: null, offices: []}`
      }
    },
    beforeMount() {
      // TODO: implement route change if district is stored in state
      this.getOffices();
    },
    components: {
      Office
    }
  }
</script>

<style scoped>
  .container {
    width: 700px;
    max-width: 700px;
  }
</style>
