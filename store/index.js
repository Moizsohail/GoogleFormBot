export const state = () => ({
  generated: [],
  total: 218,
  data: [
    {
      q: 'What age group do you belong to?',
      options: ['17-20', '21-24', '25-28'],
      conditions: [
        {
          result: [25, 50, 25],
        },
      ],
    },
    {
      q: 'Please identify your gender',
      options: [
        'Female',
        'Male',
        'Prefer not to say',
        'Non-binary',
        'Gender fluid',
        '',
      ],
      conditions: [
        {
          result: [40, 40, 5, 3, 2],
        },
      ],
    },
    {
      q: 'Are you currently studying in Pakistan?',
      options: ['Yes', 'No'],
      conditions: [
        {
          result: [50, 50],
        },
      ],
    },
    {
      q: 'What degree are you currently pursuing?',
      options: ["Bachelor's", "Master's", 'Other'],
      conditions: [
        {
          result: [85, 15, 0],
        },
      ],
    },
    {
      q: "I want to return Ali's favour as soon as possible so I do not feel indebted to him. ",
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          variable_id: 'Are you currently studying in Pakistan?',
          lambda: (x) => x === 'Yes',
          result: [35, 30, 15, 5, 15],
        },
        {
          result: [10, 25, 35, 15, 15],
        },
      ],
    },
    {
      q: 'When I do something extra for my peers, I normally expect them to return any favours I do for them right away.',
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          variable_id: 'Are you currently studying in Pakistan?',
          lambda: (x) => x === 'Yes',
          result: [35, 30, 15, 5, 15],
        },
        {
          result: [10, 25, 35, 15, 15],
        },
      ],
    },
    {
      q: 'When Ali needs help, I will also help him for one hour to finish one assignment. ',
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          variable_id: 'Are you currently studying in Pakistan?',
          lambda: (x) => x === 'Yes',
          result: [5, 10, 15, 30, 40],
        },
        {
          result: [10, 25, 35, 15, 15],
        },
      ],
    },
    {
      q: 'When exchanging academic assistance, I pay attention to what I received relative to what I offered.',
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          variable_id: 'Are you currently studying in Pakistan?',
          lambda: (x) => x === 'Yes',
          result: [5, 10, 15, 30, 40],
        },
        {
          result: [10, 25, 35, 15, 15],
        },
      ],
    },
    {
      q: 'I am more concerned about helping Ali finish his assignment than completing mine. ',
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          variable_id: 'Are you currently studying in Pakistan?',
          lambda: (x) => x === 'Yes',
          result: [5, 10, 15, 30, 40],
        },
        {
          result: [10, 5, 25, 35, 25],
        },
      ],
    },
    {
      q: "If necessary, I will put Ali's need to complete the assignment above my own.",
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          variable_id: 'Are you currently studying in Pakistan?',
          lambda: (x) => x === 'Yes',
          result: [5, 10, 15, 30, 40],
        },
        {
          result: [10, 5, 25, 35, 25],
        },
      ],
    },
    {
      q: 'While exchanging academic assistance, my peers and I try to do what is best for each other. ',
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          variable_id: 'Are you currently studying in Pakistan?',
          lambda: (x) => x === 'Yes',
          result: [5, 10, 15, 30, 40],
        },
        {
          result: [10, 5, 25, 35, 25],
        },
      ],
    },
    {
      q: 'While exchanging academic assistance, my peers and I try to do what is best for our own self interests. ',
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          variable_id: 'Are you currently studying in Pakistan?',
          lambda: (x) => x === 'Yes',
          result: [35, 30, 15, 5, 15],
        },
        {
          result: [10, 5, 25, 35, 25],
        },
      ],
    },
    {
      q: "I can't wait for Ahmad to need my help one day, so that I can leave him hanging just like he did. ",
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          variable_id: 'Are you currently studying in Pakistan?',
          lambda: (x) => x === 'Yes',
          result: [5, 10, 15, 30, 40],
        },
        {
          result: [5, 5, 5, 30, 55],
        },
      ],
    },
    {
      q: 'I expect my peers to immediately deny me a favor if I have refused to help them recently instead of seeking retribution in the future.',
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          variable_id: 'Are you currently studying in Pakistan?',
          lambda: (x) => x === 'Yes',
          result: [5, 10, 15, 30, 40],
        },
        {
          result: [5, 5, 5, 30, 55],
        },
      ],
    },
    {
      q: 'I will also refuse to help Ahmad twice because he refused to help me twice. ',
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          variable_id: 'Are you currently studying in Pakistan?',
          lambda: (x) => x === 'Yes',
          result: [35, 30, 15, 5, 15],
        },
        {
          result: [55, 25, 15, 3, 2],
        },
      ],
    },
    {
      q: 'When someone refuses to exchange academic assistance, I pay attention to the size of the favor denied and intend to deny one of similar size.',
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          variable_id: 'Are you currently studying in Pakistan?',
          lambda: (x) => x === 'Yes',
          result: [35, 30, 15, 5, 15],
        },
        {
          result: [55, 25, 15, 3, 2],
        },
      ],
    },
    {
      q: 'I am more concerned about helping Ahmad finish his assignment than completing mine. ',
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          variable_id: 'Are you currently studying in Pakistan?',
          lambda: (x) => x === 'Yes',
          result: [35, 30, 15, 5, 15],
        },
        {
          result: [55, 25, 15, 3, 2],
        },
      ],
    },
    {
      q: "If necessary, I will put Ahmad's need to complete the assignment above my own by helping him.",
      options: ['1', '2', '3', '4', '5'],
      conditions: [
        {
          variable_id: 'Are you currently studying in Pakistan?',
          lambda: (x) => x === 'Yes',
          result: [35, 30, 15, 5, 15],
        },
        {
          result: [55, 25, 15, 3, 2],
        },
      ],
    },
  ],
})
/* eslint-disable */
export const mutations = {
  generate(state) {
    const conditionals = state.data.filter(
      (x) => x.conditions !== undefined && x.conditions.length > 1
    )
    const infinte = state.data.filter((x) => x.conditions !== undefined)
    const basics = state.data.filter(
      (x) => x.conditions !== undefined && x.conditions.length === 1
    )
    if (state.generated.length != state.total) {
      state.generated = []
      for (let i = 0; i < state.total; i++) {
        state.generated.push({})
      }
    }
    // basics
    basics.forEach((basic) => {
      const index = distribute(basic.conditions[0].result, state.total)
      index.forEach((x, i) => {
        state.generated[i][basic.q] = basic.options[x]
      })
    })
    conditionals.forEach((cond) => {
      // console.log(state.generated)
      const temp_generated = state.generated.slice(0)
      const index_groups = []
      for (let i = 0; i < cond.conditions.length - 1; i++) {
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
      console.log(state.generated)
    })
  },
}

function remaining(array) {
  const rem_index = []
  array.forEach((x, i) => {
    if (x !== undefined) rem_index.push(i)
  })
  return rem_index
}
function groupby(condition, array) {
  console.log(condition)
  const met_index = []
  const unmet = []
  array.forEach((x, i) => {
    if (array[i] != undefined && condition.lambda(x[condition.variable_id])) {
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
    // console.log('X')
    // console.log(x + completed)
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
