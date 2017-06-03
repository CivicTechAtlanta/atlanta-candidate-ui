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
  export default {
    data () {
      return {
        "district_id":null,
        "offices":[{"office":{"name":"Mayor","candidates":[{"id":1,"first_name":"Vincent","last_name":"Fort"},{"id":2,"first_name":"Keisha","last_name":"Bottoms"},{"id":3,"first_name":"Mary","last_name":"Norwood"},{"id":4,"first_name":"Ceasar","last_name":"Mitchell"},{"id":5,"first_name":"Cathy","last_name":"Woolard"},{"id":6,"first_name":"Peter","last_name":"Aman"},{"id":7,"first_name":"Michael","last_name":"Sterling"},{"id":8,"first_name":"Elbert","last_name":"Bartell"},{"id":9,"first_name":"Laban","last_name":"King"},{"id":10,"first_name":"Kwanza","last_name":"Hall"},{"id":11,"first_name":"John","last_name":"Eaves"}]}},{"office":{"name":"City Council President","candidates":[{"id":60,"first_name":"Clarence","last_name":"Martin"},{"id":61,"first_name":"Felicia","last_name":"Moore"},{"id":62,"first_name":"Alexander","last_name":"Wan"}]}},{"office":{"name":"City Council At-Large 1","candidates":[{"id":54,"first_name":"Michael","last_name":"Bond"},{"id":55,"first_name":"Courtney","last_name":"English"},{"id":56,"first_name":"Anthony","last_name":"Green"}]}},{"office":{"name":"City Council At-Large 2","candidates":[{"id":57,"first_name":"Cory","last_name":"Ruth"},{"id":58,"first_name":"Matt","last_name":"Westmoreland"}]}},{"office":{"name":"City Council At-Large 3","candidates":[{"id":59,"first_name":"Andre","last_name":"Dickens"}]}},{"office":{"name":"City Council District 1","candidates":[{"id":14,"first_name":"Rontaverous","last_name":"Aribo"},{"id":15,"first_name":"Tanya","last_name":"Washington"},{"id":16,"first_name":"Moraima","last_name":"Ivory"},{"id":17,"first_name":"William","last_name":"Powell"},{"id":18,"first_name":"Carla","last_name":"Smith"}]}},{"office":{"name":"City Council District 2","candidates":[{"id":19,"first_name":"Amir","last_name":"Farokhi"},{"id":20,"first_name":"Stephan","last_name":"Ferguson"},{"id":21,"first_name":"Zelda","last_name":"Jackson"},{"id":22,"first_name":"Lauren","last_name":"Welsh"}]}},{"office":{"name":"City Council District 3","candidates":[{"id":23,"first_name":"Ricky","last_name":"Brown"},{"id":24,"first_name":"Greg","last_name":"Clay"},{"id":25,"first_name":"Ivory","last_name":"Young"}]}},{"office":{"name":"City Council District 4","candidates":[{"id":26,"first_name":"Mr.","last_name":"Adassa"},{"id":27,"first_name":"Christopher","last_name":"Brown"},{"id":28,"first_name":"Daniel","last_name":"Burroughs"},{"id":29,"first_name":"Steven","last_name":"Chatman"},{"id":30,"first_name":"Jason","last_name":"Dozier"},{"id":31,"first_name":"Nicholas","last_name":"Hess"},{"id":32,"first_name":"Jonathan","last_name":"Whitfield"},{"id":33,"first_name":"DeBorah","last_name":"Williams"},{"id":34,"first_name":"Cleta","last_name":"Winslow"}]}},{"office":{"name":"City Council District 5","candidates":[{"id":12,"first_name":"Liliana","last_name":"Bakhtiari"},{"id":35,"first_name":"Natalyn","last_name":"Archibong"}]}},{"office":{"name":"City Council District 6","candidates":[{"id":13,"first_name":"Lock","last_name":"Whiteside"},{"id":36,"first_name":"Jennifer","last_name":"Ide"},{"id":37,"first_name":"Kirk","last_name":"Rich"},{"id":38,"first_name":"Lock","last_name":"Whiteside"}]}},{"office":{"name":"City Council District 7","candidates":[{"id":39,"first_name":"Charles","last_name":"Shook"}]}},{"office":{"name":"City Council District 8","candidates":[]}},{"office":{"name":"City Council District 9","candidates":[{"id":40,"first_name":"William","last_name":"Harrison"},{"id":41,"first_name":"Dustin","last_name":"Hillis"}]}},{"office":{"name":"City Council District 10","candidates":[{"id":42,"first_name":"Clarence","last_name":"Martin"},{"id":43,"first_name":"Erika","last_name":"Mitchell"},{"id":44,"first_name":"Beverly","last_name":"Rice"}]}},{"office":{"name":"City Council District 11","candidates":[{"id":45,"first_name":"Harold","last_name":"Hardnett"},{"id":46,"first_name":"Latarsha","last_name":"Holden"},{"id":47,"first_name":"Anthony","last_name":"Johnson"},{"id":48,"first_name":"Brionte","last_name":"McCorkle"},{"id":49,"first_name":"Marcia","last_name":"Overstreet"},{"id":50,"first_name":"Georgianne","last_name":"Thomas"}]}},{"office":{"name":"City Council District 12","candidates":[{"id":51,"first_name":"Randy","last_name":"Gibbs"},{"id":52,"first_name":"Michael","last_name":"Jackson"},{"id":53,"first_name":"Joyce","last_name":"Sheperd"}]}}],
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
      }
    },
    components: {
      Office
    }
  }
</script>
