// Kendo UI License Configuration
// For development and testing purposes

// You can get a trial license key from: https://www.telerik.com/kendo-ui/my-license
// Or use the development license key for local development

// Try to get license key from environment variable first, then fallback to placeholder
export const KENDO_LICENSE_KEY = import.meta.env.VITE_KENDO_LICENSE_KEY || 'YOUR_TRIAL_LICENSE_KEY_HERE';

// For development, you can also try using a development license key
// Uncomment the line below and replace with your actual license key
// export const KENDO_LICENSE_KEY = 'your_actual_license_key_here';

// Instructions:
// 1. Get a trial license key from: https://www.telerik.com/kendo-ui/my-license
// 2. Create a .env file in the web directory with: VITE_KENDO_LICENSE_KEY=your_actual_license_key
// 3. Or replace 'YOUR_TRIAL_LICENSE_KEY_HERE' with your actual license key
// 4. Restart your development server after setting the license key

// Note: The license key is configured using setScriptKey() in main.jsx
