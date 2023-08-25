// Enumeration for temperature unit types
export enum IUnits {
  CELSIUS,
  FAHRENHEIT,
}

// Convert Kelvin to Celsius
export function kelvinToCelsius(num: number): number {
  return Math.round(num - 273.15);
}

// Convert Celsius to Fahrenheit
export function celsiusToFahrenheit(c: number | undefined): number | undefined {
  if (c) return Math.round((c * 9) / 5 + 32);
}

// Convert Fahrenheit to Celsius
export function fahrenheitToCelsius(f: number | undefined): number | undefined {
  if (f !== undefined) {
    const celsius = (f - 32) * (5 / 9);
    return Math.round(celsius);
  } else {
    return undefined;
  }
}

// Convert kilometers to miles
export function kmToMile(n: number | undefined): number | undefined {
  if (n) return Math.round(n / 1.60934);
}

// Convert miles to kilometers
export function mileToKm(n: number | undefined): number | undefined {
  if (n) return Math.round(n * 1.60934);
}
