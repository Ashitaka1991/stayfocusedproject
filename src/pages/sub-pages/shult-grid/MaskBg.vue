<template>
  <div class="mask-bg-main">
    <div class="center-area">
      <slot name="centralArea"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.mask-bg-main{
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  .center-area{
    width: 75vmin;
    height: 60vmin;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 8vmin;
    color: white;
  }
}
</style>
