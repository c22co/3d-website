AFRAME.registerComponent('bounce', {
  init: function () {
    this.el.addEventListener('collide', (e) => {
      console.log('Collided with', e.detail.body.el);
    });
  }
});


