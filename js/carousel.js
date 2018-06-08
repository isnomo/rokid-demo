
function carousel(option) {
  // 轮播最外层
  let $bannerWall = option.wall
  // 轮播等待时间
  let timejg = option.timer || 3000
  // 滑动速度
  let moveSpeed = option.speed || 300
  // 小按钮dom
  let $btnTab = $bannerWall.find(option.btnTab) || null
  // 轮播 ul父层dom
  let $boxImg = $bannerWall.find(option.boxImg) || null
  // 轮播左右切换按钮
  let $boxArrow = $bannerWall.find(option.boxArrow) || null
  // 初始展示的模块
  let defaultActive = option.defaultActive || 0
  // 移动上方停止播放
  let hoverStop = option.hoverStop || false
  // 是否自动播放
  let autoPlay = option.autoPlay || false

  // 初始化
  let nowTime = new Date().getTime()
  // item 元素
  let liList = $boxImg.find("ul").find("li")
  // 轮播最后需要克隆的元素
  let cloneOne = liList.first().clone()
  // 获取 item 元素的宽
  let liWidth = liList.width()
  // 循环执行动画名称
  let timer = null
  // 当前active 的元素
  let itemIndex = 0
  // item 数量
  let itemlength = liList.length
  console.log(itemlength)
  // 把克隆元素添加进ul
  $boxImg.find("ul").append(cloneOne)
  // 给ul宽度
  $boxImg.find("ul").width(liWidth * (itemlength + 1))

  // 如果有圆点按钮就执行 圆点事件
  option.btnTab ? btnList() : btnList

  function btnList() {
    // 生成小圆点
    for (let i = 0; i < itemlength; i++) {
      $btnTab.find('ul').append("<li></li>")
    }
    // 给默认item元素添加active
    $btnTab.find('ul').find('li').eq(defaultActive).addClass("active")
    // 圆点点击事件
    $btnTab.find('ul').find('li').on('click', function () {
      if(new Date().getTime() - nowTime < 200){
        return false
      } else {
        nowTime = new Date().getTime()
      }
      clearInterval(timer)
      let index = $(this).index()
      itemIndex = index
      imgMove()
      autoPlay ? setAutoPlay() : setAutoPlay
    })
  }
  imgMove()
  // 滑动的动画
  function imgMove() {
    $boxImg.find('ul').find('li').eq(itemIndex).addClass("active").siblings().removeClass("active")
    $boxImg.find("ul").css({ 'transform': 'translate3d(' + (- itemIndex * liWidth) + 'px,0,0)', 'transition-duration': moveSpeed + 'ms' })
    $btnTab.find('ul').find('li').eq(itemIndex).addClass("active").siblings().removeClass("active")
    console.log(itemIndex)
  }
  // 是否自动播放
  autoPlay ? setAutoPlay() : setAutoPlay

  function setAutoPlay() {
    timer = setInterval(function () {
      moveDown()
    }, timejg)
  }

  // 下一张
  function moveDown() {
    itemIndex++
    if (itemIndex == itemlength) {
      $boxImg.find("ul").css({ 'transform': 'translate3d(' + (- itemIndex * liWidth) + 'px,0,0)', 'transition-duration': moveSpeed + 'ms' })
      setTimeout(function () {
        $boxImg.find("ul").css({ 'transform': 'translate3d(' + 0 + 'px,0,0)', 'transition-duration': 0 + 'ms' })
        $boxImg.find('ul').find('li').eq(0).addClass("active").siblings().removeClass("active")
        $btnTab.find('ul').find('li').eq(0).addClass("active").siblings().removeClass("active")
        itemIndex = 0
      }, moveSpeed + 10)
    } else {
      imgMove()
    }
  }

  // 上一张
  function moveUp() {
    itemIndex--
    if (itemIndex < 0) {
      $boxImg.find("ul").css({ 'transform': 'translate3d(' + (- (itemlength) * liWidth) + 'px,0,0)', 'transition-duration': 0 + 'ms' })
      setTimeout(function () {
        $boxImg.find("ul").css({ 'transform': 'translate3d(' + (- (itemlength - 1) * liWidth) + 'px,0,0)', 'transition-duration': moveSpeed + 'ms' })
        $boxImg.find('ul').find('li').eq(itemlength - 1).addClass("active").siblings().removeClass("active")
        $btnTab.find('ul').find('li').eq(itemlength - 1).addClass("active").siblings().removeClass("active")
        itemIndex = itemlength - 1
      }, 10)
    } else {
      imgMove()
    }
  }

  // 触摸事件
  let touch_px;
  let rate;
  $boxImg.on('touchstart', function (e) {
    if(new Date().getTime() - nowTime < 200){
      return false
    } else {
      nowTime = new Date().getTime()
    }
    var touch = e.originalEvent.targetTouches[0];
    touch_px = touch.pageX;
    clearInterval(timer);
  });
  $boxImg.on('touchmove', function (e) {
    var touch = e.originalEvent.targetTouches[0];
    rate = touch_px - touch.pageX;
  });
  $boxImg.on('touchend', function (e) {
    if (rate > 50) {
      $(this).stop(true);
      moveDown();
      rate = 0;
    } else if (rate < -50) {
      $(this).stop(true);
      moveUp();
      rate = 0;
    }
  });


  if (hoverStop) {
    $boxImg.hover(function () {
      clearInterval(timer);
    }, function () {
      autoPlay ? setAutoPlay() : setAutoPlay
    });
  }

  if (option.boxArrow) {
    $boxArrow.find('.box_left').click(function () {
      if(new Date().getTime() - nowTime < 200){
        return false
      } else {
        nowTime = new Date().getTime()
      }
      clearInterval(timer)
      moveUp()
      autoPlay ? setAutoPlay() : setAutoPlay
    })
    $boxArrow.find('.box_right').click(function () {
      if(new Date().getTime() - nowTime < 200){
        return false
      } else {
        nowTime = new Date().getTime()
      }
      clearInterval(timer)
      moveDown()
      autoPlay ? setAutoPlay() : setAutoPlay
    })
  }

}























