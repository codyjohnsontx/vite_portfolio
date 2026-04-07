export function getStatusLabel(status) {
  if (status === 'active-build') {
    return 'Active build';
  }

  if (status === 'prototype') {
    return 'Prototype concept';
  }

  console.warn(`Unknown product status: ${String(status)}`);

  return 'Unknown status';
}
