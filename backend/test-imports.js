// Test imports one by one
console.log('Testing imports...');

try {
    console.log('1. Testing express...');
    await import('express');
    console.log('✓ express');

    console.log('2. Testing dotenv...');
    await import('dotenv');
    console.log('✓ dotenv');

    console.log('3. Testing database config...');
    await import('./config/database.js');
    console.log('✓ database config');

    console.log('4. Testing error handler...');
    await import('./middleware/errorHandler.js');
    console.log('✓ error handler');

    console.log('5. Testing auth routes...');
    await import('./routes/auth.js');
    console.log('✓ auth routes');

    console.log('6. Testing lead routes...');
    await import('./routes/leads.js');
    console.log('✓ lead routes');

    console.log('7. Testing service routes...');
    await import('./routes/services.js');
    console.log('✓ service routes');

    console.log('8. Testing portfolio routes...');
    await import('./routes/portfolio.js');
    console.log('✓ portfolio routes');

    console.log('9. Testing contact routes...');
    await import('./routes/contact.js');
    console.log('✓ contact routes');

    console.log('10. Testing payment routes...');
    await import('./routes/payments.js');
    console.log('✓ payment routes');

    console.log('11. Testing admin routes...');
    await import('./routes/admin.js');
    console.log('✓ admin routes');

    console.log('\n✅ All imports successful!');
} catch (error) {
    console.error('\n❌ Import failed:', error.message);
    console.error('Stack:', error.stack);
}
