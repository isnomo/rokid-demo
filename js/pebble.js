(function () {

  $(window).load(() => {
    $('.banner .banner-main__text h2 span').each(function (i) {
      const that = $(this)
      setTimeout(function () {
        that.css({ 'transform': 'rotateY(0)', 'opacity': '1' })
      }, i * 200)
    })
    setTimeout(()=>{
      $('.banner .banner-main__text h3').css({ 'opacity': '1' })
    },1500)
    setTimeout(()=>{
      $('.banner .banner-main__text p').css({ 'opacity': '1' })
    },1800)
  })

  $(window).scroll(() => {
    let toTop = $(this).scrollTop()
    // console.log(toTop)
   
  })
})()