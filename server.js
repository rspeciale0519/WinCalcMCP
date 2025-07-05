#!/usr/bin/env node

// Import required modules
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { 
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');
const { spawn } = require('child_process');

// Create MCP server instance
const server = new Server(
  {
    name: 'windows-calculator-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define calculator tool for basic arithmetic
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'calculate',
        description: 'Perform accurate calculations using Windows Calculator',
        inputSchema: {
          type: 'object',
          properties: {
            expression: {
              type: 'string',
              description: 'Mathematical expression to calculate (e.g., "2+2", "15*8", "100/4")',
            },
          },
          required: ['expression'],
        },
      },
    ],
  };
});

// Handle calculator tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === 'calculate') {
    try {
      // Use PowerShell to perform calculation since Windows Calculator GUI is complex to automate
      // This provides accurate results using Windows' built-in calculation engine
      const result = await executeCalculation(args.expression);
      
      return {
        content: [
          {
            type: 'text',
            text: `Calculation: ${args.expression} = ${result}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error calculating ${args.expression}: ${error.message}`,
          },
        ],
      };
    }
  }
  
  throw new Error(`Unknown tool: ${name}`);
});

// Function to execute calculation using PowerShell (uses Windows calculation engine)
async function executeCalculation(expression) {
  return new Promise((resolve, reject) => {
    // Sanitize expression to prevent code injection
    const sanitizedExpression = expression.replace(/[^0-9+\-*/().\s]/g, '');
    
    // Use PowerShell to calculate - this uses Windows' native calculation engine
    const powershell = spawn('powershell.exe', [
      '-NoProfile',
      '-NonInteractive',
      '-Command',
      `[math]::Round((${sanitizedExpression}), 10)`
    ]);
    
    let output = '';
    let errorOutput = '';
    
    powershell.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    powershell.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    powershell.on('close', (code) => {
      if (code === 0) {
        const result = output.trim();
        resolve(result);
      } else {
        reject(new Error(`Calculation failed: ${errorOutput}`));
      }
    });
  });
}

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  // Log that server is running (this goes to stderr so it doesn't interfere with MCP protocol)
  console.error('Windows Calculator MCP server running...');
}

main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});