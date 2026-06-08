/* ============================================
   SERVICES PAGE — FAQ Accordion
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      const item = this.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(function (otherItem) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion-content').style.maxHeight = null;
      });

      // Open clicked if it was closed
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
});
