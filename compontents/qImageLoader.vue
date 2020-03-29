<template>
  <div class="content">
    <qLoading v-if="!load"></qLoading>
    <image
      class="main"
      :style="{
		'height':mHeight+'rpx',
		'width':mWidth+'rpx'
	}"
      webp="true"
      :src="url"
      @load="loader"
    />
  </div>
</template>

<script>
import qLoading from "./qLoading";
export default {
  props: {
    url: {}
  },
  data() {
    return {
      mWidth: 750,
      mHeight: 0,
      load: false
    };
  },
  created() {},
  mounted() {},
  components: {
    qLoading
  },
  methods: {
    loader(event) {
      // 说实话没有必要手动计算 widthFix属性就够了
      // 我也是闲得慌....
      var im = event.detail;
      var scaleSize = im.width / 750;
      var realHeight = im.height / scaleSize;
      this.mHeight = realHeight;
      this.load = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  background-color: black;
  display: block;
  transition: all 0.5s;
}
</style>
