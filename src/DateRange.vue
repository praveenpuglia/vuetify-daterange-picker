<template>
  <div class="date-range">
    <div class="date-range__presets">
      <v-list>
        <v-subheader>Presets</v-subheader>
        <v-list-tile
          v-model="isPresetActive[index]"
          ripple
          v-for="(preset, index) in presets"
          :key="index"
          @click="onPresetSelect(index)">
          <v-list-tile-content>
            {{ preset.label }}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <div class="date-range__pickers">
      <div class="date-range__picker date-range__pickers--start">
        <v-text-field
          name="startDate"
          :label="`Start Date(${format})`"
          class="date-range__pickers-input"
          prepend-icon="event"
          v-model="formattedStartDate"
          readonly/>
        <v-date-picker
          @change="onDateRangeChange"
          :allowed-dates="allowedStartDates"
          no-title
          v-model="startDate"/>
      </div>
      <div class="date-range__picker date-range__picker--end">
        <v-text-field
          name="endDate"
          :label="`End Date(${format})`"
          v-model="formattedEndDate"
          class="date-range__pickers-input"
          readonly/>
        <v-date-picker
          @change="onDateRangeChange"
          :allowed-dates="allowedEndDates"
          no-title
          v-model="endDate"/>
      </div>
    </div>
  </div>   
</template>

<script>
import { format } from 'date-fns';

export default {
  props: {
    options: {
      type: Object,
      required: true,
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
        preset => preset.range[0] === this.startDate && preset.range[1] === this.endDate
      );
    },
    allowedStartDates() {
      return {
        min: this.options.minDate,
        max: this.endDate,
      };
    },
    allowedEndDates() {
      return {
        min: this.startDate,
        max: format(new Date(), 'YYYY-MM-DD'),
      };
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
