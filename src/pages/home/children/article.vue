<template>
  <div class="articlebox xparent">
    <x-header title="文章内容"></x-header>

    <div class="xchild">
      <h3>创客生态圈循环，每一步都不能少！</h3>
      <p>
        <span>创客生态圈是怎样一种形态？</span>消费者、创业者、投资者，这是一个可以循环发展的创客生态圈，提供了一个新的产品诞生、发展、成熟与衰落全生命周期内所有相关资源。在今天，创业者遍地开花，想创业的人比比皆是，而新的想法创意更是不计其数。而衡量创业成功的一个基本标准便是想法变产品、产品变现金流。而，企业不断强大的标志便是这个过程生生不息，无限循环。</p>

      <p>如前所议，创业者盘活了创客生态圈里的各种资源，才好从0到1、从1到100。那么，首先我们来看看这个生态圈是怎么运作的吧</p>
      <p>
        <span>第一步，消费者的某某点产生新的市场需求，创业者设计产品。</span>这个某某点就是消费者的需求所在。可以是痛点，比如苹果手机电池续航能力饱受诟病，就出现了各种实用、方便、美观的便携充电设备。可以是痒点，比如一部手机普遍至少要配存储卡、充电器、耳机等等设备，都带着太麻烦，不带又不方便，所以就出现了集各种功能于一身的手机壳。2月29日，在世界经理人和优质创客平台 Startup Launchpad 推出的创客空间工作坊上，Nexpaq公司联合CEO就演示了可以是各种硬件设备集成并且可以自由选择的手机壳，目前已开发了12项功能。还可以是兴奋点，往往是由消费者尚未发现而创业者创新的新需求，比如前述创客空间工作坊上，小编看到了一款眼前一亮的产品，可以调节听觉的音频剪切器——Aumeo。这款产品的创业团队发现大多数人的听力都是受损的，而Aumeo将补缺你的听力遗憾</p>
      <p>
        <span>第二步，创业者试生产产品，并获取投资。</span>发现需求是创业的开始，获取投资提供创业的可能。互联网不仅让人人都成为传播者，也让每个人都可以是设计者、投资者。Kickstarter上已经有10万个项目众筹成功，另一个创业者必去的众筹网站Indiegogo每月有1500万的访问量。众筹成功意味着产品未生产已先有消费者，这对于创业者来说，是获得更大投资的一个强有力的证明</p>
      <p>在前述工作坊上，多个项目都是经过了初步考验的，我们可以来看看他们的成绩。Nexpaq智能模块化手机壳在Kickstarter众筹超过180万元；Aumeo音频剪切器在Indiegogo上众筹200万元；Nanoleaf智能LED灯在Kickstarter和Indiegogo融资超过300万元。之后，他们便获得了更大更专业的投资，比如李嘉诚投资了Nanoleaf</p>
      <p>
        <span>第三步，批量生产投入市场，消费者反馈，产品迭代。</span>有了消费者的初步认可和前期资金投入，产品就可以批量生产投入市场，赢得现金流了。到这里基本上一个生态循环已经完成。但这一步，除了收回现金，更重要的是听取市场反馈，为产品迭代做准备。而后就是下一个循环。</p>
    </div>
  </div>
</template>
<script>
import { LoadMore } from 'vux'
export default {
  name: 'homeArticle',
  components: {
    LoadMore
  }
}
</script>
<style lang="scss" scoped>
@import '~style/mixin';
.articlebox {
  @include xallcover(101);
}

.articlebox {
  .weui-loadmore__tips {
    color: #000;
    font-size: $size;
  }
}
.xchild {
  h3 {
    text-align: center;
    padding: $padding 0;
    font-weight: 700;
  }
  p {
    text-indent: 2em;
    padding: 0 $padding;
    margin-bottom: 10px;
  }
  span {
    font-weight: 700;
  }
}
</style>


