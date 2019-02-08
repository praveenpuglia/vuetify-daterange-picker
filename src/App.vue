<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container>
          <v-date-range
            v-model="range"
            display-format="DD-MM-YYYY"
            no-title
            :input-props="inputProps"
            :menu-props="menuProps"
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
      range: {},
      inputProps: { box: true, style: { width: '240px' } },
      menuProps: { offsetY: true, closeOnContentClick: false }
    };
  }
};
</script>
