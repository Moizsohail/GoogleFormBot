<template>
  <v-form ref="form" v-model="formValidation">
    <div id="editor" class="mt-16">
      <v-text-field
        v-if="nameEditor"
        v-model="temp"
        @keyup="enterNewName"
        @blur="newName"
        label="Press Enter"
        filled
        suffix=".csv"
      />
      <div v-else>
        <p class="text-h3 text-center" @click="openEditor">{{ csvname }}.csv</p>
        <p class="text-caption text-center">Click above to edit</p>
      </div>
      <div class="mt-12">
        <v-row class="pa-0 mainrow">
          <v-col cols="12" sm="6" class="pr-1">
            <v-expansion-panels v-model="current">
              <v-expansion-panel
                active
                v-for="(item, i) in $store.state.data"
                :key="i"
              >
                <v-expansion-panel-header>
                  <div v-if="editorQ !== i">Q.{{ i + 1 }} {{ item.q }}</div>
                  <v-text-field
                    v-else
                    label="Question"
                    v-model="newQuestion"
                    @click.stop
                    @keyup.prevent="
                      (event) => doneEditingQuestion({ event, index: i })
                    "
                  ></v-text-field>
                  <template v-slot:actions>
                    <v-btn
                      icon
                      text
                      depressed
                      class="upright"
                      @click.stop="(x) => deleteQ(i)"
                      ><v-icon>mdi-delete</v-icon></v-btn
                    >
                    <v-btn
                      v-if="editorQ === i"
                      class="upright"
                      @click.stop="doneEditingQuestion({ index: i })"
                      depressed
                      icon
                      text
                    >
                      <v-icon> mdi-check </v-icon>
                    </v-btn>

                    <v-btn
                      class="upright"
                      v-else
                      @click.stop="editQuestion(i)"
                      depressed
                      icon
                      text
                    >
                      <v-icon> mdi-rename-box </v-icon>
                    </v-btn>
                    <v-icon v-if="totalCheck(i, 0)" color="error">
                      mdi-alert-circle
                    </v-icon>
                    <v-icon v-else color="primary"> $expand </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row class="mb-n10">
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="type"
                        label="Type"
                        :value="item.type"
                        @change="switch_type(x, i)"
                        solo
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="['Basic', 'Conditional']"
                        label="State"
                        :value="item.state"
                        @change="switch_state(i)"
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <div v-if="item.state == 'Basic'">
                        <Percentages :itemIndex="i" />
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div v-if="item.state == 'Conditional'">
                        <v-btn @click="newCaseOpen" class="mt-n16 mb-n5"
                          >Add Case</v-btn
                        >

                        <AddCondition
                          class="ma-0"
                          :itemIndex="i"
                          :dialog="dialog"
                          @close="dialog = false"
                          :conditionIndex="conditionIndex"
                        />
                        <v-expansion-panels v-model="currentActiveCondition">
                          <v-expansion-panel
                            active
                            v-for="(cond, conditionIndex) in item.conditions"
                            :key="'cond' + conditionIndex"
                          >
                            <v-expansion-panel-header>
                              {{ condition_title(cond, conditionIndex) }}
                              <template v-slot:actions>
                                <v-btn
                                  v-if="
                                    condition_title(cond, conditionIndex) !==
                                    'Default'
                                  "
                                  class="upright"
                                  @click.stop="editCaseOpen(conditionIndex)"
                                  depressed
                                  icon
                                  text
                                >
                                  <v-icon> mdi-pencil </v-icon>
                                </v-btn>

                                <v-icon
                                  v-if="totalCheck(i, conditionIndex)"
                                  color="error"
                                >
                                  mdi-alert-circle
                                </v-icon>
                                <v-icon v-else color="primary">
                                  $expand
                                </v-icon>
                              </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <Percentages
                                :itemIndex="i"
                                :conditionIndex="conditionIndex"
                              />
                            </v-expansion-panel-content> </v-expansion-panel
                        ></v-expansion-panels>
                      </div>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col cols="12" sm="6" class="pr-1"
            ><v-card>
              <v-container class="pt-6 pl-5 pr-5">
                <v-row>
                  <p class="text-h6 ml-3 mt-2 mb-0">Other Info</p>
                  <v-col cols="12" class="mb-n8">
                    <DateRangePicker />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      filled
                      label="Total Rows"
                      :rules="[rules.required, rules.numeric]"
                      prepend-icon="mdi-sigma"
                      @change="updateTotal"
                      :value="total"
                    />
                  </v-col>
                  <div v-if="typeof this.current === 'undefined'"></div>
                  <v-col v-else class="mt-n6 ml-0" cols="12">
                    <p class="text-h6 mb-0">Summary</p>
                    <v-container>
                      <p class="text-body-2">
                        Current Question {{ this.current + 1 }}
                        <client-only>
                          <pie-chart :chartData="pieData"></pie-chart>
                          <bar-chart
                            :chartData="barData"
                            :options="barChartOptions"
                          ></bar-chart>
                        </client-only>
                      </p>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <v-row justify="center" class="mt-6 mb-16" align="center">
        <v-col cols="12" sm="8" md="6">
          <div class="text-center">
            <v-btn elevation="2" color="primary" @click="generate"
              >Generate</v-btn
            >
          </div>
        </v-col>
      </v-row>
      <SpeedDial id="speeddial" />
    </div>
  </v-form>
</template>
<script>
/* eslint-disable */

import Percentages from '~/components/Percentages'
import DateRangePicker from '~/components/DateRangePicker.vue'

export default {
  data() {
    return {
      barChartOptions: {
        scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
      },
      rules: {
        required: (value) => !!value || 'Required.',
        numeric: (value) => {
          const pattern = new RegExp('^[0-9]*$')
          return pattern.test(value) || 'Must Be Numeric.'
        },
      },
      currentActiveCondition: undefined,
      totalEditor: false,
      nameEditor: false,
      dialog: false,
      conditionIndex: -1,
      select: '',
      newQuestion: '',
      type: ['Radio'],
      options: ['Basic', 'Conditional'],
      current: undefined,
      editorQ: -1,
      formValidation: false,
      csvname: 'mysurvey',
    }
  },
  components: { Percentages, DateRangePicker },

  computed: {
    pieData() {
      if (typeof this.current === 'number') {
        const condI =
          typeof this.currentActiveCondition === 'number'
            ? this.currentActiveCondition
            : 0
        return {
          labels: this.$store.state.data[this.current].options,
          datasets: [
            {
              label: 'Dataset 1',
              data: this.$store.state.data[this.current].conditions[condI]
                .result,
              backgroundColor: [
                '#003f5c',
                '#2f4b7c',
                '#665191',
                '#a05195',
                '#d45087',
                '#f95d6a',
                '#ff7c43',
                '#ffa600',
              ],
            },
          ],
        }
      }
    },
    pieData() {
      if (typeof this.current === 'number') {
        const condI =
          typeof this.currentActiveCondition === 'number'
            ? this.currentActiveCondition
            : 0
        return {
          labels: this.$store.state.data[this.current].options,
          datasets: [
            {
              label: 'Dataset 1',
              data: this.$store.state.data[this.current].conditions[condI]
                .result,
              backgroundColor: [
                '#003f5c',
                '#2f4b7c',
                '#665191',
                '#a05195',
                '#d45087',
                '#f95d6a',
                '#ff7c43',
                '#ffa600',
              ],
            },
          ],
        }
      }
    },
    barData() {
      if (typeof this.current === 'number') {
        const condI =
          typeof this.currentActiveCondition === 'number'
            ? this.currentActiveCondition
            : 0
        return {
          labels: this.$store.state.data[this.current].options,
          datasets: [
            {
              label: 'Distribution',
              data: this.$store.state.data[this.current].conditions[condI]
                .result,
              backgroundColor: '#003f5c',
            },
          ],
        }
      }
    },
    total() {
      return this.$store.state.total
    },
    totalCheck() {
      return (itemIndex, conditionIndex) => {
        return (
          this.$store.state.data[itemIndex].conditions[
            conditionIndex
          ].result.reduce((x, y) => x + y, 0) !== 100
        )
      }
    },

    condition_title() {
      return (cond, i) => {
        if (cond.rules === undefined) return 'Default'
        else return 'Case ' + i
      }
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    updateTotal(x) {
      this.$store.commit('updateTotal', { total: x })
    },
    openEditor(x) {
      this.nameEditor = true
      this.temp = this.csvname
    },
    enterNewName(x) {
      if (x.key === 'Enter') {
        this.csvname = this.temp
        this.nameEditor = false
      }
    },
    newName(x) {
      this.csvname = this.temp
      this.nameEditor = false
    },
    deleteQ(i) {
      this.$store.commit('deleteQuestion', { dataIndex: i })
    },

    editQuestion(i) {
      this.newQuestion = this.$store.state.data[i].q
      this.editorQ = i
    },
    doneEditingQuestion({ event, index }) {
      if (event === undefined || event.key === 'Enter') {
        this.$store.commit('updateQuestion', {
          question: this.newQuestion,
          dataIndex: index,
        })
        this.editorQ = -1
      }
    },
    newCaseOpen() {
      this.dialog = true
      this.conditionIndex = -1
    },
    editCaseOpen(x) {
      this.dialog = true
      this.conditionIndex = x
    },
    switch_type(x, i) {
      // this.$store.commit('switch_type',{type:x,index:i})
    },
    switch_state(i) {
      this.$store.commit('switch_state', i)
    },
    generate() {
      if (this.$refs.form.validate()) {
        this.$store.commit('generate')
        downloadObjectAsJson(this.$store.state.data, 'a.txt')
        function downloadObjectAsJson(exportObj, exportName) {
          var dataStr =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(exportObj))
          var downloadAnchorNode = document.createElement('a')
          downloadAnchorNode.setAttribute('href', dataStr)
          downloadAnchorNode.setAttribute('download', exportName + '.json')
          document.body.appendChild(downloadAnchorNode) // required for firefox
          downloadAnchorNode.click()
          downloadAnchorNode.remove()
        }
        return
        const json = this.$store.state.generated
        let fields = Object.keys(json[0])
        // console.log(fields)
        var replacer = function (key, value) {
          return value === null ? '' : value
        }
        // console.log(fields)
        var csv = json.map((row) => {
          return fields
            .map((fieldName) => {
              return JSON.stringify(row[fieldName], replacer)
            })
            .join(',')
        })
        fields = fields.map((x) => '"' + x + '"')
        csv.unshift(fields.join(',')) // add header column
        csv = csv.join('\r\n')

        var fileURL = window.URL.createObjectURL(new Blob([csv]))

        var fileLink = document.createElement('a')

        fileLink.href = fileURL

        fileLink.setAttribute('download', this.csvname + '.csv')

        document.body.appendChild(fileLink)

        fileLink.click()
      }
    },
  },
}
</script>
<style scoped>
#speeddial {
  position: fixed !important;
  bottom: 30px !important;
  right: 10px;
  z-index: 2000;
}
.upright i {
  transform: unset !important;
}
@media only screen and (max-width: 600px) {
  .mainrow {
    flex-direction: column-reverse;
  }
}
</style>
<style>
.v-main__wrap {
  background-color: rgb(230, 230, 230);
}
</style>
