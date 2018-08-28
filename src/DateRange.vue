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
          prepend-icon="event"
          readonly
        />
        <v-date-picker
          :allowed-dates="allowedDates"
          :next-icon="nextIcon"
          :prev-icon="prevIcon"
          :dark="dark"
          :events="dateRange.dates"
          :event-color="dateRange.colors"
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
          :events="dateRange.dates"
          :event-color="dateRange.colors"
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
import { format } from 'date-fns';

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
      return format(new Date(this.startDate), this.format);
    },
    formattedEndDate() {
      return format(new Date(this.endDate), this.format);
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
    this.setDateRangeData();
  },
  methods: {
    onPresetSelect(presetIndex) {
      this.startDate = this.presets[presetIndex].range[0];
      this.endDate = this.presets[presetIndex].range[1];
    },
    onDateRangeChange() {
      this.setDateRangeData();
      this.$emit('input', [this.startDate, this.endDate]);
    },
    setDateRangeData() {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      const diffDays = (endDate - startDate) / (1000 * 3600 * 24);

      const dateRange = {
        dates: [],
        colors: {},
      };

      for (let i = 0; i <= diffDays; i += 1) {
        const date = this.addDays(startDate.toDateString(), i);
        dateRange.dates.push(date);

        if (i === 0) {
          dateRange.colors[date] = 'custom-date-picker-range start';
        } else if (i === diffDays) {
          dateRange.colors[date] = 'custom-date-picker-range end';
        } else {
          dateRange.colors[date] = 'custom-date-picker-range';
        }
      }

      this.dateRange = dateRange;
    },
    addDays(date, days) {
      const result = new Date(date);
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
</style>
<style>
.custom-date-picker-range {
  z-index: 1;
  top: 0;
  left: 5px;
  width: 100%;
  border-radius: 0;
  height: 100%;
  background-color: rgba(128, 216, 255, 0.2);
}
.date-picker-table table {
  border-collapse: collapse;
}
.custom-date-picker-range.start {
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
}
.custom-date-picker-range.end {
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  width: 32px;
}
.date-picker-table button.btn--flat {
  z-index: 2;
}
</style>
