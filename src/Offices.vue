<template>
  <div>
    <select
      id="district"
      v-model="district"
      placeholder="View all">
      <option @click="district = ''" value=''>View all</option>
      <option v-for="district in 12" v-bind:value="district">District {{ district }}</option>
      <!-- TODO: implement route change on option select -->
    </select><br>
    Or find your district:&nbsp;
    <input
      type="text"
      id="address"
      v-model="address"
      placeholder="Your address">
    <button @click="findDistrict()">Submit!</button>
    <div v-for="office in filteredOffices" @click="viewOffice(office.office.name)">
      <router-link :to="`/office/${office.office.name}`">
        {{ office.office.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
  import Office from './Office.vue';
  import axios from 'axios';

  export default {
    data () {
      return {
        baseURL: 'https://atlanta-candidate-api.herokuapp.com',
        offices: undefined,
        office: undefined,
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
      this.getOffices();
    },
    components: {
      Office
    }
  }
</script>
