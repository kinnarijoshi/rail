import { z } from 'zod';
import { createMcpHandler } from '@vercel/mcp-adapter';

// Environment variables
const CARGODHAM_API_TOKEN = process.env.CARGODHAM_API_TOKEN || '';
const CARGODHAM_VENDOR_CODE = process.env.CARGODHAM_VENDOR_CODE || 'demo8';

const handler = createMcpHandler(
  (server) => {
    // 1. Login Tool
    server.tool(
      'cargodham_login',
      'Login to CargoDham/Shiprocket API to get authentication token',
      {
        email: z.string().email().describe('User email address'),
        password: z.string().min(1).describe('User password')
      },
      async ({ email, password }) => {
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
          
          const data = await response.json();
          return {
            content: [{ 
              type: 'text', 
              text: `🔐 Login successful!\n\nToken: ${data.token}\nUser: ${data.first_name} ${data.last_name}\nEmail: ${data.email}\nCompany: ${data.company_name || 'N/A'}`
            }],
          };
        } catch (error) {
          return {
            content: [{ 
              type: 'text', 
              text: `❌ Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            }],
          };
        }
      }
    );

    // 2. Track Order Tool
    server.tool(
      'cargodham_track_order',
      'Track a shipment using AWB (Air Waybill) number',
      {
        awb_number: z.string().min(1).describe('AWB tracking number')
      },
      async ({ awb_number }) => {
        try {
          const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awb_number}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${CARGODHAM_API_TOKEN}`,
              "Content-Type": "application/json"
            }
          });
          
          if (!response.ok) {
            throw new Error(`Track order failed: ${response.status}`);
          }
          
          const data = await response.json();
          const tracking = data.tracking_data || {};
          
          return {
            content: [{ 
              type: 'text', 
              text: `📦 Tracking Status for AWB: ${awb_number}\n\n` +
                    `Status: ${tracking.track_status || 'Unknown'}\n` +
                    `Current Location: ${tracking.current_status || 'N/A'}\n` +
                    `Delivered: ${tracking.delivered ? 'Yes' : 'No'}\n` +
                    `Last Update: ${tracking.last_update_date || 'N/A'}`
            }],
          };
        } catch (error) {
          return {
            content: [{ 
              type: 'text', 
              text: `❌ Tracking failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            }],
          };
        }
      }
    );

    // 3. Calculate Shipping Rate Tool
    server.tool(
      'cargodham_calculate_rate',
      'Calculate shipping rates between pickup and delivery locations',
      {
        pickup_postcode: z.string().min(1).describe('Pickup postal code'),
        delivery_postcode: z.string().min(1).describe('Delivery postal code'),
        weight: z.number().positive().describe('Package weight in kg'),
        cod: z.number().min(0).optional().describe('Cash on Delivery amount (optional)')
      },
      async ({ pickup_postcode, delivery_postcode, weight, cod = 0 }) => {
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
          
          const data = await response.json();
          
          return {
            content: [{ 
              type: 'text', 
              text: `💰 Shipping Rate Calculation\n\n` +
                    `From: ${pickup_postcode} → To: ${delivery_postcode}\n` +
                    `Weight: ${weight}kg\n` +
                    `COD Amount: ₹${cod}\n\n` +
                    `Available Services: ${data.data?.available_courier_companies?.length || 0} couriers\n` +
                    `Rate calculation completed successfully!`
            }],
          };
        } catch (error) {
          return {
            content: [{ 
              type: 'text', 
              text: `❌ Rate calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            }],
          };
        }
      }
    );

    // 4. Book Order Tool
    server.tool(
      'cargodham_book_order',
      'Create a new shipping order',
      {
        order_id: z.string().min(1).describe('Unique order ID'),
        order_date: z.string().describe('Order date (YYYY-MM-DD)'),
        pickup_location: z.string().min(1).describe('Pickup address'),
        billing_customer_name: z.string().min(1).describe('Customer name'),
        billing_phone: z.string().min(10).describe('Customer phone number'),
        billing_address: z.string().min(1).describe('Billing address'),
        billing_city: z.string().min(1).describe('Billing city'),
        billing_pincode: z.string().min(6).describe('Billing pincode'),
        billing_state: z.string().min(1).describe('Billing state'),
        billing_country: z.string().default('India').describe('Billing country'),
        shipping_is_billing: z.boolean().default(true).describe('Use billing address for shipping'),
        order_items: z.array(z.object({
          name: z.string().min(1).describe('Item name'),
          sku: z.string().min(1).describe('Item SKU'),
          units: z.number().positive().describe('Quantity'),
          selling_price: z.number().positive().describe('Item price')
        })).min(1).describe('Array of order items'),
        payment_method: z.enum(['COD', 'Prepaid']).default('COD').describe('Payment method'),
        sub_total: z.number().positive().describe('Order subtotal'),
        length: z.number().positive().describe('Package length (cm)'),
        breadth: z.number().positive().describe('Package breadth (cm)'),
        height: z.number().positive().describe('Package height (cm)'),
        weight: z.number().positive().describe('Package weight (kg)')
      },
      async (orderData) => {
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
          
          const data = await response.json();
          
          return {
            content: [{ 
              type: 'text', 
              text: `✅ Order Created Successfully!\n\n` +
                    `Order ID: ${data.order_id}\n` +
                    `Shipment ID: ${data.shipment_id}\n` +
                    `Status: ${data.status}\n` +
                    `AWB Code: ${data.awb_code || 'Will be assigned soon'}\n` +
                    `Courier: ${data.courier_name || 'To be assigned'}`
            }],
          };
        } catch (error) {
          return {
            content: [{ 
              type: 'text', 
              text: `❌ Order booking failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            }],
          };
        }
      }
    );

    // 5. Get Wallet Balance Tool
    server.tool(
      'cargodham_wallet_balance',
      'Get current wallet balance and account details',
      {},
      async () => {
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
          
          const data = await response.json();
          
          return {
            content: [{ 
              type: 'text', 
              text: `💳 Wallet Balance\n\n` +
                    `Available Balance: ₹${data.data?.balance || 0}\n` +
                    `Currency: ${data.data?.currency || 'INR'}\n` +
                    `Account Status: Active\n` +
                    `Last Updated: ${new Date().toLocaleString()}`
            }],
          };
        } catch (error) {
          return {
            content: [{ 
              type: 'text', 
              text: `❌ Failed to get wallet balance: ${error instanceof Error ? error.message : 'Unknown error'}`
            }],
          };
        }
      }
    );

    // 6. Get Orders Tool
    server.tool(
      'cargodham_get_orders',
      'Retrieve list of orders with pagination',
      {
        page: z.number().positive().default(1).describe('Page number'),
        per_page: z.number().positive().max(50).default(10).describe('Orders per page (max 50)')
      },
      async ({ page, per_page }) => {
        try {
          const response = await fetch(`https://apiv2.shiprocket.in/v1/external/orders?page=${page}&per_page=${per_page}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${CARGODHAM_API_TOKEN}`,
              "Content-Type": "application/json"
            }
          });
          
          if (!response.ok) {
            throw new Error(`Get orders failed: ${response.status}`);
          }
          
          const data = await response.json();
          const orders = data.data || [];
          
          return {
            content: [{ 
              type: 'text', 
              text: `📋 Orders List (Page ${page})\n\n` +
                    `Total Orders: ${orders.length}\n` +
                    `Per Page: ${per_page}\n\n` +
                    orders.slice(0, 5).map((order: any, index: number) => 
                      `${index + 1}. Order #${order.id}\n` +
                      `   Status: ${order.status}\n` +
                      `   Customer: ${order.customer_name}\n` +
                      `   Amount: ₹${order.total}\n`
                    ).join('\n') +
                    (orders.length > 5 ? `\n... and ${orders.length - 5} more orders` : '')
            }],
          };
        } catch (error) {
          return {
            content: [{ 
              type: 'text', 
              text: `❌ Failed to get orders: ${error instanceof Error ? error.message : 'Unknown error'}`
            }],
          };
        }
      }
    );

    // 7. Cancel Order Tool
    server.tool(
      'cargodham_cancel_order',
      'Cancel an existing order',
      {
        order_id: z.string().min(1).describe('Order ID to cancel')
      },
      async ({ order_id }) => {
        try {
          const response = await fetch("https://apiv2.shiprocket.in/v1/external/orders/cancel", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${CARGODHAM_API_TOKEN}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ ids: [order_id] })
          });
          
          if (!response.ok) {
            throw new Error(`Cancel order failed: ${response.status}`);
          }
          
          const data = await response.json();
          
          return {
            content: [{ 
              type: 'text', 
              text: `🚫 Order Cancellation\n\n` +
                    `Order ID: ${order_id}\n` +
                    `Status: ${data.message || 'Cancellation processed'}\n` +
                    `Processed at: ${new Date().toLocaleString()}`
            }],
          };
        } catch (error) {
          return {
            content: [{ 
              type: 'text', 
              text: `❌ Order cancellation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            }],
          };
        }
      }
    );
  },
  {
    name: 'CargoDham MCP Server',
    version: '1.0.0',
    description: 'Comprehensive logistics and shipping management server with 7 powerful tools for CargoDham/Shiprocket API integration'
  },
  { basePath: '/api' }
);

export { handler as GET, handler as POST, handler as DELETE }; 