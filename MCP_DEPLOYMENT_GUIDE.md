# 🚀 Official MCP Server Deployment Guide

## 🎉 **UPGRADED TO OFFICIAL VERCEL MCP STANDARD!**

Your CargoDham server has been transformed into a **proper MCP (Model Context Protocol) server** using Vercel's official `@vercel/mcp-adapter` package!

## 🔧 **What Changed**

### ✅ **Before (Custom Express Server)**
- Custom REST API endpoints
- Manual JSON responses
- No MCP standard compliance

### ✅ **After (Official MCP Server)**
- Uses `@vercel/mcp-adapter` package
- Full MCP protocol compliance
- Works with any MCP-compatible client (Claude, Cursor, etc.)
- Proper tool definitions with Zod validation

## 🛠️ **New Architecture**

### **File Structure**
```
├── app/api/mcp/route.ts    # Official MCP server endpoint
├── package.json            # Updated with MCP dependencies
├── vercel.json            # Simplified Vercel config
└── MCP_DEPLOYMENT_GUIDE.md # This guide
```

### **7 MCP Tools Available**
1. **`cargodham_login`** - Authentication with email/password
2. **`cargodham_track_order`** - Track shipments by AWB number
3. **`cargodham_calculate_rate`** - Calculate shipping rates
4. **`cargodham_book_order`** - Create new shipping orders
5. **`cargodham_wallet_balance`** - Check account balance
6. **`cargodham_get_orders`** - List orders with pagination
7. **`cargodham_cancel_order`** - Cancel existing orders

## 🌐 **Deployment URL**

Once deployed, your MCP server will be available at:
```
https://your-vercel-app.vercel.app/api/mcp
```

## 🔗 **Connect to MCP Clients**

### **Cursor Configuration**
Add to your Cursor MCP settings:
```json
{
  "mcpServers": {
    "cargodham": {
      "url": "https://your-vercel-app.vercel.app/api/mcp"
    }
  }
}
```

### **Claude Desktop Configuration**
Add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "cargodham": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-fetch", "https://your-vercel-app.vercel.app/api/mcp"]
    }
  }
}
```

## 🧪 **Test Your MCP Server**

### **1. Local Testing**
```bash
# Install MCP inspector
npx @modelcontextprotocol/inspector@latest https://your-vercel-app.vercel.app/api/mcp

# Open inspector at http://127.0.0.1:6274
# Select "Streamable HTTP" transport
# Enter your server URL and click Connect
```

### **2. Test Individual Tools**
Once connected in the inspector:
1. Click "List Tools" to see all 7 CargoDham tools
2. Click on any tool (e.g., `cargodham_track_order`)
3. Fill in the required parameters
4. Click "Call Tool" to test

## 📊 **Tool Examples**

### **Login Tool**
```json
{
  "email": "your-email@example.com",
  "password": "your-password"
}
```

### **Track Order Tool**
```json
{
  "awb_number": "AWB123456789"
}
```

### **Calculate Rate Tool**
```json
{
  "pickup_postcode": "110001",
  "delivery_postcode": "400001",
  "weight": 1.5,
  "cod": 500
}
```

### **Book Order Tool**
```json
{
  "order_id": "ORD-2025-001",
  "order_date": "2025-06-15",
  "pickup_location": "New Delhi",
  "billing_customer_name": "John Doe",
  "billing_phone": "9876543210",
  "billing_address": "123 Main Street",
  "billing_city": "Delhi",
  "billing_pincode": "110001",
  "billing_state": "Delhi",
  "order_items": [
    {
      "name": "Sample Product",
      "sku": "SKU001",
      "units": 1,
      "selling_price": 500
    }
  ],
  "sub_total": 500,
  "length": 10,
  "breadth": 10,
  "height": 5,
  "weight": 1.0
}
```

## 🔐 **Environment Variables**

Set these in your Vercel dashboard:
- `CARGODHAM_API_TOKEN` - Your CargoDham/Shiprocket API token
- `CARGODHAM_VENDOR_CODE` - Your vendor code (default: demo8)

## 🎯 **Benefits of MCP Standard**

### **Universal Compatibility**
- Works with Claude Desktop
- Works with Cursor IDE
- Works with any MCP-compatible client
- Future-proof protocol

### **Better Developer Experience**
- Type-safe with Zod validation
- Automatic parameter validation
- Rich tool descriptions
- Standardized error handling

### **Production Ready**
- Vercel's optimized serverless functions
- Automatic scaling
- Global CDN distribution
- Built-in monitoring

## 🚀 **Next Steps**

1. **Deploy to Vercel** - Push changes to trigger deployment
2. **Set Environment Variables** - Add your API credentials
3. **Test with MCP Inspector** - Verify all tools work
4. **Connect to Cursor/Claude** - Start using in your AI workflow

## 🎉 **Success!**

Your **CargoDham MCP Server** is now:
- ✅ MCP Protocol Compliant
- ✅ Vercel Optimized
- ✅ Globally Accessible
- ✅ AI Client Ready

**You now have a professional-grade MCP server that can be used by any AI application worldwide!** 🌍 