<template>
  <div>
    <select
      id="district"
      v-model="district"
      placeholder="View all">
      <option @click="district = ''" value=''>View all</option>
      <option v-for="district in 12" v-bind:value="district">District {{ district }}</option>
    </select><br>
    <input
      type="text"
      id="address"
      v-model="address"
      placeholder="Your address">
    <button @click="findDistrict()">Submit!</button>
    <div v-for="office in filteredOffices" @click="viewOffice(office.office.name)">{{ office.office.name }}</div>
    <!-- <Office :office="office"></Office> -->
  </div>
</template>

<script>
  import Office from './Office.vue';
  import axios from 'axios';
  export default {
    data () {
      return {
        baseURL: 'http://localhost:3000',
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
