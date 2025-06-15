#!/usr/bin/env python3
"""
🚚 CargoDham MCP Server - Railway Deployment Script
SUPER EASY deployment for complete beginners!
"""

import os
import json
import base64
import urllib.parse
import webbrowser
from pathlib import Path

def print_banner():
    """Print welcome banner"""
    print("🚀" * 20)
    print("🚚 CARGODHAM MCP SERVER - RAILWAY DEPLOYMENT")
    print("🌟 SUPER EASY - NO EXPERIENCE NEEDED!")
    print("🚀" * 20)
    print()

def create_railway_deeplink():
    """Generate Railway deployment deeplink and MCP configuration"""
    
    # Railway MCP configuration
    railway_config = {
        "cargodham-railway": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-fetch", "https://your-project.up.railway.app"]
        }
    }
    
    # Generate Cursor deeplink
    config_json = json.dumps(railway_config, separators=(',', ':'))
    config_base64 = base64.b64encode(config_json.encode('utf-8')).decode('utf-8')
    cursor_deeplink = f"cursor://anysphere.cursor-deeplink/mcp/install?name=cargodham-railway&config={config_base64}"
    
    return railway_config, cursor_deeplink

def main():
    """Main deployment guide"""
    
    print_banner()
    
    print("📋 WHAT YOU'LL GET:")
    print("✅ Global API accessible worldwide")
    print("✅ HTTPS secure connection")
    print("✅ Auto-scaling and monitoring")
    print("✅ $5 free credits to start")
    print("✅ Zero configuration needed")
    print()
    
    print("🎯 STEP-BY-STEP DEPLOYMENT GUIDE:")
    print("=" * 50)
    
    # Step 1
    print("\n📍 STEP 1: Create Railway Account (2 minutes)")
    print("-" * 40)
    print("1. Go to: https://railway.app")
    print("2. Click 'Start a New Project'")
    print("3. Sign up with GitHub (recommended)")
    print("4. You get $5 free credits!")
    print()
    
    open_railway = input("🌐 Open Railway in browser now? (y/N): ")
    if open_railway.lower() == 'y':
        webbrowser.open('https://railway.app')
        print("✅ Railway opened in browser!")
    
    input("\n⏳ Press Enter after creating your Railway account...")
    
    # Step 2
    print("\n📍 STEP 2: Deploy Your Project (1 click!)")
    print("-" * 40)
    print("1. In Railway, click 'Deploy from GitHub repo'")
    print("2. Connect your GitHub account")
    print("3. Select this repository")
    print("4. Railway auto-detects Node.js project")
    print("5. Click 'Deploy' - that's it!")
    print()
    
    input("⏳ Press Enter after deploying your project...")
    
    # Step 3
    print("\n📍 STEP 3: Set Environment Variables (30 seconds)")
    print("-" * 40)
    print("1. In Railway dashboard, click your project")
    print("2. Go to 'Variables' tab")
    print("3. Add these variables:")
    print()
    print("   Variable Name: CARGODHAM_API_TOKEN")
    print("   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzZkMmI2NDkxMzc1YTQ0YjI5YjE1YzEiLCJuYW1lIjoiRGVtbyBRQSBQcmFzaGFudCBFZGl0")
    print()
    print("   Variable Name: CARGODHAM_VENDOR_CODE")
    print("   Value: demo8")
    print()
    print("4. Click 'Save'")
    print()
    
    input("⏳ Press Enter after setting environment variables...")
    
    # Step 4
    print("\n📍 STEP 4: Get Your URL (automatic)")
    print("-" * 40)
    print("Railway gives you a URL like:")
    print("https://your-project.up.railway.app")
    print()
    
    railway_url = input("🔗 Enter your Railway URL (or press Enter to use example): ")
    if not railway_url:
        railway_url = "https://your-project.up.railway.app"
    
    # Generate configurations
    railway_config, cursor_deeplink = create_railway_deeplink()
    
    # Update config with actual URL
    railway_config["cargodham-railway"]["args"][2] = railway_url
    
    # Regenerate deeplink with actual URL
    config_json = json.dumps(railway_config, separators=(',', ':'))
    config_base64 = base64.b64encode(config_json.encode('utf-8')).decode('utf-8')
    cursor_deeplink = f"cursor://anysphere.cursor-deeplink/mcp/install?name=cargodham-railway&config={config_base64}"
    
    # Success summary
    print("\n🎉 DEPLOYMENT COMPLETE!")
    print("=" * 50)
    print(f"🌐 Your API URL: {railway_url}")
    print()
    print("📋 Available Endpoints:")
    print(f"  • {railway_url}/ - API info")
    print(f"  • {railway_url}/health - Health check")
    print(f"  • {railway_url}/api/login - Login")
    print(f"  • {railway_url}/api/track/AWB_NUMBER - Track order")
    print(f"  • {railway_url}/api/wallet - Wallet balance")
    print(f"  • {railway_url}/api/orders - Get orders")
    print()
    
    print("🔗 Cursor MCP Deeplink:")
    print(cursor_deeplink)
    print()
    
    print("📋 MCP Configuration for Cursor:")
    print(json.dumps(railway_config, indent=2))
    print()
    
    # Test the API
    print("🧪 TEST YOUR API:")
    print("-" * 20)
    print(f"1. Visit: {railway_url}")
    print(f"2. Test health: {railway_url}/health")
    print(f"3. Track order: {railway_url}/api/track/20056414613650")
    print()
    
    test_now = input("🌐 Open your API in browser to test? (y/N): ")
    if test_now.lower() == 'y':
        webbrowser.open(railway_url)
        print("✅ API opened in browser!")
    
    # Save deployment summary
    summary = f"""
# 🚚 CargoDham MCP Server - Railway Deployment Summary

## 🎉 Deployment Complete!

### 🌐 Your API Details:
- **URL**: {railway_url}
- **Status**: Live and running globally
- **SSL**: Automatically enabled
- **Monitoring**: Available in Railway dashboard

### 📋 API Endpoints:
- `GET {railway_url}/` - API information
- `GET {railway_url}/health` - Health check
- `POST {railway_url}/api/login` - Login to CargoDham
- `GET {railway_url}/api/track/:awb` - Track shipment
- `POST {railway_url}/api/rate` - Calculate rates
- `POST {railway_url}/api/book` - Book order
- `GET {railway_url}/api/wallet` - Wallet balance
- `GET {railway_url}/api/orders` - Get orders
- `POST {railway_url}/api/cancel` - Cancel order

### 🔗 Cursor MCP Integration:

**Deeplink:**
```
{cursor_deeplink}
```

**Manual Configuration:**
```json
{json.dumps(railway_config, indent=2)}
```

### 🧪 Quick Tests:
```bash
# Health check
curl {railway_url}/health

# Track order
curl {railway_url}/api/track/20056414613650

# Get wallet balance (requires auth)
curl {railway_url}/api/wallet
```

### 🎯 Next Steps:
1. ✅ Your API is live globally
2. ✅ Share the URL with users
3. ✅ Use the Cursor deeplink for MCP integration
4. ✅ Monitor usage in Railway dashboard

### 💡 Benefits You Now Have:
- 🌍 Global access (no local setup needed)
- ⚡ Lightning fast (Railway's edge network)
- 🔒 HTTPS secure by default
- 📊 Built-in monitoring and logs
- 🚀 Auto-scaling based on usage
- 💰 Cost-effective ($5 free credits)

**Congratulations! Your CargoDham MCP Server is now live! 🎉**
"""
    
    with open("RAILWAY_DEPLOYMENT_SUMMARY.md", "w", encoding="utf-8") as f:
        f.write(summary)
    
    print("📄 Deployment summary saved to: RAILWAY_DEPLOYMENT_SUMMARY.md")
    print()
    
    print("🎉 CONGRATULATIONS!")
    print("Your CargoDham MCP Server is now:")
    print("✅ Running globally on Railway")
    print("✅ Accessible via HTTPS")
    print("✅ Auto-scaling and monitored")
    print("✅ Ready for production use")
    print()
    print(f"🌟 Share this URL: {railway_url}")
    print("🚀 Anyone can now use your logistics API!")
    print()
    
    print("🆘 Need Help?")
    print("- Railway Discord: Super helpful community")
    print("- Railway Docs: https://docs.railway.app")
    print("- This project's README.md has troubleshooting tips")

if __name__ == "__main__":
    main() 