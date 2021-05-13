import Vue from 'vue'

import { Pie, mixins, Bar } from 'vue-chartjs'
const { reactiveProp } = mixins

Vue.component('pie-chart', {
  extends: Pie,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
})
Vue.component('bar-chart', {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
})
