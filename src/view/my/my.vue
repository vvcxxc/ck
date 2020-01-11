<template>
  <main>
    <div class="user-info">
      <!-- <div class="left"> -->
        <img
          src="https://dsfs.oppo.com/archives/201912/201912270812345e05fb0eb3589.png?x-oss-process=image/format,webp"
          alt
        />
      <!-- </div> -->
      <ul class="right">
        <li>李宇轩</li>
        <li>12345678912</li>
        <li>
          <div>
            余额
            <span>791.96</span>
          </div>
          <div>
            礼品额度
            <span>791.96</span>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>
<script>
  export default {
    data() {
      return {
        list: ""
      };
    }
  };
</script>
<style lang="sass" scoped>
main
  display: flex
  justify-content: center
  
.user-info 
  display: flex
  height: 2.81rem
  width: 7rem
  padding-top: 0.5rem
  padding-left: 0.38rem
  background: url('../../assets/userBackground.png')
  background-size: 100%
  background-repeat: no-repeat
  img 
    height: 0.88rem
    width: 0.88rem
    border-radius: 50%
    background: red
  .right
    flex: 4
    li
    font-size: 17px
    font-family: Adobe Heiti Std
    font-weight: normal
    color: rgba(255,255,255,1)
  li:nth-child(2)
    font-size: 14px
  li:nth-child(3)
    width: 100%
    padding-top: 25px
    font-size: 15px
    display: flex
    justify-content: space-between
    div 
      color: rgba(224,235,243,1)
      span
        color: rgba(255,255,255,1)
</style>
