# 🚚 CargoDham MCP Server - Railway Deployment

## 🌟 **SUPER EASY DEPLOYMENT - NO EXPERIENCE NEEDED!**

This is your CargoDham MCP Server deployed on Railway - the easiest way to get your logistics API online globally!

## ✨ What You Get

- 🌍 **Global Access** - Your API works worldwide
- 🚀 **Zero Setup** - No complex configurations
- ⚡ **Lightning Fast** - Railway's optimized infrastructure
- 💰 **Free Tier** - Start with $5 free credits
- 🔧 **Auto-Deploy** - Push code, it deploys automatically

## 🎯 **STEP-BY-STEP DEPLOYMENT (Complete Beginner Guide)**

### Step 1: Create Railway Account (2 minutes)
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with GitHub (recommended) or email
4. You get $5 free credits to start!

### Step 2: Deploy Your Project (1 click!)
1. Click "Deploy from GitHub repo"
2. Connect your GitHub account
3. Select this repository
4. Railway automatically detects it's a Node.js project
5. Click "Deploy" - that's it!

### Step 3: Set Environment Variables (30 seconds)
1. In Railway dashboard, click your project
2. Go to "Variables" tab
3. Add these variables:
   ```
   CARGODHAM_API_TOKEN = your_actual_jwt_token
   CARGODHAM_VENDOR_CODE = demo8
   ```
4. Click "Save"

### Step 4: Get Your URL (automatic)
- Railway gives you a URL like: `https://your-project.up.railway.app`
- Your API is now live globally! 🎉

## 🔗 **Your API Endpoints**

Once deployed, you can use these endpoints:

```
https://your-project.up.railway.app/
```

### Available Endpoints:
- `GET /` - API information
- `GET /health` - Health check
- `POST /api/login` - Login to CargoDham
- `GET /api/track/:awb` - Track shipment
- `POST /api/rate` - Calculate shipping rates
- `POST /api/book` - Book new order
- `GET /api/wallet` - Check wallet balance
- `GET /api/orders` - Get orders list
- `POST /api/cancel` - Cancel order

## 📱 **Test Your API (Easy!)**

### Test in Browser:
Visit: `https://your-project.up.railway.app/`

### Test with curl:
```bash
# Check if it's working
curl https://your-project.up.railway.app/health

# Track an order
curl https://your-project.up.railway.app/api/track/20056414613650
```

### Test with Postman:
1. Import the endpoints
2. Set base URL to your Railway URL
3. Test all endpoints!

## 🎮 **MCP Integration**

### For Cursor Users:
```json
{
  "cargodham-railway": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-fetch", "https://your-project.up.railway.app"]
  }
}
```

### Cursor Deeplink:
```
cursor://anysphere.cursor-deeplink/mcp/install?name=cargodham-railway&config=BASE64_CONFIG
```

## 💡 **Why Railway is Perfect for Beginners**

| Feature | Railway | Other Platforms |
|---------|---------|-----------------|
| **Setup Time** | 2 minutes | Hours |
| **Configuration** | Zero | Complex |
| **Free Tier** | $5 credits | Limited |
| **Auto-Deploy** | ✅ Yes | Manual |
| **Custom Domain** | ✅ Free | Paid |
| **SSL Certificate** | ✅ Auto | Manual |
| **Monitoring** | ✅ Built-in | Extra setup |

## 🔧 **Environment Variables You Need**

Copy these to Railway Variables section:

```env
CARGODHAM_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzZkMmI2NDkxMzc1YTQ0YjI5YjE1YzEiLCJuYW1lIjoiRGVtbyBRQSBQcmFzaGFudCBFZGl0"
CARGODHAM_VENDOR_CODE=demo8
```

## 🚀 **Advanced Features (Optional)**

### Custom Domain:
1. Go to Railway dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Railway handles SSL automatically!

### Auto-Deploy from GitHub:
- Every time you push code to GitHub
- Railway automatically rebuilds and deploys
- Zero downtime deployments

### Monitoring:
- Railway dashboard shows:
  - CPU usage
  - Memory usage
  - Request logs
  - Error tracking

## 🆘 **Troubleshooting (Don't Worry!)**

### Problem: "Application failed to respond"
**Solution:** Check environment variables are set correctly

### Problem: "API returns 500 error"
**Solution:** Check your CARGODHAM_API_TOKEN is valid

### Problem: "Can't find my Railway URL"
**Solution:** Go to Railway dashboard → Your project → "Deployments" tab

### Problem: "Out of credits"
**Solution:** Add payment method for $5/month (very cheap!)

## 📞 **Need Help?**

1. **Railway Discord**: Super helpful community
2. **Railway Docs**: [docs.railway.app](https://docs.railway.app)
3. **GitHub Issues**: Create an issue in this repo

## 🎉 **You're Done!**

Congratulations! Your CargoDham MCP Server is now:
- ✅ Running globally on Railway
- ✅ Accessible via HTTPS
- ✅ Auto-scaling based on usage
- ✅ Monitored and logged
- ✅ Ready for production use

**Your API URL**: `https://your-project.up.railway.app`

Share this URL with anyone who needs access to your CargoDham logistics API!

---

## 📊 **Project Structure**

```
railway-cargodham-mcp/
├── src/
│   └── index.ts          # Main server code
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── env.example           # Environment variables example
└── README.md            # This file
```

## 🔄 **Deployment Commands**

```bash
# Install dependencies
npm install

# Run locally for testing
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

**Railway handles all of this automatically!** 🎯 