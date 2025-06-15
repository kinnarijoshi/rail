export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>🚚 CargoDham MCP Server</h1>
      <p>Your MCP server is running successfully!</p>
      
      <h2>📋 Available MCP Tools:</h2>
      <ul>
        <li><strong>cargodham_login</strong> - Authentication</li>
        <li><strong>cargodham_track_order</strong> - Track shipments</li>
        <li><strong>cargodham_calculate_rate</strong> - Calculate rates</li>
        <li><strong>cargodham_book_order</strong> - Create orders</li>
        <li><strong>cargodham_wallet_balance</strong> - Check balance</li>
        <li><strong>cargodham_get_orders</strong> - List orders</li>
        <li><strong>cargodham_cancel_order</strong> - Cancel orders</li>
      </ul>
      
      <h2>🔗 MCP Endpoint:</h2>
      <p><code>/api/mcp</code></p>
      
      <h2>🧪 Test with MCP Inspector:</h2>
      <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
        npx @modelcontextprotocol/inspector@latest {typeof window !== 'undefined' ? window.location.origin : 'https://your-app.vercel.app'}/api/mcp
      </pre>
    </div>
  )
} 