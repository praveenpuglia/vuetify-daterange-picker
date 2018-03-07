# Vuetify Date Range Picker

> The missing date range picker for Vuetify JS you have been looking for. ![Date Range Picker](https://raw.githubusercontent.com/praveenpuglia/vuetify-daterange-picker/1eb3ba1d/public/updated-date-range-lres.gif)

## Heads Up

This is absolutely fresh and new for me. Help make this component better by creating issues and if you like it, ⭐️ it. 🙌

## Demo

[![Edit vuetify-daterange-picker](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/54yno7n89p?module=%2FApp.vue)

## Requirements

You must have...

* [VuetifyJS](https://vuetifyjs.com/)
* [Vue.JS](https://vuejs.org)
* [date-fns](https://date-fns.org)

## Features

* Preset Selection
* Automatically highlight preset based on chosen date.
* Custom format
* Material Design (Obviously!)

## Installation

```sh
npm install vuetify-daterange-picker
OR
yarn add vuetify-daterange-picker
```

The latest version(2.x) is compatible with Vuetify JS 1.x+. If you use vuetify JS you can use the version 1.2.0 or lower.

## Usage

```vue
<template>
    <v-daterange :options="dateRangeOptions" @input="onDateRangeChange"></v-daterange>
</template>

<script>
// If you want to register this as a global component then
// in main.js
import VDateRagnge from 'vuetify-daterange-picker';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

Vue.use(VDateRange);
</script>

<script>
// If you want to use in one of your components.
import DateRange from 'vuetify-daterange-picker';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

export default {
  components: { DateRange.name: DateRange },
  ...
};
</script>
```

## Props

#### `options` : Object

Options is an object that helps set up the component.

* `startDate`: **String**. In `YYYY-MM-DD` format. Prefill value for start date picker.
* `endDate`: **String**. In `YYYY-MM-DD` format. Prefill value for end date picker.
* `minDate`: **String**. The earliest date a user can select in `YYYY-MM-DD` format.
* `format`: **String**. The format in which you want the user to see the dates in the inputs. E.g. `MM/DD/YYYY`.
* `presets`: **Array**. An array of preset values like `Today`, `Yesterday` etc. It's an array of object that looks like this.

```js
presets: [
  {
    label: 'Today',
    range: [
      '2018-01-01', //start date. YYYY-MM-DD
      '2018-02-01', // end date. YYYY-MM-DD
    ],
  },
];
```

#### `no-presets` : Boolean

If you do not want a presets list you can use this boolean and you'll only see the pickers with input.

## Events

* `input`: **Array**. An array with start date and end date, triggered after every date selection.

## Thanks

* [VuetifyJS](https://vuetifyjs.com/)
* [Vue.JS](https://vuejs.org)
* [date-fns](https://date-fns.org)
* [poi](https://poi.js.org/#/)
* [bili](https://egoist.moe/bili/)
