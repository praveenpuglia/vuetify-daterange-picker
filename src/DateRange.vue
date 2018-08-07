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
  methods: {
    onPresetSelect(presetIndex) {
      this.startDate = this.presets[presetIndex].range[0];
      this.endDate = this.presets[presetIndex].range[1];
    },
    onDateRangeChange() {
      this.$emit('input', [this.startDate, this.endDate]);
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
