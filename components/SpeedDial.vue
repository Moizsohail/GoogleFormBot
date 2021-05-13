<template>
  <v-btn
    v-model="fab"
    class="fabbtn"
    @click="addNewQuestion"
    color="blue darken-2"
    dark
    fab
  >
    <v-icon> mdi-plus </v-icon>
  </v-btn>
  <!-- <v-speed-dial v-model="fab" right bottom open-on-hover>
    <template v-slot:activator>
      <v-btn v-model="fab" color="blue darken-2" dark fab>
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> mdi-plus </v-icon>
      </v-btn>
    </template>
    <v-btn fab dark small color="green">
      <v-icon>mdi-radiobox-blank</v-icon>
    </v-btn>

    <v-btn fab dark small color="red">
      <v-icon>mdi-format-text</v-icon>
    </v-btn>
  </v-speed-dial> -->
</template>
<script>
export default {
  data() {
    return {
      fab: false,
    }
  },
  methods: {
    addNewQuestion() {
      this.$store.commit('addNewQuestion')
    },
  },
}
</script>
<style scoped></style>
