<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container>
          <v-daterange
            v-model="range"
            display-format="DD-MM-YYYY"
            no-title
            :input-props="inputProps"
            :menu-props="menuProps"
            :presets="presets"
          >
            <h3 slot="title">Vuetify Dater Range Picker - Next</h3>
          </v-daterange>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import VDaterange from '@/components/VDaterange';
import { format, subDays } from 'date-fns';
export default {
  name: 'app',
  components: { VDaterange },
  data() {
    return {
      range: {},
      inputProps: { solo: true, style: { width: '240px' } },
      menuProps: { offsetY: true, closeOnContentClick: false },
      presets: [
        {
          label: 'Today',
          range: [
            format(new Date(), 'YYYY-MM-DD'),
            format(new Date(), 'YYYY-MM-DD')
          ]
        },
        {
          label: 'Yesterday',
          range: [
            format(subDays(new Date(), 1), 'YYYY-MM-DD'),
            format(subDays(new Date(), 1), 'YYYY-MM-DD')
          ]
        },
        {
          label: 'Last 30 Days',
          range: [
            format(subDays(new Date(), 30), 'YYYY-MM-DD'),
            format(subDays(new Date(), 1), 'YYYY-MM-DD')
          ]
        }
      ]
    };
  }
};
</script>
