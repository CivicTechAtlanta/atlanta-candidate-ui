<template>
  <div class="container">
    <v-layout row justify-center>
      <h4>Select Your District</h4>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12>
        <router-link :to="`/`">
          <v-btn block secondary>View all</v-btn>
        </router-link>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around>
      <router-link v-for="district in this.districts" :key="district" :to="`/district/${district}`">
        <v-btn secondary>{{ district }}</v-btn>
      </router-link>
    </v-layout>
    <v-layout row justify-center>
      <h4 class="mt-3">Or Find Your District</h4>
    </v-layout>
    <v-layout row>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <form block @submit.prevent>
              <v-layout row base-align justify-center>
                <v-text-field id="address" v-model="address" label="Your address">
                </v-text-field>
                <v-btn primary light type="submit" v-on:click.native="findDistrict()">Submit!</v-btn>
              </v-layout>
            </form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
    </v-layout>
    <v-list v-if="offices">
      <v-list-item v-for="office in this.offices" :key="office.name" @click="viewOffice(office.name)">
        <router-link :to="`/office/${office.slug}`">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ office.name }}
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
  data() {
    return {
      baseURL: 'https://atlanta-candidate-api.herokuapp.com',
      // baseURL: 'http://localhost:3000',
      offices: undefined,
      office: undefined,
      districts: [...range(1, 13)],
      district: this.$route.params.id,
      address: ''
    }
  },
  watch: {
    '$route'(to, from) {
      this.district = to.params.id;
      this.getOffices(this.district);
    }
  },
  methods: {
    viewOffice(office) {
      this.office = office;
    },
    getOffices(district) {
      let url = parseInt(district) ? `${this.baseURL}/api/v1/offices/?district_id=${district}&citywide=true` : `${this.baseURL}/api/v1/offices`;
      axios.get(url).then(resp => {
        console.log(resp);
        this.offices = resp.data.offices;
      })
        .catch(error => {
          console.log(error); // TODO
        });
    },
    findDistrict() {
      axios.get(`${this.baseURL}/api/v1/districts/?address=${this.address}`).then(resp => {
        this.$router.replace(`/district/${resp.data.district_id}`);
      })
        .catch(error => {
          console.log(error); // TODO
        });
      // TODO: also need an error if the data returned is an empty array, e.g. `{district_id: null, offices: []}`
      this.address = ''; // reset address field
    }
  },
  beforeMount() {
    this.getOffices(this.district);
  },
  components: {
    Office
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>
