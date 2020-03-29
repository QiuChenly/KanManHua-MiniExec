<template>
  <view class="content">
    <ul class="cls-ul">
      <li class="bar"></li>
      <li class="bar"></li>
      <li class="bar"></li>
      <li class="bar"></li>
      <li class="bar"></li>
    </ul>
    <text class="title">加载中</text>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
@keyframes jump {
  from {
    height: 5rpx;
  }

  50% {
    height: 30rpx;
  }

  100% {
    height: 5rpxx;
  }
}

.title {
  font-size: 25rpx;
  display: block;
  text-align: center;
}
.content {
  width: 100%;
}
.content .cls-ul {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100rpx;
}
.content .cls-ul .bar {
  height: 0;
  width: 10rpx;
  background-color: crimson;
  /* border: 1px solid cadetblue; */
  margin-left: 10rpx;
  position: relative;
  display: inline-block;
}

.content .cls-ul .bar::after,
.content .cls-ul .bar::before {
  content: " ";
  display: block;
  width: 100%;
  height: 5rpx;
  background-color: crimson;
  position: absolute;
  left: 0;
}

.content .cls-ul .bar::after {
  top: 0;
  border-bottom-right-radius: 15rpx;
  border-bottom-left-radius: 15rpx;
}

.content .cls-ul .bar::before {
  bottom: 0;
  border-top-left-radius: 15rpx;
  border-top-right-radius: 15rpx;
}

.cls-ul .bar:nth-child(1)::after,
.cls-ul .bar:nth-child(1)::before {
  animation: jump 1.5s infinite 0.2s;
}
.cls-ul .bar:nth-child(2)::after,
.cls-ul .bar:nth-child(2)::before {
  animation: jump 1.5s infinite 0.4s;
}
.cls-ul .bar:nth-child(3)::after,
.cls-ul .bar:nth-child(3)::before {
  animation: jump 1.5s infinite 0.6s;
}
.cls-ul .bar:nth-child(4)::after,
.cls-ul .bar:nth-child(4)::before {
  animation: jump 1.5s infinite 0.8s;
}
.cls-ul .bar:nth-child(5)::after,
.cls-ul .bar:nth-child(5)::before {
  animation: jump 1.5s infinite 1s;
}
</style>
