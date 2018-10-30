<template>
  <div class="date-range">
    <div
      v-if="!noPresets"
      class="date-range__presets"
    >
      <v-list :dark="dark">
        <v-subheader>{{ labels.preset }}</v-subheader>
        <v-list-tile
          v-for="(preset, index) in presets"
          v-model="isPresetActive[index]"
          :key="index"
          @click="onPresetSelect(index)"
        >
          <v-list-tile-content>
            {{ preset.label }}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <div class="date-range__pickers">
      <div class="date-range__picker date-range__pickers--start">
        <v-text-field
          v-model="formattedStartDate"
          :label="`${labels.start}(${format})`"
          name="startDate"
          class="date-range__pickers-input"
          :prepend-icon="prependIcon"
          readonly
        />
        <v-date-picker
          :next-icon="nextIcon"
          :prev-icon="prevIcon"
          :dark="dark"
          :events="highlightRange ? dateRange.dates : events"
          :event-color="highlightRange ? dateRange.colors : eventColor"
          v-model="startDate"
          :min="options.minDate"
          :max="endDate"
          :locale="locale"
          :first-day-of-week="firstDayOfWeek"
          no-title
          @change="onDateRangeChange"
        />
      </div>
      <div class="date-range__picker date-range__picker--end">
        <v-text-field
          :label="`${labels.end}(${format})`"
          v-model="formattedEndDate"
          name="endDate"
          class="date-range__pickers-input"
          readonly
        />
        <v-date-picker
          :next-icon="nextIcon"
          :prev-icon="prevIcon"
          :dark="dark"
          :min="startDate"
          :max="maxDate"
          :events="highlightRange ? dateRange.dates : events"
          :event-color="highlightRange ? dateRange.colors : eventColor"
          v-model="endDate"
          :locale="locale"
          :first-day-of-week="firstDayOfWeek"
          no-title
          @change="onDateRangeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { format, parse } from 'date-fns';

export default {
  name: 'v-daterange',
  props: {
    options: {
      type: Object,
      required: true,
    },
    noPresets: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    prependIcon: {
      type: String,
      default: 'event',
    },
    nextIcon: {
      type: String,
      default: 'chevron_right',
    },
    prevIcon: {
      type: String,
      default: 'chevron_left',
    },
    labels: {
      type: Object,
      default() {
        return {
          start: 'Start Date',
          end: 'End Date',
          preset: 'Presets',
        };
      },
    },
    events: {
      type: [Array, Object, Function],
      default: () => null,
    },
    eventColor: {
      type: [String, Function, Object],
      default: 'warning',
    },
    highlightRange: {
      type: Boolean,
      default: true,
    },
    highlightColors: {
      type: String,
      default: '',
    },
    locale: {
      type: String,
      default: 'en-us',
    },
    firstDayOfWeek: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      startDate: this.options.startDate,
      endDate: this.options.endDate,
      format: this.options.format,
      presets: this.options.presets,
      dateRange: {
        dates: [],
        colors: {},
      },
    };
  },
  computed: {
    formattedStartDate() {
      return this.startDate
        ? format(parse(this.startDate), this.format)
        : '';
    },
    formattedEndDate() {
      return this.endDate ? format(parse(this.endDate), this.format) : '';
    },
    highlightColorClasses() {
      if (this.highlightColors) {
        return this.highlightColors;
      }
      return this.dark ? 'blue-grey darken-1' : 'blue lighten-5';
    },
    isPresetActive() {
      return this.presets.map(
        preset =>
          preset.range[0] === this.startDate && preset.range[1] === this.endDate
      );
    },
    today() {
      return format(new Date(), 'YYYY-MM-DD');
    },
    maxDate() {
      return this.options.maxDate || this.today;
    },
  },
  watch: {
    startDate() {
      this.onDateRangeChange();
    },
    endDate() {
      this.onDateRangeChange();
    },
  },
  mounted() {
    if (this.highlightRange) this.setInRangeData();
  },
  methods: {
    onPresetSelect(presetIndex) {
      this.startDate = this.presets[presetIndex].range[0];
      this.endDate = this.presets[presetIndex].range[1];
    },
    onDateRangeChange() {
      if (this.highlightRange) this.setInRangeData();
      this.$emit('input', [this.startDate, this.endDate]);
    },
    setInRangeData() {
      const inRangeData = {
        dates: [],
        colors: {},
      };

      if (this.highlightRange) {
        const startDate = parse(this.startDate);
        const endDate = parse(this.endDate);
        const diffDays = (endDate - startDate) / (1000 * 3600 * 24);

        for (let i = 0; i <= diffDays; i += 1) {
          const date = this.addDays(startDate.toDateString(), i);
          inRangeData.dates.push(date);
          inRangeData.colors[date] = `date-range__date-in-range ${
            this.highlightColorClasses
          }`;

          if (i === 0) inRangeData.colors[date] += ' date-range__range-start';
          if (i === diffDays)
            inRangeData.colors[date] += ' date-range__range-end';
        }
      }

      this.dateRange = inRangeData;
    },
    addDays(date, days) {
      const result = parse(date);
      result.setDate(result.getDate() + days);
      return format(result, 'YYYY-MM-DD');
    },
  },
};
</script>

<style scoped>
.date-range {
  display: flex;
}

.date-range__presets {
  margin-right: 1rem;
}

.date-range__pickers {
  display: flex;
}

.date-range__picker {
  padding: 0 1rem;
}
.date-range >>> .date-picker-table table, .date-range >>> .v-date-picker-table table {
  border-collapse: collapse;
}
.date-range >>> .date-picker-table__event.date-range__date-in-range, .date-range >>> .v-date-picker-table__event.date-range__date-in-range {
  z-index: 0;
  /* override existing settings */
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: 0;
}
.date-range
  >>> .date-picker-table__event.date-range__date-in-range.date-range__range-start,
  .date-range
    >>> .v-date-picker-table__event.date-range__date-in-range.date-range__range-start {
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  /* Cover only date button */
  left: 7px;
  width: 31px;
}
.date-range
  >>> .date-picker-table__event.date-range__date-in-range.date-range__range-end,
  .date-range
    >>> .v-date-picker-table__event.date-range__date-in-range.date-range__range-end {
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
}
.date-range >>> .date-picker-table .btn, .date-range >>> .v-date-picker-table .v-btn {
  /* fixed zIndex is needed because .date-picker-table__event div is created after the .btn button */
  z-index: 1;
}
</style>
