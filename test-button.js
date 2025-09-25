// Simple integration test script to validate button functionality
// This can be run in browser console to test the button

console.log('🧪 Testing PayMeCoffeeHeader button functionality...');

// Check if button exists
const button = document.querySelector('button[aria-label="Abrir página de doação em nova aba"]');
if (!button) {
  console.error('❌ Button not found!');
  return;
}

console.log('✅ Button found');

// Check if button has correct text
if (button.textContent?.includes('☕ Pay me a Coffee')) {
  console.log('✅ Button text is correct');
} else {
  console.error('❌ Button text is incorrect');
}

// Check if button has correct classes
const expectedClasses = ['bg-amber-500', 'hover:bg-amber-600', 'text-white', 'cursor-pointer'];
const hasAllClasses = expectedClasses.every(cls => button.classList.contains(cls));

if (hasAllClasses) {
  console.log('✅ Button has correct CSS classes');
} else {
  console.error('❌ Button missing some CSS classes');
}

// Mock window.open to test click functionality
const originalOpen = window.open;
let openCalled = false;
let openParams = [];

window.open = (...args) => {
  openCalled = true;
  openParams = args;
  console.log('🔗 window.open called with:', args);
  return null;
};

// Test button click
button.click();

if (openCalled && openParams[0] === '/donate' && openParams[1] === '_blank') {
  console.log('✅ Button click opens donate page in new tab correctly');
} else {
  console.error('❌ Button click failed or incorrect parameters');
}

// Restore original window.open
window.open = originalOpen;

// Check for animation classes
const animationElement = document.querySelector('.animate-fade-in');
if (animationElement) {
  console.log('✅ Fade-in animation class is being used');
} else {
  console.log('⚠️ Fade-in animation not currently visible (may appear later)');
}

console.log('🎉 Button functionality test completed!');