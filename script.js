// Create an array of two-digit units from '00' to '99' and include specials
function createUnitsArray() {
  const units = [];

  // Generate units from 00 to 99
  for (let i = 0; i < 100; i++) {
    units.push(i.toString().padStart(2, '0')); // Format as two digits
  }

  // Add special selections to the array
  const specials = ['စုံစုံ', 'မမ', 'ပူး', 'ပါဝါ', 'နက္ခက်'];

  // Add top (ထိပ်) units
  const topUnits = ['1ထိပ်', '2ထိပ်', '3ထိပ်', '4ထိပ်', '5ထိပ်',
                      '6ထိပ်', '7ထိပ်', '8ထိပ်', '9ထိပ်', '10ထိပ်'];

  // Add end (ပိတ်) units
  const endUnits = ['1ပိတ်', '2ပိတ်', '3ပိတ်', '4ပိတ်', '5ပိတ်',
                      '6ပိတ်', '7ပိတ်', '8ပိတ်', '9ပိတ်', '10ပိတ်'];

  // Combine units, specials, top, and end units
  return [...units, ...specials, ...topUnits, ...endUnits];
}

// Function to generate selection buttons dynamically
function generateSelectionButtons() {
  const units = createUnitsArray();
  const container = document.getElementById('selectionsContainer');

  units.forEach(unit => {
    const button = document.createElement('button');
    button.className = 'selection-button';
    button.textContent = unit;
    button.onclick = () => toggleSelection(unit, button); // Pass button reference
    container.appendChild(button);
  });
}

// Store selected units
let selectedUnits = [];

// Define quantities for special units
const specialUnitQuantities = {
  'စုံစုံ': 25,
  'မမ': 25,
  'မစုံ': 25,
  'စုံမ': 25,
  'ပါဝါ': 5,
  'နက္ခက်': 5,
  '1ထိပ်': 10,
  '2ထိပ်': 10,
  '3ထိပ်': 10,
  '4ထိပ်': 10,
  '5ထိပ်': 10,
  '6ထိပ်': 10,
  '7ထိပ်': 10,
  '8ထိပ်': 10,
  '9ထိပ်': 10,
  '10ထိပ်': 10,
  '1ပိတ်': 10,
  '2ပိတ်': 10,
  '3ပိတ်': 10,
  '4ပိတ်': 10,
  '5ပိတ်': 10,
  '6ပိတ်': 10,
  '7ပိတ်': 10,
  '8ပိတ်': 10,
  '9ပိတ်': 10,
  '10ပိတ်': 10
};

// Toggle selection functionality
function toggleSelection(unit, button) {
  const index = selectedUnits.indexOf(unit);
  if (index > -1) {
    selectedUnits.splice(index, 1); // Remove if already selected
    button.classList.remove('selected'); // Remove selected class
  } else {
    selectedUnits.push(unit); // Add if not selected
    button.classList.add('selected'); // Add selected class
  }
  console.log('Selected Units:', selectedUnits); // Log for debugging
}

// Buy button functionality
document.getElementById('buyButton').onclick = () => {
  const username = document.getElementById('username').value;
  const userid = document.getElementById('userid').value;
  const price = document.getElementById('price').value;

  if (!username || !userid || !price || selectedUnits.length === 0) {
    alert('Please fill all fields and select at least one unit.');
    return;
  }

  // Calculate total units
  let totalUnits = 0;
  
  selectedUnits.forEach(unit => {
    if (specialUnitQuantities[unit]) {
      totalUnits += specialUnitQuantities[unit]; // Add quantity for special units
    } else {
      totalUnits += 1; // Regular units count as 1
    }
  });

  // Prepare the details for the details box
  const totalPrice = totalUnits * price; // Total price calculation
  const details = `
        Name: ${username}
        ID: ${userid}
        Selections: ${selectedUnits.join(', ')}
        Total Units: ${totalUnits}
        Total Price: ${totalPrice} ks
    `;
  document.getElementById('detailsBox').innerText = details;
};

// Copy button functionality
document.getElementById('copyButton').onclick = () => {
  const detailsBox = document.getElementById('detailsBox');
  navigator.clipboard.writeText(detailsBox.innerText)
    .then(() => alert('Details copied to clipboard!'))
    .catch(err => console.error('Failed to copy text: ', err));
};

// Delete button functionality
document.getElementById('deleteButton').onclick = () => {
  document.getElementById('detailsBox').innerText = '';
  selectedUnits = []; // Clear selected units
  // Reset button styles
  const buttons = document.querySelectorAll('.selection-button');
  buttons.forEach(button => button.classList.remove('selected'));
};

// Generate selection buttons when the page loads
window.onload = generateSelectionButtons;