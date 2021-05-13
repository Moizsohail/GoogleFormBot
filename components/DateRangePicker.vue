<template>
  <v-dialog ref="dialog" v-model="modal" persistent width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="dateRangeText"
        label="Range Of Dates"
        filled
        readonly
        :rules="[rules.required, rules.numeric, rules.notSame]"
        prepend-icon="mdi-calendar"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker :value="dates" @input="selected" range scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(dates)"> OK </v-btn>
    </v-date-picker>
  </v-dialog>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      modal: false,
      rules: {
        required: (value) => !!value || 'Required.',
        numeric: (value) => {
          const pattern = /^[0-9-]* ~ [0-9-]*$/
          return pattern.test(value) || 'Need A Valid Range.'
        },
        notSame: (value) => {
          if (value.split('~').length === 2) {
            return (
              value.split('~')[0].trim() !== value.split('~')[1].trim() ||
              'Must be two different dates'
            )
          } else return true
        },
      },
    }
  },

  methods: {
    selected(x) {
      console.log(x)
      this.$store.commit('newDate', { dateRange: x })
    },
  },
  computed: {
    dates() {
      return this.$store.state.dateRange
    },
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
  },
}
</script>
