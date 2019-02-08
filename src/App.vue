<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container>
          <v-date-range
            v-model="range"
            displayFormat="dddd, MMMM Do YYYY"
            no-title
            :input-props="{ solo: true }"
          >
            <h1 slot="title">klasdf</h1>
          </v-date-range>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import VDateRange from '@/components/VDateRange';
export default {
  name: 'app',
  components: { VDateRange },
  data() {
    return {
      range: {}
    };
  }
};
</script>
