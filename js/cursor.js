const cursor = {
  dot: document.createElement('div'),
  outline: document.createElement('div'),
  init: function() {
    this.dot.className = 'cursor-dot';
    this.outline.className = 'cursor-outline';
    
    document.body.appendChild(this.dot);
    document.body.appendChild(this.outline);
    
    this.bindEvents();
    this.checkBackgroundColor();
  },
  
  bindEvents: function() {
    document.addEventListener('mousemove', (e) => {
      this.dot.style.left = e.clientX + 'px';
      this.dot.style.top = e.clientY + 'px';
      
      this.outline.style.left = e.clientX + 'px';
      this.outline.style.top = e.clientY + 'px';
      
      this.checkBackgroundColor(e);
    });
  },
  
  checkBackgroundColor: function(e) {
    if (!e) return;
    
    const element = document.elementFromPoint(e.clientX, e.clientY);
    if (!element) return;
    
    const bgColor = window.getComputedStyle(element).backgroundColor;
    if (!bgColor || bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') return;
    
    const rgb = bgColor.match(/\d+/g);
    if (!rgb) return;
    
    // Calculate relative luminance
    const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
    
    if (luminance < 0.5) {
      this.dot.classList.add('inverted');
    } else {
      this.dot.classList.remove('inverted');
    }
  }
};

// Initialize cursor when DOM is ready
document.addEventListener('DOMContentLoaded', () => cursor.init());