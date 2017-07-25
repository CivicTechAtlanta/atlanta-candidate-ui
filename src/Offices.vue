<template>
  <div class="container">
  
    <v-card class="grey lighten-4 grey--text text--darken-4">
      <v-card-title primary-title>
        <div class="headline">
          <h2>2017 City of Atlanta Elections</h2>
        </div>
      </v-card-title>
      <v-card-text>
        <div>
          <h5>
            Find information about upcoming elections for the city of Atlanta
          </h5>
        </div>
      </v-card-text>
      <v-layout row wrap>
        <v-flex xs12 sm4 class="py-2">
          <v-card-actions>
            <v-btn class="green white--text text--darken-2 ml-3" large @click.native="showAddressSearchCard">Find Your District</v-btn>
          </v-card-actions>
        </v-flex>
        <v-flex xs12 sm4 class="">
          <v-select v-bind:items="districts" label="Select a District" item-value="districts" v-model="selectedDistrict" @input="getOffices(selectedDistrict)">
          </v-select>
        </v-flex>
      </v-layout>
    </v-card>
  
    <!-- Find Address  -->
    <div v-if="showAddressSearch">
      <!-- <v-layout row justify-center>
                            <h4 class="mt-3">Or Find Your District</h4>
                          </v-layout> -->
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
    </div>
  
    <div v-if="selectedDistrict">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="office in this.offices" :key="office.name" @click="viewOffice(office.name)">
          <v-card class="my-3">
            <v-card-title primary-title class="blue darken-4 white--text">
              <div class="headline">
                {{ office.name }}
              </div>
            </v-card-title>
            <v-card-text>
              <ul>
                <li v-for="candidate in office.candidates" :key="candidate.id">
                  <router-link :to="`/candidate/${office.slug}/${candidate.id}`">
                    {{candidate.first_name + ' ' + candidate.last_name}}
                  </router-link>
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  
  </div>
</template>

<script>
import Office from './Office.vue';
import axios from 'axios';
import range from 'lodash/range';

export default {
  data() {
    return {
      // baseURL: 'https://atlanta-candidate-api.herokuapp.com',
      baseURL: 'http://localhost:3000',
      offices: undefined,
      office: undefined,
      districts: [...range(1, 13)],
      district: this.$route.params.id,
      address: '',
      selectedDistrict: undefined,
      showAddressSearch: false
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
        var id = resp.data.district_id;
        this.$router.replace(`/district/${resp.data.district_id}`);
        this.selectedDistrict = id;
        this.showAddressSearch = false; // reset in case the search bar was used
      }).catch(error => {
        console.log(error); // TODO
      });
      // TODO: also need an error if the data returned is an empty array, e.g. `{district_id: null, offices: []}`
      this.address = ''; // reset address field
    },
    showAddressSearchCard() {
      this.showAddressSearch = !this.showAddressSearch;
      this.showIntroCard = false;
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
  max-width: 980px;
}
</style>
