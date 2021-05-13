<template>
  <div>
    <div
      class="avatar"
      :style="{ 'animation-delay': offset * 0.7 + 's', width: width }"
    >
      <v-img :src="img" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    img: {
      type: String,
      required: true,
    },
    offset: {
      type: Number,
      default: 0,
    },
    width: {
      type: String,
      default: '150px',
    },
  },
}
</script>
<style scoped>
@keyframes float {
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translatey(-20px);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
}

.avatar {
  box-sizing: border-box;

  border-radius: 5%;
  overflow: hidden;
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
  transform: translatey(0px);
  animation: float 6s ease-in-out infinite;
}
.avatar img {
  width: 100%;
  height: auto;
}
</style>
