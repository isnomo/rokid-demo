(function () {
  var eyesTop, soundTop, cpuTop, backFloorTop, dlpTop, fitstPlay = true

  $(window).load(() => {
    let banenrVideo = document.getElementById('bannerPlayer')
    banenrVideo.play()
    banenrVideo.addEventListener('ended', function () {  
      $('header').css({'display' : 'block'})
      setTimeout(()=>{
        $('header').addClass('show')
      },60)
    }, false);

    eyesTop = $('.eyes').offset().top - $('.eyes').height()
    soundTop = $('.sound').offset().top - $('.sound').height()
    cpuTop = $('.cpu').offset().top - $('.cpu').height()
    backFloorTop = $('#smart-video').offset().top - $('#smart-video').height()
  })

  
  $(window).scroll(() => {
    let toTop = $(this).scrollTop()
    // console.log(toTop)
    if(toTop < 700){
      $('.floor2 .floor2-main .floor2-main__img').css({'transform' : 'translateY(' + (-toTop / 8)+ 'px)'})
    }
    if(toTop > backFloorTop && fitstPlay){
      let backVideo = document.getElementById('smart-video')
      backVideo.play()
      fitstPlay = false
    }
    if (toTop > eyesTop) {
      $('.eyes .backFloor-item__text').css({'transform' : 'translateY(' + ((eyesTop - toTop) / 3)+ 'px)'})
      // $('.eyes .backFloor-item__text').css({'transform' : 'translateY(' + ((eyesTop - toTop) / 8)+ 'px)'})
    }
    if (toTop > soundTop) {
      $('.backFloor .backFloor-main').css({'background' : '#151719'})
    }else{
      $('.backFloor .backFloor-main').css({'background' : '#1c1e26'})
    }
    if (toTop > soundTop) {
      $('.sound .backFloor-item__text').css({'transform' : 'translateY(' + ((soundTop - toTop) / 3)+ 'px)'})
      // $('.sound .backFloor-item__text').css({'transform' : 'translateY(' + ((soundTop - toTop) / 8)+ 'px)'})
    }
    if (toTop > cpuTop) {
      $('.cpu .backFloor-item__text').css({'transform' : 'translateY(' + ((cpuTop - toTop) / 3)+ 'px)'})
      // $('.cpu .backFloor-item__text').css({'transform' : 'translateY(' + ((cpuTop - toTop) / 8)+ 'px)'})
    }

  })
})()