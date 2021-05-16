<template>
  <v-dialog :value="dialog" @input="close" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Rules List</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-col>
            <AddRule @newRule="newRule" />
          </v-col>
          <v-row>
            <v-col cols="12">
              <v-list two-line>
                <v-list-item-group>
                  <template v-for="(cond, ruleIndex) in rulesList">
                    <v-list-item :key="ruleIndex + 'condlist'">
                      <template>
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="cond.variable_id"
                          ></v-list-item-title>

                          <v-list-item-subtitle
                            class="text--primary"
                            v-text="cond.values"
                          ></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-btn icon @click="deleteRule(ruleIndex)">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="done"> Done </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import AddRule from '~/components/AddRule'
export default {
  components: {
    AddRule,
  },
  data: () => ({
    variable_select: '',
    function_select: '',
    tempObj: [],
    item: [{ title: 'a', headline: 'hi' }],
    selected: '',
    functions: [
      { name: '==', lambda: (y) => (x) => x === y },
      { name: '>', lambda: (y) => (x) => x > y },
      { name: '<', lambda: (y) => (x) => x < y },
      { name: '>=', lambda: (y) => (x) => x >= y },
      { name: '<=', lambda: (y) => (x) => x <= y },
    ],
  }),
  props: {
    dialog: { type: Boolean },
    itemIndex: { type: Number, required: true },
    conditionIndex: { type: Number, default: -1 },
  },
  computed: {
    rulesList() {
      if (this.conditionIndex === -1) {
        return this.tempObj
      } else if (
        this.$store.state.data[this.itemIndex].conditions[
          this.conditionIndex
        ] !== undefined
      ) {
        return this.$store.state.data[this.itemIndex].conditions[
          this.conditionIndex
        ].rules
      }
      return undefined
    },
  },
  methods: {
    newRule(rule) {
      if (this.conditionIndex !== -1) {
        this.$store.commit('newRule', {
          dataIndex: this.itemIndex,
          conditionIndex: this.conditionIndex,
          rule,
        })
      } else {
        this.tempObj.push(rule)
      }
    },
    deleteRule(ruleIndex) {
      if (this.conditionIndex !== -1)
        this.$store.commit('deleteRule', {
          dataIndex: this.itemIndex,
          conditionIndex: this.conditionIndex,
          ruleIndex,
        })
      else {
        this.$delete(this.tempObj, ruleIndex)
      }
    },
    done() {
      if (this.conditionIndex !== -1) {
        if (this.rulesList.length === 0) {
          // empty must remove case then
          this.$store.commit('deleteCase', {
            dataIndex: this.itemIndex,
            conditionIndex: this.conditionIndex,
          })
        }
      }
      if (this.tempObj.length > 0) {
        // this is new
        // and has more than one rule. must save
        this.$store.commit('addCase', {
          dataIndex: this.itemIndex,
          conditionIndex: this.conditionIndex,
          rulesList: this.rulesList,
        })
        this.tempObj = []
      }
      this.$emit('close')
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>
