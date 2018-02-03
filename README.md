# Vuetify Date Range Picker

> The missing date range picker for Vuetify JS you have been looking for.
> ![Date Range Picker](https://github.com/praveenpuglia/vuetify-daterange-picker/blob/master/public/updated-date-range-lres.gif)

## Heads Up

This is absolutely fresh and new for me. Help make this component better by
creating issues and if you like it, ⭐️ it. 🙌

# Requirements

You must have...

* Vue.JS
* VuetifyJS
* date-fns

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

## Usage

```vue
<template>
    <DateRange :options="dateRangeOptions" @input="onDateRangeChange"></DateRange>
</template>

<script>
import DateRange from 'vuetify-daterange-picker';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

export default {
  components: { DateRange },
  ...
};
</script>
```

## Props

#### `options` :

Options is an object that helps set up the component.

* `startDate`: **String**. In `YYYY-MM-DD` format. Prefill value for start date
  picker.
* `endDate`: **String**. In `YYYY-MM-DD` format. Prefill value for end date picker.
* `minDate`: **String**. The earliest date a user can select in `YYYY-MM-DD` format.
* `format`: **String**. The format in which you want the user to see the dates in
  the inputs. E.g. `MM/DD/YYYY`.
* `presets`: **Array**. An array of preset values like `Today`, `Yesterday` etc.
  It's an array of object that looks like this.

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

## Events

* `input`: **Array**. An array with start date and end date, triggered after every date
  selection.

## Thanks

* [VuetifyJS](https://vuetifyjs.com/)
* [Vue.JS](https://vuejs.org)
* [Moment.js](https://momentjs.com/)
* [poi](https://poi.js.org/#/)
* [bili](https://egoist.moe/bili/)
