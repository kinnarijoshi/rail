export const metadata = {
  title: 'CargoDham MCP Server',
  description: 'Model Context Protocol server for CargoDham logistics tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 