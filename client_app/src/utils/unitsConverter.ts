// Enumeration for temperature unit types
export enum TempUnit {
    CELSIUS,
    FAHRENHEIT,
  }
  
  // Convert Kelvin to Celsius
  export function kelvinToCelsius(num: number): number {
    return Math.round(num - 273.15);
  }
  
  // Convert Celsius to Fahrenheit
  export function celsiusToFahrenheit(c: number): number {
    return Math.round(c * 9 / 5 + 32);
  }
  
  // Convert Fahrenheit to Celsius
  export function fahrenheitToCelsius(f: number): number {
    return Math.round((f - 32) * 5 / 9);
  }
  
  // Convert kilometers to miles
  export function kmToMile(n: number): number {
    return Math.round(n / 1.60934);
  }
  
  // Convert miles to kilometers
  export function mileToKm(n: number): number {
    return Math.round(n * 1.60934);
  }
  