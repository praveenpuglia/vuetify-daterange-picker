<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title>
          <h1>Selected Date Range : {{ range.join('&mdash;') }}</h1>
        </v-card-title>
        <v-card-text>
          <DateRange
            @input="onDateRangeChange"
            :options="dateRangeOptions"/>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { format, subDays } from 'date-fns';
import '../dist/vuetify-daterange-picker.css';
import DateRange from '../';

export default {
  components: {
    DateRange,
  },
  data() {
    return {
      range: [],
      dateRangeOptions: {
        startDate: format(subDays(new Date(), 7), 'YYYY-MM-DD'),
        endDate: format(new Date(), 'YYYY-MM-DD'),
        format: 'MM/DD/YYYY',
        presets: [
          {
            label: 'Today',
            range: [
              format(new Date(), 'YYYY-MM-DD'),
              format(new Date(), 'YYYY-MM-DD'),
            ],
          },
          {
            label: 'Yesterday',
            range: [
              format(subDays(new Date(), 1), 'YYYY-MM-DD'),
              format(subDays(new Date(), 1), 'YYYY-MM-DD'),
            ],
          },
          {
            label: 'Last 30 Days',
            range: [
              format(subDays(new Date(), 30), 'YYYY-MM-DD'),
              format(subDays(new Date(), 1), 'YYYY-MM-DD'),
            ],
          },
        ],
      },
    };
  },
  methods: {
    onDateRangeChange(range) {
      this.range = range;
    },
  },
};
</script>
