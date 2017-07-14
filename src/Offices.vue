<template>
  <div class="container">
    Select your district:
    <router-link :to="`/`">
      <v-btn secondary>View all</v-btn>
    </router-link>
    <router-link v-for="district in this.districts" :key="district" :to="`/district/${district}`">
      <v-btn secondary>{{ district }}</v-btn>
    </router-link>
    <v-layout row wrap>
      <v-flex xs12>
        <form @submit.prevent>
          <v-layout row wrap>
            <v-flex xs12 sm3>
              <p>Or find your district:</p>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field id="address" v-model="address" label="Your address">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm3>
              <v-btn primary light type="submit" v-on:click.native="findDistrict()">Submit!</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
    <v-listg>
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
  width: 700px;
  max-width: 700px;
}
</style>
