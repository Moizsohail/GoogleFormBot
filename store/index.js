export const state = () => ({
  generated: [],
  // functions: [
  //   { name: '==', lambda: (y) => (x) => x === y },
  //   { name: '>', lambda: (y) => (x) => x > y },
  //   { name: '<', lambda: (y) => (x) => x < y },
  //   { name: '>=', lambda: (y) => (x) => x >= y },
  //   { name: '<=', lambda: (y) => (x) => x <= y },
  // ],
  dateRange: ['2021-05-10', '2021-05-20'],
  total: 218,
  data: [
    {
      type: 'Radio',
      state: 'Basic',
      q: 'What age group do you belong to?',
      options: ['17-20', '21-24', '25-28'],
      conditions: [
        {
          result: [25, 50, 25],
        },
      ],
    },
    {
      type: 'Radio',
      state: 'Basic',
      q: 'Are you currently studying in Pakistan?',
      options: ['Yes', 'No'],
      conditions: [
        {
          result: [50, 50],
        },
      ],
    },

    {
      type: 'Radio',
      state: 'Conditional',
      q: "I want to return Ali's favour as soon as possible so I do not feel indebted to him. ",
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          result: [10, 25, 35, 15, 15],
        },
        {
          rules: [
            {
              variable_id: 'Are you currently studying in Pakistan?',
              values: ['Yes'],
            },
          ],
          result: [35, 30, 15, 5, 15],
        },
      ],
    },
    {
      type: 'Radio',
      state: 'Conditional',
      q: 'When I do something extra for my peers, I normally expect them to return any favours I do for them right away.',
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          result: [10, 25, 35, 15, 15],
        },
        {
          rules: [
            {
              variable_id: 'Are you currently studying in Pakistan?',
              values: ['Yes'],
            },
          ],

          result: [35, 30, 15, 5, 15],
        },
      ],
    },
  ],
})
/* eslint-disable */
export const mutations = {
  newDate(state, { dateRange }) {
    if (dateRange.length == 2) {
      state.dateRange = dateRange.sort((x, y) => new Date(x) - new Date(y))
    } else state.dateRange = dateRange
  },
  deleteOption(state, { dataIndex, optionIndex }) {
    this._vm.$delete(state.data[dataIndex].options, optionIndex)
    state.data[dataIndex].conditions.forEach((cond) =>
      this._vm.$delete(cond.result, optionIndex)
    )
  },
  deleteQuestion(state, { dataIndex }) {
    this._vm.$delete(state.data, dataIndex)
  },
  addNewQuestion(state) {
    state.data.push({
      type: 'Radio',
      state: 'Basic',
      q: 'Empty',
      options: [],
      conditions: [{ result: [] }],
    })
  },
  updateQuestion(state, { dataIndex, question }) {
    state.data[dataIndex].q = question
  },
  newRule(state, { dataIndex, conditionIndex, rule }) {
    state.data[dataIndex].conditions[conditionIndex].rules.push(rule)
  },
  addCase(state, { dataIndex, rulesList }) {
    const newResult = state.data[dataIndex].options.map((x) => 0)
    state.data[dataIndex].conditions.push({
      rules: rulesList,
      result: newResult,
    })
  },
  deleteCase(state, { dataIndex, conditionIndex }) {
    this._vm.$delete(state.data[dataIndex].conditions, conditionIndex)
  },
  deleteRule(state, { dataIndex, conditionIndex, ruleIndex }) {
    this._vm.$delete(
      state.data[dataIndex].conditions[conditionIndex].rules,
      ruleIndex
    )
  },
  updatePerc(state, { conditionIndex, resultIndex, dataIndex, percentage }) {
    this._vm.$set(
      state.data[dataIndex].conditions[conditionIndex].result,
      resultIndex,
      parseInt(percentage)
    )
    // [resultIndex] =
    //   parseInt(percentage)
  },
  addNewOption(state, { optionName, dataIndex }) {
    state.data[dataIndex].options.push(optionName)
    state.data[dataIndex].conditions.forEach((x) => x.result.push(0))
  },
  switch_state(state, i) {
    if (state.data[i].state === 'Basic') {
      state.data[i].state = 'Conditional'
    } else {
      state.data[i].state = 'Basic'
    }
  },
  updateTotal(state, { total }) {
    state.total = total
  },
  generate(state) {
    let dateIndex = []
    for (let i = 0; i < state.total; i++) {
      dateIndex.push(
        randomDate(new Date(state.dateRange[0]), new Date(state.dateRange[1]))
      )
    }
    dateIndex = dateIndex.sort((x, y) => new Date(x) - new Date(y))

    const conditionals = state.data.filter((x) => x.state === 'Conditional')

    const basics = state.data.filter((x) => x.state === 'Basic')
    if (state.generated.length != state.total) {
      state.generated = []
      for (let i = 0; i < state.total; i++) {
        state.generated.push({ index: dateIndex[i] })
      }
    }
    // basics
    basics.forEach((basic) => {
      const index = distribute(basic.conditions[0].result, state.total)
      index.forEach((x, i) => {
        state.generated[i][basic.q] = basic.options[x]
      })
    })
    const temp = state.generated.slice()
    // console.log(temp[0])
    console.log(groupby(conditionals[0].conditions[1], temp))
    console.log(remaining(temp))
    conditionals.forEach((cond) => {
      const temp_generated = state.generated.slice(0)
      const index_groups = []
      for (let i = 1; i < cond.conditions.length; i++) {
        const index = groupby(cond.conditions[i], temp_generated)
        index_groups.push(index)
      }
      state.generated[cond.q] = []
      index_groups.push(remaining(temp_generated))
      index_groups.forEach((indexes, i) => {
        const temp = distribute(cond.conditions[i].result, indexes.length)

        indexes.forEach(
          (x, i) => (state.generated[x][cond.q] = cond.options[temp[i]])
        )
      })
    })
  },
}
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

function remaining(array) {
  const rem_index = []
  array.forEach((x, i) => {
    if (x !== undefined) rem_index.push(i)
  })
  return rem_index
}
function lambdaCheck(rulesList, x) {
  return rulesList.reduce(
    (prev, rule) => rule.values.includes(x[rule.variable_id]) && prev,
    true
  )
}
function groupby(condition, array) {
  console.log(condition)
  const met_index = []
  const unmet = []
  array.forEach((x, i) => {
    if (array[i] != undefined && lambdaCheck(condition.rules, x)) {
      met_index.push(i)
      array[i] = undefined
    }
  })
  return met_index
}
function distribute(result, total) {
  let props = result.map((x) => (x / 100) * total * 0.95)
  const index = []
  let completed = 0
  let prev = -1

  props.forEach((x, ind) => {
    for (let i = 0; i < x; i++) {
      index.push(ind)
    }
    // completed = completed + Math.ceil(x)
  })

  while (index.length < total) {
    index.push(Math.floor(Math.random() * props.length))
  }
  shuffleArray(index)
  return index
}
function shuffleArray(array) {
  for (var i = array.length - 1; i > array.length / 2; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
