/**
 * Favicon Implementation Verification Script
 * 
 * This script verifies that the favicon implementation meets the requirements
 * for visibility in Google search results and browser tabs.
 * 
 * To run:
 * 1. npm install node-fetch
 * 2. node verify-favicon-implementation.js
 */

const fetch = require('node-fetch');
const { promises: fs } = require('fs');
const path = require('path');

// Default domain to check - can be overridden with command line argument
const domain = process.argv[2] || 'https://www.meticsynergy.com';

console.log(`=======================================================`);
console.log(`Favicon Implementation Verification Tool`);
console.log(`=======================================================`);
console.log(`Checking favicon implementation for: ${domain}`);
console.log();

// Googlebot user agent string
const GOOGLEBOT_UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

/**
 * Check if a file is accessible via HTTP
 */
async function checkFileAccessibility(filePath) {
  const url = `${domain}${filePath}`;
  
  try {
    console.log(`Checking: ${url}`);
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': GOOGLEBOT_UA
      }
    });
    
    const status = response.status;
    const contentType = response.headers.get('content-type') || 'unknown';
    
    console.log(`  Status: ${status} ${response.statusText}`);
    console.log(`  Content-Type: ${contentType}`);
    
    if (status === 200) {
      console.log(`  ✅ PASSED: File is accessible`);
      return true;
    } else {
      console.log(`  ❌ FAILED: File returned status ${status}`);
      return false;
    }
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}`);
    return false;
  }
}

/**
 * Check robots.txt allows access to favicon
 */
async function checkRobotsTxt() {
  console.log(`\nVerifying robots.txt configuration:`);
  
  try {
    const response = await fetch(`${domain}/robots.txt`);
    
    if (response.status === 200) {
      const content = await response.text();
      
      if (content.includes('Disallow: /favicon.png')) {
        console.log(`  ❌ FAILED: robots.txt is blocking favicon.png`);
        return false;
      } else if (content.includes('Allow: /favicon.png')) {
        console.log(`  ✅ PASSED: robots.txt explicitly allows favicon.png`);
        return true;
      } else {
        console.log(`  ✅ PASSED: robots.txt does not block favicon.png`);
        return true;
      }
    } else {
      console.log(`  ⚠️ WARNING: Couldn't access robots.txt (status ${response.status})`);
      console.log(`  Assuming no blocking rules for favicon.png`);
      return true;
    }
  } catch (error) {
    console.log(`  ⚠️ WARNING: Error checking robots.txt: ${error.message}`);
    console.log(`  Assuming no blocking rules for favicon.png`);
    return true;
  }
}

/**
 * Check HTML head for proper favicon references
 */
async function checkHtmlReferences() {
  console.log(`\nVerifying HTML references:`);
  
  try {
    const response = await fetch(domain);
    
    if (response.status === 200) {
      const html = await response.text();
      
      // Check for favicon.png reference
      const hasFaviconPngReference = html.includes('href="/favicon.png"');
      console.log(`  ${hasFaviconPngReference ? '✅ PASSED' : '❌ FAILED'}: Reference to favicon.png`);
      
      // Check for apple-touch-icon
      const hasAppleTouchIcon = html.includes('rel="apple-touch-icon"');
      console.log(`  ${hasAppleTouchIcon ? '✅ PASSED' : '❌ FAILED'}: Apple touch icon reference`);
      
      // Check for manifest
      const hasManifest = html.includes('rel="manifest"');
      console.log(`  ${hasManifest ? '✅ PASSED' : '❌ FAILED'}: Web app manifest reference`);
      
      return hasFaviconPngReference && hasAppleTouchIcon;
    } else {
      console.log(`  ❌ FAILED: Could not fetch HTML (status ${response.status})`);
      return false;
    }
  } catch (error) {
    console.log(`  ❌ FAILED: Error checking HTML: ${error.message}`);
    return false;
  }
}

/**
 * Check manifest.json for proper icon references
 */
async function checkManifest() {
  console.log(`\nVerifying web app manifest:`);
  
  try {
    const response = await fetch(`${domain}/site.webmanifest`);
    
    if (response.status === 200) {
      const manifest = await response.json();
      
      if (manifest.icons && Array.isArray(manifest.icons)) {
        const hasFaviconPng = manifest.icons.some(icon => 
          icon.src === '/favicon.png' && icon.sizes === '48x48');
        
        console.log(`  ${hasFaviconPng ? '✅ PASSED' : '❌ FAILED'}: favicon.png (48x48) in manifest`);
        return hasFaviconPng;
      } else {
        console.log(`  ❌ FAILED: No icons array in manifest`);
        return false;
      }
    } else {
      console.log(`  ❌ FAILED: Could not fetch manifest (status ${response.status})`);
      return false;
    }
  } catch (error) {
    console.log(`  ❌ FAILED: Error checking manifest: ${error.message}`);
    return false;
  }
}

/**
 * Main verification function
 */
async function verifyFaviconImplementation() {
  // Check local files if running in project directory
  console.log(`Checking local project implementation:`);
  
  try {
    // Check if favicon.png exists in the public directory
    try {
      await fs.access(path.join('public', 'favicon.png'));
      console.log(`✅ PASSED: Local favicon.png file exists in public directory`);
    } catch (error) {
      console.log(`❌ FAILED: No local favicon.png file in public directory`);
    }
    
    console.log();
  } catch (error) {
    console.log(`  ⚠️ WARNING: Couldn't check local files: ${error.message}`);
  }
  
  // Check remote files
  let checks = {
    faviconPng: await checkFileAccessibility('/favicon.png'),
    faviconIco: await checkFileAccessibility('/favicon.ico'),
    robotsTxt: await checkRobotsTxt(),
    htmlReferences: await checkHtmlReferences(),
    manifest: await checkManifest()
  };
  
  // Final report
  console.log(`\n=======================================================`);
  console.log(`SUMMARY:`);
  console.log(`=======================================================`);
  
  let passedCount = Object.values(checks).filter(Boolean).length;
  let totalChecks = Object.values(checks).length;
  let passPercentage = Math.round((passedCount / totalChecks) * 100);
  
  console.log(`Passed ${passedCount}/${totalChecks} checks (${passPercentage}%)`);
  console.log();
  
  console.log(`Favicon.png accessibility: ${checks.faviconPng ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Favicon.ico accessibility: ${checks.faviconIco ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`robots.txt configuration: ${checks.robotsTxt ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`HTML references: ${checks.htmlReferences ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Web app manifest: ${checks.manifest ? '✅ PASSED' : '❌ FAILED'}`);
  console.log();
  
  if (passPercentage >= 80) {
    console.log(`✅ OVERALL: Implementation meets requirements for Google search results`);
    console.log(`Google should be able to display your favicon in search results once the site is crawled.`);
  } else {
    console.log(`⚠️ OVERALL: Implementation may not meet all requirements for Google search results`);
    console.log(`Please address the failed checks above to ensure visibility in Google search results.`);
  }
  
  console.log(`\nNext steps:`);
  console.log(`1. Deploy the changes to your production environment`);
  console.log(`2. Use Google Search Console to request a recrawl`);
  console.log(`3. Check search results after a few days to verify the favicon appears`);
}

// Run verification
verifyFaviconImplementation().catch(error => {
  console.error('Error during verification:', error);
});