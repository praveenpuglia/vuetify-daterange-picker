<template>
  <v-app>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="daterange--default">
            <v-toolbar dark flat color="primary">
              <v-toolbar-title>Default</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <p>From:
                <v-chip>{{ range[0] }}</v-chip> To:
                <v-chip>{{ range[1] }}</v-chip>
              </p>
              <p>In this example, you can only select dates within the last 15 days.</p>
              <v-daterange :options="dateRangeOptions" @input="onDateRangeChange" />
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card class="daterange--no-preset">
            <v-toolbar dark flat color="primary">
              <v-toolbar-title>No Presets</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <p>From:
                <v-chip>{{ range[0] }}</v-chip> To:
                <v-chip>{{ range[1] }}</v-chip>
              </p>
              <p>In this example, you can only select dates within the last 15 days.</p>
              <v-daterange :options="dateRangeOptions" no-presets @input="onDateRangeChange" />
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card class="daterange--min-date">
            <v-toolbar dark flat color="primary">
              <v-toolbar-title>Minimun Selectable Date</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-alert :value="true" type="info">In this example, you can only select dates within the last 15 days.</v-alert>
              <p>From:
                <v-chip>{{ range[0] }}</v-chip> To:
                <v-chip>{{ range[1] }}</v-chip>
              </p>
              <v-daterange :options="dateRangeOptionsWithMinDate" no-presets @input="onDateRangeChange" />
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card class="daterange--dark">
            <v-toolbar dark flat color="primary">
              <v-toolbar-title>Dark Theme</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <p>From:
                <v-chip>{{ range[0] }}</v-chip> To:
                <v-chip>{{ range[1] }}</v-chip>
              </p>
              <v-daterange :options="dateRangeOptions" dark @input="onDateRangeChange" />
            </v-card-text>
          </v-card>
        </v-flex>
        <!-- Custom Icons -->
        <v-flex xs12>
          <v-card class="daterange--custom-icons">
            <v-toolbar dark flat color="primary">
              <v-toolbar-title>Custom Icons</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <p>From:
                <v-chip>{{ range[0] }}</v-chip> To:
                <v-chip>{{ range[1] }}</v-chip>
              </p>
              <v-daterange :options="dateRangeOptions" next-icon="arrow_forward" prev-icon="arrow_back" @input="onDateRangeChange" />
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card class="daterange--in-menu">
            <v-toolbar dark flat color="primary">
              <v-toolbar-title>Open In Menu</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              The date picker can also be used from a menu. Here's an example -
              <code v-pre>
    &#x3C;v-menu full-width offset-y :close-on-content-click=&#x22;false&#x22; v-model=&#x22;dateMenu&#x22; bottom&#x3E;
      &#x3C;v-btn color=&#x22;primary&#x22; outline slot=&#x22;activator&#x22;&#x3E;{{ range[0] }} &#x26;mdash; {{ range[1] }}&#x3C;/v-btn&#x3E;
      &#x3C;v-card&#x3E;
        &#x3C;v-card-text&#x3E;
          &#x3C;v-daterange :options=&#x22;dateRangeOptions&#x22; @input=&#x22;onDateRangeChange&#x22; /&#x3E;
        &#x3C;/v-card-text&#x3E;
      &#x3C;/v-card&#x3E;
    &#x3C;/v-menu&#x3E;
              </code>
              <v-menu offset-y :close-on-content-click="false" v-model="dateMenu" bottom>
                <v-btn color="primary" slot="activator">{{range[0]}} &mdash; {{range[1]}}</v-btn>
                <v-card>
                  <v-card-text>
                    <v-daterange :options="dateRangeOptions" @input="onDateRangeChange" />
                  </v-card-text>
                </v-card>
              </v-menu>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { format, subDays } from 'date-fns';

export default {
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
      dateMenu: false,
    };
  },
  methods: {
    onDateRangeChange(range) {
      this.range = range;
    },
  },
};
</script>
