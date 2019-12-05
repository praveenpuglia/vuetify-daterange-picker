<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container>
          {{ range }}
          <v-daterange
            v-model="range"
            display-format="dd-MM-yyyy"
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
import { ISO_FORMAT } from './utils/constants';
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
            format(new Date(), ISO_FORMAT),
            format(new Date(), ISO_FORMAT)
          ]
        },
        {
          label: 'Yesterday',
          range: [
            format(subDays(new Date(), 1), ISO_FORMAT),
            format(subDays(new Date(), 1), ISO_FORMAT)
          ]
        },
        {
          label: 'Last 30 Days',
          range: [
            format(subDays(new Date(), 30), ISO_FORMAT),
            format(subDays(new Date(), 1), ISO_FORMAT)
          ]
        }
      ]
    };
  }
};
</script>
