import * as bootstrap from 'bootstrap'

const tooltipTriggerList = [].slice.call(document.querySelectorAll('.toolbar [data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});
