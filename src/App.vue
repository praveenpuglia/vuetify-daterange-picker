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
            <h3 slot="title">Vuetify Dater Range Picker - Next</h3>
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
      inputProps: { solo: true, style: { width: '240px' } },
      menuProps: { offsetY: true, closeOnContentClick: false }
    };
  }
};
</script>
