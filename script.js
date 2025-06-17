document.addEventListener('DOMContentLoaded', function() {

  const popups = {
    1: { id: 'popup1', open: 'openPopup1', close: 'closePopup1' },
    2: { id: 'popup2', open: 'openPopup2', close: 'closePopup2' },
    3: { id: 'popup3', open: 'openPopup3', close: 'closePopup3' }
  };

  Object.values(popups).forEach(popup => {

    document.getElementById(popup.open)?.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById(popup.id).style.display = 'flex';
    });


    document.getElementById(popup.close)?.addEventListener('click', function() {
      document.getElementById(popup.id).style.display = 'none';
    });


    document.getElementById(popup.id)?.addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
      }
    });
  });
});