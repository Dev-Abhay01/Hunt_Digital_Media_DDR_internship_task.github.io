document.addEventListener('DOMContentLoaded', () => {
  const startDatePicker = document.getElementById('start-date');
  const endDatePicker = document.getElementById('end-date');
  const excludedDatesInput = document.getElementById('excluded-dates');
  const numberOfLeadsInput = document.getElementById('number-of-leads');
  const expectedLeadCountInput = document.getElementById('expected-lead-count');
  const displayedDays = document.getElementById('displayed-days');
  const submitButton = document.getElementById('submit-button');

  // Initialize the date pickers
  startDatePicker.addEventListener('change', updateDateInformation);
  endDatePicker.addEventListener('change', updateDateInformation);
  excludedDatesInput.addEventListener('input', updateDateInformation);
  numberOfLeadsInput.addEventListener('input', updateExpectedLeadCount);

  // Update the displayed information based on selected dates and excluded dates
  function updateDateInformation() {
    const startDate = new Date(startDatePicker.value);
    const endDate = new Date(endDatePicker.value);

    const excludedDates = excludedDatesInput.value.split(',').map(date => date.trim());

    let numberOfDays = calculateNumberOfDays(startDate, endDate, excludedDates);

    displayedDays.textContent = numberOfDays;
    updateExpectedLeadCount();
  }

  // Calculate the number of days between the chosen dates, excluding the excluded dates
  function calculateNumberOfDays(start, end, excludedDates) {
    let numberOfDays = 0;

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      const dateString = formatDate(date);
      if (!excludedDates.includes(dateString)) {
        numberOfDays++;
      }
    }

    return numberOfDays;
  }
  window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // Format date to YYYY-MM-DD
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Update the expected lead count based on the number of leads and number of days
  function updateExpectedLeadCount() {
    const numberOfLeads = parseInt(numberOfLeadsInput.value) || 0;
    const numberOfDays = parseInt(displayedDays.textContent) || 1;

    const expectedLeadCount = numberOfDays ? (numberOfLeads / numberOfDays).toFixed(2) : 0;
    expectedLeadCountInput.value = expectedLeadCount;
  }

  // Handle form submission (replace with your own logic)
  submitButton.addEventListener('click', () => {
    alert('Form submitted. Implement your AJAX logic here.');
  });
});
