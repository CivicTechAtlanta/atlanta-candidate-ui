<template>
  <v-card class="ma-2"
  >
    <v-card-title primary-title class="blue darken-4 white--text">
      <div class="headline">
        <router-link v-if="officeSlug" :to="`/candidate/${officeSlug}/${candidate.id}`">
          {{ candidate.full_name }}
        </router-link>
        <span v-if="!officeSlug">
          {{ candidate.full_name }}
        </span>
      </div>
    </v-card-title>
    <v-list>
      <div v-if="candidate.website">
        <v-list-tile avatar :href="correctWebsiteLink(candidate.website)" target="_blank">
          <v-list-tile-avatar>
            <i class="fa fa-globe"></i>
          </v-list-tile-avatar>
          <v-list-tile-title>
            {{ shortenWebsite(candidate.website) }}
          </v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
      </div>
      <div v-if="candidate.email">
        <v-list-tile avatar :href="`mailto:${candidate.email}`">
          <v-list-tile-avatar>
            <i class="fa fa-envelope"></i>
          </v-list-tile-avatar>
          <v-list-tile-title>
            {{ candidate.email }}
          </v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
      </div>
      <div v-if="candidate.phone">
        <v-list-tile avatar :href="`tel:${candidate.phone}`">
          <v-list-tile-avatar>
            <i class="fa fa-phone"></i>
          </v-list-tile-avatar>
          <v-list-tile-title>
            {{ candidate.phone }}
          </v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
      </div>
      <div v-if="candidate.twitter">
        <v-list-tile avatar :href="candidate.twitter" target="_blank">
          <v-list-tile-avatar>
            <i class="fa fa-twitter"></i>
          </v-list-tile-avatar>
          <v-list-tile-title>
            @{{ getScreenname(candidate.twitter) }}
          </v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
      </div>
      <div v-if="candidate.instagram">
        <v-list-tile avatar :href="candidate.instagram" target="_blank">
          <v-list-tile-avatar>
            <i class="fa fa-instagram"></i>
          </v-list-tile-avatar>
          <v-list-tile-title>
            @{{ getScreenname(candidate.instagram) }}
          </v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
      </div>
      <div v-if="candidate.facebook">
        <v-list-tile avatar :href="candidate.facebook" target="_blank">
          <v-list-tile-avatar>
            <i class="fa fa-facebook"></i>
          </v-list-tile-avatar>
          <v-list-tile-title>
            {{ getScreenname(candidate.facebook) }}
          </v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
      </div>
      <div v-if="candidate.youtube">
        <v-list-tile avatar :href="candidate.youtube" target="_blank">
          <v-list-tile-avatar>
            <i class="fa fa-youtube"></i>
          </v-list-tile-avatar>
          <v-list-tile-title>
            {{ getScreenname(candidate.youtube) }}
          </v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
      </div>
    </v-list>
  </v-card>
</template>

<script>
import last from 'lodash/last'
import without from 'lodash/without'

export default {
  props: ['candidate', 'officeSlug', 'officeName'],
  methods: {
    correctWebsiteLink(website) {
      if (website.substr(0, 4) !== 'http') {
        return 'http://' + website
      }
      return website
    },
    shortenWebsite(website) {
      if (website.substr(0, 7) === 'http://') {
        website = website.substr(7)
      } else if (website.substr(0, 8) === 'https://') {
        website = website.substr(8)
      }
      if (website.substr(0, 4) === 'www.') {
        website = website.substr(4)
      }
      if (website.substr(-1, 1) === '/') {
        website = website.substr(0, website.length - 1)
      }
      return website
    },
    getScreenname(url) {
      return last(without(url.split('/'), ''))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../node_modules/font-awesome/css/font-awesome.css';

.headline {
  a {
    color: white;
    text-decoration: none;
  }
}

ul div:last-child {
  hr.divider {
    display: none;
  }
}
</style>
