<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark v-bind="attrs" v-on="on"> Add Rule </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add Rule</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-subheader v-text="'Select A Basic Variable'"></v-subheader>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="variable_select"
                :items="basic_variables"
                label="Variable Select"
                required
              ></v-select>
            </v-col>
            <v-col v-if="variable_select.length > 0" cols="12" sm="6">
              <v-subheader
                v-text="'Select the options that should trigger this case'"
              ></v-subheader>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-if="variable_select.length > 0"
                multiple
                v-model="values"
                :items="
                  $store.state.data.filter((x) => x.q == variable_select)[0]
                    .options
                "
              />
            </v-col>
            <!-- <v-col cols="12" sm="6">
              <v-select
                v-model="function_select"
                :items="functions.map((x) => x.name)"
                label="Function"
                required
              ></v-select>
            </v-col> -->
            <!-- <v-col
              ><v-text-field label="Value" v-model="value"></v-text-field
            ></v-col> -->
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
/* eslint-disable */
export default {
  data: () => ({
    dialog: false,
    variable_select: '',
    function_select: '',
    values: [],
  }),

  computed: {
    basic_variables() {
      return this.$store.state.data
        .filter((x) => x.state === 'Basic')
        .map((x) => x.q)
    },
  },
  methods: {
    close() {
      this.variable_select = ''
      this.values = []
      this.dialog = false
    },
    save() {
      if (this.values.length > 0 && this.variable_select !== '') {
        this.$emit('newRule', {
          variable_id: this.variable_select,
          values: this.values,
        })
      }
      this.close()
    },
  },
}
</script>
