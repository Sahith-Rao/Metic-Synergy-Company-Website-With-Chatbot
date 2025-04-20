/**
 * Googlebot Favicon Verification Script
 * 
 * This script simulates how Googlebot would access your favicon
 * and checks if it's properly accessible for Google search results.
 * 
 * To run:
 * 1. npm install node-fetch
 * 2. node verify-favicon-googlebot.js https://www.meticsynergy.com
 */

const fetch = require('node-fetch');

// Get the domain from command line argument or use default
const domain = process.argv[2] || 'https://www.meticsynergy.com';

// Ensure the domain doesn't have a trailing slash
const cleanDomain = domain.replace(/\/$/, '');

console.log(`=======================================================`);
console.log(`Googlebot Favicon Verification Tool`);
console.log(`=======================================================`);
console.log(`Checking favicon accessibility for: ${cleanDomain}`);
console.log(`Using Googlebot user agent string to simulate Google's crawl\n`);

// Googlebot user agent string
const GOOGLEBOT_UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

// Test paths where favicon might be found, in order of Google's preference
const testPaths = [
  '/favicon.ico',                // Root favicon (most important for Google)
  '/apple-touch-icon.png',       // iOS icon (sometimes used as fallback)
  '/favicon-32x32.png',          // Standard favicon
  '/favicon-16x16.png'           // Small favicon
];

async function checkFavicon(path) {
  const url = `${cleanDomain}${path}`;
  
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': GOOGLEBOT_UA
      }
    });
    
    const status = response.status;
    const contentType = response.headers.get('content-type') || 'unknown';
    const contentLength = response.headers.get('content-length') || 'unknown';
    
    console.log(`✓ ${path}:`);
    console.log(`  Status: ${status} ${response.statusText}`);
    console.log(`  Content-Type: ${contentType}`);
    console.log(`  Size: ${contentLength} bytes`);
    
    if (status === 200) {
      if (path === '/favicon.ico') {
        console.log(`  ✅ SUCCESS: favicon.ico found at root level!`);
      } else {
        console.log(`  ✅ SUCCESS: Alternative favicon found!`);
      }
    } else {
      console.log(`  ❌ ERROR: Returned status ${status} instead of 200`);
    }
    
    if (path === '/favicon.ico' && contentType !== 'image/x-icon' && contentType !== 'image/vnd.microsoft.icon') {
      console.log(`  ⚠️ WARNING: favicon.ico has incorrect Content-Type: ${contentType}`);
      console.log(`  Should be 'image/x-icon' or 'image/vnd.microsoft.icon'`);
    }
    
    console.log('');
    return status === 200;
    
  } catch (error) {
    console.log(`✗ ${path}:`);
    console.log(`  ❌ ERROR: ${error.message}`);
    console.log('');
    return false;
  }
}

async function checkRobotsTxt() {
  const url = `${cleanDomain}/robots.txt`;
  
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': GOOGLEBOT_UA }
    });
    
    if (response.status === 200) {
      const text = await response.text();
      
      console.log(`✓ Checking robots.txt:`);
      
      // Check if robots.txt blocks favicon
      if (text.includes('Disallow: /favicon.ico')) {
        console.log(`  ❌ ERROR: robots.txt is blocking favicon.ico!`);
        console.log(`  Remove 'Disallow: /favicon.ico' from robots.txt`);
      } else if (text.includes('Disallow: /*.ico$')) {
        console.log(`  ❌ ERROR: robots.txt is blocking .ico files!`);
        console.log(`  Remove or modify the pattern blocking .ico files`);
      } else {
        console.log(`  ✅ SUCCESS: robots.txt does not block favicon.ico`);
      }
    } else {
      console.log(`✓ robots.txt:`);
      console.log(`  ⚠️ WARNING: robots.txt returned status ${response.status}`);
      console.log(`  This is not an error, but might want to add a robots.txt file`);
    }
    
    console.log('');
    
  } catch (error) {
    console.log(`✗ robots.txt:`);
    console.log(`  ⚠️ WARNING: ${error.message}`);
    console.log('');
  }
}

async function checkGoogleSearchConsole() {
  console.log(`✓ Google Search Console Verification:`);
  console.log(`  To ensure Google can discover your favicon:`);
  console.log(`  1. Sign in to Google Search Console: https://search.google.com/search-console/`);
  console.log(`  2. Select your property: ${cleanDomain}`);
  console.log(`  3. Go to URL Inspection and enter your homepage URL`);
  console.log(`  4. Click "Request Indexing" to expedite the process`);
  console.log('');
}

async function main() {
  // First check robots.txt to ensure it doesn't block the favicon
  await checkRobotsTxt();
  
  // Check favicon paths
  let foundAnyFavicon = false;
  
  for (const path of testPaths) {
    const found = await checkFavicon(path);
    if (found) foundAnyFavicon = true;
  }
  
  // Provide Search Console guidance
  await checkGoogleSearchConsole();
  
  // Final summary
  console.log(`=======================================================`);
  console.log(`SUMMARY:`);
  
  if (await checkFavicon('/favicon.ico')) {
    console.log(`✅ Primary favicon.ico is correctly accessible at root level`);
    console.log(`✅ Google should be able to display your favicon in search results`);
  } else if (foundAnyFavicon) {
    console.log(`⚠️ Alternative favicons found, but missing primary favicon.ico at root level`);
    console.log(`⚠️ Google may not show your favicon in search results`);
    console.log(`👉 ACTION: Create favicon.ico and place it at the domain root`);
  } else {
    console.log(`❌ No favicon found! Google cannot display your favicon in search results`);
    console.log(`👉 ACTION: Generate favicon.ico using one of the provided scripts`);
    console.log(`👉 ACTION: Deploy favicon.ico to the root of your domain`);
  }
  
  console.log(`=======================================================`);
}

main().catch(error => {
  console.error('Error during verification:', error);
});