<template>
  <div>
    <v-row class="mt-16" :justify="'space-between'">
      <v-col cols="5">
        <div class="textbox mt-14">
          <p class="text-h3 title">Fake Survey Data Generator</p>
          <p class="text-subtitle-1">
            Tired of begging your friends to fill your survey? Worry not we have
            an app for you.
          </p>
          <v-row class="ml-0 mt-2">
            <v-btn color="primary" @click="$router.push('editor')"
              >Get Started</v-btn
            >
            <v-btn
              depressed
              text
              outlined
              color="primary"
              class="ml-1 tutorialbtn"
            >
              Tutorials</v-btn
            >
          </v-row>
        </div> </v-col
      ><v-col cols="5" class="floatingGrid">
        <div class="aestheticCircle primary"></div>
        <FloatingImage
          class="floatingImage"
          v-for="(image, imageIndex) in images"
          :img="image.src"
          :id="'floating' + imageIndex"
          :width="image.width"
          :key="imageIndex"
          :offset="imageIndex"
        /> </v-col
    ></v-row>
    <div class="mt-16">
      <p class="text-h6 title">Other Projects</p>
      <v-row>
        <ShinyCard
          :card="card"
          v-for="(card, cardIndex) in shinyCards"
          :key="'card' + cardIndex"
        />
      </v-row>
    </div>
  </div>
</template>
<script>
import FloatingImage from '~/components/FloatingImage'
import ShinyCard from '~/components/ShinyCard'
export default {
  components: {
    FloatingImage,
    ShinyCard,
  },
  data() {
    return {
      shinyCards: [
        {
          src: 'https://github.com/Moizsohail/Moizsohail.github.io/blob/master/static/110334900_3377028352329334_3933550635219853555_o.jpg?raw=true',
          link: 'https://moizsohail.github.io',
          title: 'ZSCM',
        },
        {
          src: require('~/assets/Portfolio ss.png'),
          link: 'https://moizsohail.github.io',
          title: 'Other Projects',
        },
      ],
      images: [
        {
          src: 'https://cdn.lynda.com/course/630615/630615-637478778434463746-16x9.jpg',
          width: '250px',
        },
        {
          src: 'https://www.xda-developers.com/files/2018/09/microsoft-excel-logo.png',
          width: '150px',
        },

        {
          src: 'https://miro.medium.com/max/3840/0*MkEov3K6UUjhuwOd.jpeg',
          width: '200px',
        },

        {
          src: 'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          width: '200px',
        },
        {
          src: 'https://c0.wallpaperflare.com/preview/925/223/688/feedback-survey-questionnaire-nps.jpg',
          width: '100px',
        },
      ],
    }
  },
}
</script>
<style scoped>
.floatingImage {
  position: absolute;
}
.floatingGrid {
  position: relative;
}
#floating0 {
  left: 190px;
}
#floating1 {
  top: 30px;
}
#floating2 {
  left: 240px;
  top: 190px;
}
#floating3 {
  top: 180px;
}
#floating4 {
  left: 160px;
  top: 140px;
}
.aestheticCircle {
  width: 100px;
  height: 100px;
  position: absolute;

  top: -10px;
  left: -20px;
  border-radius: 50%;
}
@media only screen and (max-width: 600px) {
  #floating0,
  #floating2,
  #floating3,
  #floating4 {
    display: none;
  }
  #floating1 {
    top: 120px;
  }
  .aestheticCircle {
    top: 60px;
  }
  .tutorialbtn {
    margin: 10px 0px !important;
  }
}
</style>
