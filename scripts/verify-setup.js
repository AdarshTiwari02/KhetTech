#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Smart Farmer Next.js Project Setup...\n');

const checks = {
  'Project Structure': {
    check: () => {
      const requiredDirs = [
        'app', 'components', 'lib', 'public', 'styles'
      ];
      const missing = requiredDirs.filter(dir => !fs.existsSync(dir));
      return missing.length === 0 ? '✅' : `❌ Missing: ${missing.join(', ')}`;
    }
  },
  
  'Package.json': {
    check: () => {
      try {
        const pkg = require('../package.json');
        const requiredDeps = ['next', 'react', 'react-dom', 'mongoose', 'axios'];
        const missingDeps = requiredDeps.filter(dep => !pkg.dependencies?.[dep] && !pkg.devDependencies?.[dep]);
        return missingDeps.length === 0 ? '✅' : `❌ Missing deps: ${missingDeps.join(', ')}`;
      } catch (e) {
        return '❌ package.json not found or invalid';
      }
    }
  },
  
  'Environment Variables': {
    check: () => {
      const envPath = '.env.local';
      if (!fs.existsSync(envPath)) {
        return '⚠️  .env.local not found (create from .env.example)';
      }
      
      const envContent = fs.readFileSync(envPath, 'utf8');
      const hasMongoDB = envContent.includes('MONGODB_URI');
      const hasJWT = envContent.includes('JWT_SECRET');
      
      if (!hasMongoDB || !hasJWT) {
        return '⚠️  Missing required env vars (MONGODB_URI, JWT_SECRET)';
      }
      return '✅';
    }
  },
  
  'TypeScript Config': {
    check: () => {
      return fs.existsSync('tsconfig.json') ? '✅' : '❌ tsconfig.json missing';
    }
  },
  
  'Next.js Config': {
    check: () => {
      return fs.existsSync('next.config.js') ? '✅' : '❌ next.config.js missing';
    }
  }
};

console.log('Running setup verification...\n');

let allPassed = true;
Object.entries(checks).forEach(([checkName, { check }]) => {
  const result = check();
  console.log(`${checkName}: ${result}`);
  if (result.includes('❌') || result.includes('⚠️')) {
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ All checks passed! Project is ready.');
  console.log('\nTo start development:');
  console.log('  1. Copy .env.example to .env.local and configure variables');
  console.log('  2. Run: npm install');
  console.log('  3. Run: npm run dev');
} else {
  console.log('⚠️  Some checks failed. Please fix the issues above.');
  process.exit(1);
}