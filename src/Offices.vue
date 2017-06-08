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
      disabled
      type="text"
      id="address"
      v-model="address"
      placeholder="Your address">
    <button disabled>Submit!</button>
    <div v-for="office in filteredOffices" @click="viewOffice(office.office.name)">{{ office.office.name }}</div>
    <Office :office="office"></Office>
  </div>
</template>

<script>
  import Office from './Office.vue';
  import axios from 'axios';
  export default {
    data () {
      return {
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
        axios.get('http://localhost:3000/api/candidates').then(resp => {
          this.offices = resp.data.offices;
        })
        .catch(error => {
          console.log(error); // TODO
        });
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
