import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Environment variables
const CARGODHAM_API_TOKEN = process.env.CARGODHAM_API_TOKEN || '';
const CARGODHAM_VENDOR_CODE = process.env.CARGODHAM_VENDOR_CODE || 'demo8';

// MCP Server Tools
class CargoDhamMCPServer {
  
  // Login tool
  async login(email: string, password: string) {
    try {
      const response = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Login error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Track order tool
  async trackOrder(awbNumber: string) {
    try {
      const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awbNumber}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${CARGODHAM_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error(`Track order failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Track order error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Calculate rate tool
  async calculateRate(pickupPostcode: string, deliveryPostcode: string, weight: number, cod: number = 0) {
    try {
      const response = await fetch("https://apiv2.shiprocket.in/v1/external/courier/serviceability/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${CARGODHAM_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error(`Calculate rate failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Calculate rate error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Book order tool
  async bookOrder(orderData: any) {
    try {
      const response = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${CARGODHAM_API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        throw new Error(`Book order failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Book order error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get wallet balance tool
  async getWalletBalance() {
    try {
      const response = await fetch("https://apiv2.shiprocket.in/v1/external/account/details/wallet-balance", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${CARGODHAM_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error(`Get wallet balance failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Wallet balance error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get orders tool
  async getOrders(page: number = 1, perPage: number = 10) {
    try {
      const response = await fetch(`https://apiv2.shiprocket.in/v1/external/orders?page=${page}&per_page=${perPage}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${CARGODHAM_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error(`Get orders failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Get orders error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Cancel order tool
  async cancelOrder(orderId: string) {
    try {
      const response = await fetch("https://apiv2.shiprocket.in/v1/external/orders/cancel", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${CARGODHAM_API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ids: [orderId] })
      });
      
      if (!response.ok) {
        throw new Error(`Cancel order failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Cancel order error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

const mcpServer = new CargoDhamMCPServer();

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🚚 CargoDham MCP Server - Railway Deployment',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      login: 'POST /api/login',
      track: 'GET /api/track/:awb',
      rate: 'POST /api/rate',
      book: 'POST /api/book',
      wallet: 'GET /api/wallet',
      orders: 'GET /api/orders',
      cancel: 'POST /api/cancel'
    },
    docs: 'https://github.com/your-repo/railway-cargodham-mcp'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// MCP Tools as REST API endpoints

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    const result = await mcpServer.login(email, password);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Track order
app.get('/api/track/:awb', async (req, res) => {
  try {
    const { awb } = req.params;
    if (!awb) {
      return res.status(400).json({ error: 'AWB number required' });
    }
    
    const result = await mcpServer.trackOrder(awb);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Calculate rate
app.post('/api/rate', async (req, res) => {
  try {
    const { pickup_postcode, delivery_postcode, weight, cod } = req.body;
    if (!pickup_postcode || !delivery_postcode || !weight) {
      return res.status(400).json({ error: 'Pickup postcode, delivery postcode, and weight required' });
    }
    
    const result = await mcpServer.calculateRate(pickup_postcode, delivery_postcode, weight, cod);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Book order
app.post('/api/book', async (req, res) => {
  try {
    const orderData = req.body;
    if (!orderData || !orderData.order_id) {
      return res.status(400).json({ error: 'Order data with order_id required' });
    }
    
    const result = await mcpServer.bookOrder(orderData);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Get wallet balance
app.get('/api/wallet', async (req, res) => {
  try {
    const result = await mcpServer.getWalletBalance();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Get orders
app.get('/api/orders', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.per_page as string) || 10;
    
    const result = await mcpServer.getOrders(page, perPage);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Cancel order
app.post('/api/cancel', async (req, res) => {
  try {
    const { order_id } = req.body;
    if (!order_id) {
      return res.status(400).json({ error: 'Order ID required' });
    }
    
    const result = await mcpServer.cancelOrder(order_id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Endpoint not found',
    available_endpoints: [
      'GET /',
      'GET /health',
      'POST /api/login',
      'GET /api/track/:awb',
      'POST /api/rate',
      'POST /api/book',
      'GET /api/wallet',
      'GET /api/orders',
      'POST /api/cancel'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚚 CargoDham MCP Server running on Railway!`);
  console.log(`🌐 Port: ${PORT}`);
  console.log(`🔑 API Token: ${CARGODHAM_API_TOKEN ? 'Set' : 'Not set'}`);
  console.log(`📦 Vendor Code: ${CARGODHAM_VENDOR_CODE}`);
  console.log(`✅ Server ready for requests!`);
});

export default app; 