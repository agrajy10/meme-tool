import * as bootstrap from 'bootstrap'

const tooltipTriggerList = [].slice.call(document.querySelectorAll('.toolbar [data-bs-toggle="tooltip"]'))
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});
