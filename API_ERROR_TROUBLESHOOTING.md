# API Connection Error - Troubleshooting Guide

## Error Message
```
TypeError: Failed to fetch
```

## What This Means
The browser is unable to connect to the API server at `https://client.linupadippurakkal.com/team`

## Possible Causes & Solutions

### 1. **CORS (Cross-Origin Resource Sharing) Issue** ⚠️ MOST LIKELY
**Problem:** The API server is not configured to accept requests from your hosted domain.

**How to Check:**
- Open browser DevTools (F12)
- Go to Console tab
- Look for error messages like:
  - "Access to fetch at '...' has been blocked by CORS policy"
  - "No 'Access-Control-Allow-Origin' header is present"

**Solution:**
The API server at `client.linupadippurakkal.com` needs to add CORS headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

**Backend Fix (if you control the API):**
- For Express.js:
  ```javascript
  app.use(cors({
    origin: '*', // or specify your domain
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  }));
  ```
- For FastAPI:
  ```python
  from fastapi.middleware.cors import CORSMiddleware
  
  app.add_middleware(
      CORSMiddleware,
      allow_origins=["*"],  # or specify your domain
      allow_methods=["*"],
      allow_headers=["*"],
  )
  ```

### 2. **API Server is Down**
**How to Check:**
- Open a new browser tab
- Try accessing: `https://client.linupadippurakkal.com/team`
- If you get a connection error or timeout, the server is down

**Solution:**
- Restart the API server
- Check server logs for errors
- Verify the server is running and accessible

### 3. **Network/Firewall Issues**
**How to Check:**
- Try accessing the API from a different network
- Check if your hosting platform has firewall rules

**Solution:**
- Contact your hosting provider
- Check firewall settings
- Ensure outbound HTTPS requests are allowed

### 4. **HTTPS/HTTP Mixed Content**
**How to Check:**
- If your site is HTTPS but the API is HTTP, browsers will block it

**Solution:**
- Ensure both your site and API use HTTPS
- The API URL is already HTTPS, so this should be fine

## Immediate Testing Steps

### Step 1: Test the API Directly
Open browser console and run:
```javascript
fetch('https://client.linupadippurakkal.com/team', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@example.com' })
})
.then(r => r.json())
.then(d => console.log('Success:', d))
.catch(e => console.error('Error:', e));
```

### Step 2: Check CORS Headers
```javascript
fetch('https://client.linupadippurakkal.com/team', {
  method: 'OPTIONS'
})
.then(r => {
  console.log('CORS Headers:');
  console.log('Access-Control-Allow-Origin:', r.headers.get('Access-Control-Allow-Origin'));
  console.log('Access-Control-Allow-Methods:', r.headers.get('Access-Control-Allow-Methods'));
})
.catch(e => console.error('Error:', e));
```

### Step 3: Test from Localhost
- If it works on localhost but not on hosted site, it's definitely a CORS issue
- Localhost is treated differently by browsers

## Temporary Workaround (Development Only)

If you need to test immediately and can't fix the backend:

1. **Use a CORS Proxy** (NOT for production):
   ```javascript
   const response = await fetch('https://cors-anywhere.herokuapp.com/https://client.linupadippurakkal.com/team', {
     // ... rest of your fetch config
   });
   ```

2. **Test with Browser CORS Disabled** (NOT recommended):
   - Chrome: Launch with `--disable-web-security` flag
   - This is ONLY for testing, never for production

## Recommended Solution

**Contact the API server administrator** and ask them to:
1. Enable CORS for your domain
2. Add your hosted domain to the allowed origins list
3. Ensure the API server is properly configured and running

## Files Modified
- `src/pages/RegisterPage.jsx` - Added detailed error logging

## Next Steps
1. Check browser console for detailed error messages
2. Test the API using the commands above
3. Contact API server administrator if CORS is the issue
4. Verify the API server is running and accessible
