<template>
  <div class="v-date-range">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      offset-y
      v-bind="menuProps"
    >
      <div slot="activator" class="v-date-range__input">
        <v-text-field
          class="v-date-range__input-field"
          :value="inputValue"
          readonly
          :placeholder="placeholder"
          v-bind="inputProps"
        ></v-text-field>
      </div>
      <v-card class="v-date-range__menu-content">
        <v-card-text>
          <div class="v-date-range__pickers">
            <v-card-title v-if="$slots.title">
              <slot name="title" v-if="$slots.title"></slot>
            </v-card-title>
            <v-card-text>
              <v-date-picker
                class="mr-4"
                v-model="pickerStart"
                :locale="locale"
                :min="min"
                :max="max"
                :no-title="noTitle"
                :next-icon="nextIcon"
                :prev-icon="prevIcon"
              ></v-date-picker>
              <v-date-picker
                v-model="pickerEnd"
                :locale="locale"
                :min="min"
                :max="max"
                :no-title="noTitle"
                :next-icon="nextIcon"
                :prev-icon="prevIcon"
              ></v-date-picker>
            </v-card-text>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="menu = false">Cancel</v-btn>
          <v-btn @click="applyRange" color="primary">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import { format } from 'date-fns';
const defaultDate = format(new Date(), 'YYYY-MM-DD');
export default {
  name: 'v-date-range',
  props: {
    // Take start and end as the input. Passable via v-model.
    value: {
      type: Object,
      default: () => {
        return { start: defaultDate, end: defaultDate };
      }
    },
    // Denotes the Placeholder string for start date.
    startLabel: {
      type: String,
      default: 'Start Date'
    },
    // Denotes the Placeholder string for start date.
    endLabel: {
      type: String,
      default: 'End Date'
    },
    // The string that gets placed between `startLabel` and `endLabel`
    separatorLabel: {
      type: String,
      default: 'To'
    },
    /**
     * Following values are all passable to vuetify's own datepicker
     * component.
     */
    // Min selectable date.
    min: {
      type: String,
      default: undefined
    },
    // Max selectable date
    max: {
      type: String,
      default: undefined
    },
    // Locale
    locale: {
      type: String,
      default: 'en-us'
    },
    noTitle: {
      type: Boolean,
      default: false
    },
    displayFormat: {
      type: String
    },
    /**
     * Icons
     */
    nextIcon: {
      type: String,
      default: '$vuetify.icons.next'
    },
    prevIcon: {
      type: String,
      default: '$vuetify.icons.prev'
    },
    inputProps: {
      type: Object,
      default: () => {
        return {};
      }
    },
    menuProps: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      menu: false,
      pickerStart: this.value.start,
      pickerEnd: this.value.end
    };
  },
  computed: {
    inputValue() {
      if (this.isValueEmpty) {
        return '';
      }
      const start = this.displayFormat
        ? this.formatDate(this.value.start, this.displayFormat)
        : this.value.start;
      const end = this.displayFormat
        ? this.formatDate(this.value.end, this.displayFormat)
        : this.value.end;
      return `${start}    ${this.separatorLabel}     ${end}`;
    },
    placeholder() {
      return `${this.startLabel}    ${this.separatorLabel}    ${this.endLabel}`;
    },
    /**
     * If the value prop doesn't have any start value,
     * its most likely that an empty object was passed.
     */
    isValueEmpty() {
      return !this.value.start;
    }
  },
  methods: {
    /**
     * Emit the input event with the updated range data.
     * This makes v-model work.
     */
    applyRange() {
      this.$emit('input', {
        start: this.pickerStart,
        end: this.pickerEnd
      });
      this.menu = false;
    },
    /**
     * Called every time the menu is closed.
     * It also emits an event to tell the parent
     * that the menu has closed.
     *
     * Upon closing the datepicker values are set
     * to the current selected value.
     */
    onMenuClose() {
      // Reset the changed values for datepicker models.
      this.pickerStart = this.value.start;
      this.pickerEnd = this.value.end;
      this.$emit('menu-closed');
    },
    formatDate(date, fmt) {
      return format(new Date(date), fmt);
    }
  },
  watch: {
    // Watching to see if the menu is closed.
    menu(isOpen) {
      if (!isOpen) {
        this.onMenuClose();
      }
    }
  }
};
</script>
<style scoped>
.v-date-range__input-field >>> input {
  text-align: center;
}
</style>
