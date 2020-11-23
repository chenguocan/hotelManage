<template>
  <div class="banner">
    <swiper ref="bannerSwiper" :options="swiperOptions">
      <swiper-slide v-for="(item,index) in banner" :key="index">
        <img :src="item" style="height: 180px;width: 400px" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import {directive, Swiper, SwiperSlide} from "vue-awesome-swiper";

export default {
  props:['banner'],
  name: "Banner",
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive,
  },
  swiperOptions: {
    pagination: {
      el: '.swiper-pagination'
    },
    loop: true,
    autoplay : 1000,
    slidesPerView : 3,
    centeredSlides : true,
  },
}
</script>

<style scoped>
.b
</style>