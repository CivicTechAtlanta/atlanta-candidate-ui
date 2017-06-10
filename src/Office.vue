<template>
  <div>
    <h1>Office</h1>
    <h2 v-if="typeof(parseInt(office)) === 'number'">District {{ office }}</h2>
    <h2 v-else>{{ office }}</h2>
    <div v-for="candidate in candidates">
      {{ candidate.first_name }} {{ candidate.last_name }}
    </div>
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
        candidates: undefined
      }
    },
    watch: {
      '$route'(to, from) {
        this.office = to.params.office;
        this.officeID = this.office.split(" ").slice(-1)[0]
      }
    },
    methods: {
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
