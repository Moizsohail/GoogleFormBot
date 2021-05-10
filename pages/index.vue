<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <v-btn elevation="2" @click="generate">Generate</v-btn>
        <downloadcsv :json-data="$store.state.generated"> </downloadcsv>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
  methods: {
    generate() {
      console.log('Generate')
      this.$store.commit('generate')
    },
  },
}
</script>
