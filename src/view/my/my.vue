<template>
  <main>
    <div class="user-info">
      <img
        src="https://dsfs.oppo.com/archives/201912/201912270812345e05fb0eb3589.png?x-oss-process=image/format,webp"
        alt
      />
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

    <div class="invite-box">
      <div>
        <span></span>邀请店铺
      </div>
      <div>
        <span></span>邀请创客
      </div>
    </div>

    <ul class="other-info">
      <li>
        <div>
          <span></span>我的银行卡
        </div>
        <van-icon name="arrow" size="0.3rem" color="#999999"/>
      </li>
      <li>
        <div>
          <span></span>礼品额度使用记录
        </div>
        <van-icon name="arrow" size="0.3rem" color="#999999"/>
      </li>
      <li>
        <div>
          <span></span>设置
        </div>
        <van-icon name="arrow" size="0.3rem" color="#999999"/>
      </li>
    </ul>
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
  flex-direction: column
  align-items: center
.user-info 
  display: flex
  height: 2.81rem
  width: 7rem
  padding-top: 0.5rem
  padding-left: 0.38rem
  margin-top: 0.3rem
  background: url('../../assets/userBackground.png')
  background-size: 100%
  background-repeat: no-repeat
  img 
    height: 0.88rem
    width: 0.88rem
    margin-right: 0.16rem
    border-radius: 50%
    background: #fff
  .right li
    font-size: 0.34rem
    font-family: Adobe Heiti Std
    font-weight: normal
    color: rgba(255,255,255,1)
  li:nth-child(2)
    font-size: 0.28rem
  li:nth-child(3)
    display: flex
    width: 100%
    padding-top: 0.50rem
    font-size: 0.3rem
    color: rgba(224,235,243,1)
    div:nth-child(1)
      margin-right: 1rem
    span
      color: rgba(255,255,255,1)

.invite-box
  display: flex
  margin-top: 0.51rem
  div
    display: flex
    padding: 0.31rem 0.77rem 0.41rem 0.77rem
    width: 3.23rem
    height: 0.98rem
    background: rgba(255,255,255,1)
    box-shadow: 0rem 0.09rem 0.09rem 0.01rem rgba(63,125,231,0.09)
    border-radius: 0.1rem
    font-size: 0.28rem
    font-family: PingFang
    font-weight: 500
    color: rgba(44,62,80,1)
    span
      display: inline-block
      height: 0.3rem
      width: 0.3rem
      margin-right: 0.24rem
      background-image: url('../../assets/userInfoIcon.png')
      background-size: 4rem
      background-repeat: no-repeat
  div:nth-child(1)
    margin-right: 0.3rem
    span 
      background-position: -2.84rem -0.18rem
  div:nth-child(2) span
    background-position: -3.54rem -0.18rem

.other-info
  width: 100vw
  margin-top: 0.5rem
  li
    display: flex
    justify-content: space-between
    border-bottom: 1px solid rgba(238,238,238,1)
    padding: 0.31rem
  li div 
    font-size: 0.28rem
    font-family: PingFang
    font-weight: 500
    color: rgba(51,51,51,1)
    display: flex
    align-items: center
    span 
      display: inline-block
      height: 0.3rem
      width: 0.3rem
      margin-right: 0.24rem
      background-image: url('../../assets/userInfoIcon.png')
      background-size: 5rem
      background-repeat: no-repeat  
  li:nth-child(1) span
    background-position: -1rem -0.3rem
  li:nth-child(2) span
    background-position: -1.78rem -0.25rem
  li:nth-child(3) span
    background-position: -2.6rem -0.25rem

</style>
