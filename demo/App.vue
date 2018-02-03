<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title>
          <h1>Selected Date Range : {{ range.join('&mdash;')}}</h1>
        </v-card-title>
        <v-card-text>
          <DateRange @input="onDateRangeChange" :options="dateRangeOptions"></DateRange>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import moment from 'moment';
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
        startDate: moment()
          .subtract(7, 'days')
          .format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        format: 'MM/DD/YYYY',
        presets: [
          {
            label: 'Today',
            range: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
          },
          {
            label: 'Yesterday',
            range: [
              moment()
                .subtract(1, 'days')
                .format('YYYY-MM-DD'),
              moment()
                .subtract(1, 'days')
                .format('YYYY-MM-DD'),
            ],
          },
          {
            label: 'Last 30 Days',
            range: [
              moment()
                .subtract(30, 'days')
                .format('YYYY-MM-DD'),
              moment()
                .subtract(1, 'days')
                .format('YYYY-MM-DD'),
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
