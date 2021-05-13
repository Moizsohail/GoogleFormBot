<template>
  <div>
    <p>Options</p>
    <v-row
      v-for="(x, j) in $store.state.data[itemIndex].options"
      :key="x"
      class="mb-n13"
    >
      <v-col cols="4">
        <v-subheader>{{ x }}</v-subheader>
      </v-col>
      <v-col cols="7">
        <v-text-field
          solo
          @change="(x) => updatePerc(x, j)"
          :value="
            $store.state.data[itemIndex].conditions[conditionIndex].result[j]
          "
          suffix="%"
        ></v-text-field>
      </v-col>
      <v-col cols="1" class="ml-n2 mt-1">
        <v-btn text depressed icon @click="() => optionDelete(j)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-right" cols="12">
        <small>Total {{ total }} out of 100</small>
      </v-col>
    </v-row>
    <v-container class="mt-4">
      <v-row>
        <v-text-field
          v-if="editor"
          v-model="newOption"
          @keyup="enter"
          filled
          @blur="editor = false"
          append-outer-icon="mdi-check"
          label="Add New Option"
          @click:append-outer="newOptionSave"
        ></v-text-field>
        <v-btn v-else @click="editor = true" text>Add More Option</v-btn>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  props: {
    conditionIndex: {
      type: Number,
      default: 0,
    },
    itemIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      newOption: '',
      editor: false,
    }
  },
  computed: {
    total() {
      return this.$store.state.data[this.itemIndex].conditions[
        this.conditionIndex
      ].result.reduce((x, y) => x + y, 0)
    },
  },
  methods: {
    enter({ key }) {
      if (key === 'Enter') {
        this.newOptionSave()
      }
    },
    optionDelete(optionIndex) {
      this.$store.commit('deleteOption', {
        dataIndex: this.itemIndex,
        optionIndex,
      })
    },
    updatePerc(newPercentage, resultIndex) {
      this.$store.commit('updatePerc', {
        conditionIndex: this.conditionIndex,
        resultIndex,
        dataIndex: this.itemIndex,
        percentage: newPercentage,
      })
    },
    newOptionSave() {
      if (this.newOption.length > 0) {
        this.$store.commit('addNewOption', {
          optionName: this.newOption,
          dataIndex: this.itemIndex,
        })
        this.newOption = ''
      }
      this.editor = false
    },
  },
}
</script>
