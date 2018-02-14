<template>
  <v-app>
    <v-container grid-list-md>
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-card class="daterange--default">
            <v-toolbar
              dark
              flat
              color="primary"
            >
              <v-toolbar-title>Default</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <p>From:
                <v-chip>{{ range[0] }}</v-chip> To:
                <v-chip>{{ range[1] }}</v-chip>
              </p>
              <p>In this example, you can only select dates within the last 15 days.</p>
              <DateRange
                @input="onDateRangeChange"
                :options="dateRangeOptions"
              />
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card class="daterange--no-preset">
            <v-toolbar
              dark
              flat
              color="primary"
            >
              <v-toolbar-title>No Presets</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <p>From:
                <v-chip>{{ range[0] }}</v-chip> To:
                <v-chip>{{ range[1] }}</v-chip>
              </p>
              <p>In this example, you can only select dates within the last 15 days.</p>
              <DateRange
                no-presets
                @input="onDateRangeChange"
                :options="dateRangeOptions"
              />
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card class="daterange--min-date">
            <v-toolbar
              dark
              flat
              color="primary"
            >
              <v-toolbar-title>Minimun Selectable Date</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-alert
                type="info"
                :value="true"
              >In this example, you can only select dates within the last 15 days.</v-alert>
              <p>From:
                <v-chip>{{ range[0] }}</v-chip> To:
                <v-chip>{{ range[1] }}</v-chip>
              </p>
              <DateRange
                no-presets
                @input="onDateRangeChange"
                :options="dateRangeOptionsWithMinDate"
              />
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card
            dark
            class="daterange--dark"
          >
            <v-toolbar
              dark
              flat
              color="primary"
            >
              <v-toolbar-title>Dark Theme</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <p>From:
                <v-chip>{{ range[0] }}</v-chip> To:
                <v-chip>{{ range[1] }}</v-chip>
              </p>
              <DateRange
                no-presets
                @input="onDateRangeChange"
                :options="dateRangeOptionsWithMinDate"
              />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
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
      dateRangeOptionsWithMinDate: {
        startDate: format(subDays(new Date(), 7), 'YYYY-MM-DD'),
        endDate: format(new Date(), 'YYYY-MM-DD'),
        minDate: format(subDays(new Date(), 15), 'YYYY-MM-DD'),
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
