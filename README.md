[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/rspeciale0519-wincalcmcp-badge.png)](https://mseep.ai/app/rspeciale0519-wincalcmcp)

# Windows Calculator MCP Server

An MCP (Model Context Protocol) server that connects Claude Desktop to Windows Calculator, enabling Claude to perform accurate mathematical calculations using Windows' native calculation engine.

## Features

- **Accurate Calculations**: Uses Windows' native PowerShell calculation engine for precise results
- **Automatic Integration**: Starts and stops automatically with Claude Desktop
- **Seamless Experience**: No manual server management required
- **Secure**: Sanitizes input to prevent code injection
- **Simple Setup**: Easy one-time configuration

## Prerequisites

- **Windows Operating System**
- **Node.js** (version 16.0.0 or higher)
- **Claude Desktop** (Windows version)
- **PowerShell** (built into Windows)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rspeciale0519/WinCalcMCP.git
   cd WinCalcMCP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Test the server** (optional)
   ```bash
   node server.js
   ```
   You should see: `Windows Calculator MCP server running...`
   Press `Ctrl+C` to stop.

## Configuration

1. **Locate your Claude Desktop config file**
   Navigate to: `%APPDATA%\Claude\claude_desktop_config.json`
   
   If the file doesn't exist, create it.

2. **Add the MCP server configuration**
   ```json
   {
     "mcpServers": {
       "windows-calculator": {
         "command": "node",
         "args": ["C:\\path\\to\\your\\WinCalcMCP\\server.js"],
         "env": {}
       }
     }
   }
   ```
   
   **Important**: Replace `C:\\path\\to\\your\\WinCalcMCP\\server.js` with the actual path to your server.js file.

3. **Restart Claude Desktop**
   Close Claude Desktop completely and restart it.

## Usage

Once configured, you can ask Claude to perform calculations:

- "What is 123 × 456?"
- "Calculate 15% of 2,847"
- "What's the square root of 144?"
- "Solve: (25 + 17) × 3 - 8"

Claude will automatically use the Windows Calculator MCP server to provide accurate results.

## How It Works

The MCP server:
1. Receives calculation requests from Claude Desktop
2. Sanitizes the mathematical expression for security
3. Executes the calculation using PowerShell's `[math]` functions
4. Returns the precise result to Claude
5. Runs as a background process managed by Claude Desktop

## Supported Operations

- **Basic Arithmetic**: Addition (+), Subtraction (-), Multiplication (*), Division (/)
- **Parentheses**: For order of operations
- **Decimal Numbers**: Full floating-point precision
- **Mathematical Functions**: Via PowerShell's math library

## Troubleshooting

### Server won't start
- Verify Node.js is installed: `node --version`
- Check the path in `claude_desktop_config.json` is correct
- Ensure PowerShell is available: `powershell -Command "Get-Host"`

### Calculations not working
- Restart Claude Desktop completely
- Check that the MCP server appears in Claude Desktop's settings
- Verify the server.js file exists at the specified path

### Permission errors
- Run PowerShell as Administrator and execute:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

## File Structure

```
WinCalcMCP/
├── server.js          # Main MCP server code
├── package.json       # Node.js dependencies and metadata
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Technical Details

- **Language**: JavaScript (Node.js)
- **MCP SDK Version**: ^0.4.0
- **Protocol**: Uses stdio transport for communication with Claude Desktop
- **Calculation Engine**: Windows PowerShell `[math]` functions
- **Security**: Input sanitization prevents code injection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on Windows
5. Submit a pull request

## License

This project is licensed under a **Personal-Use-Only Software License**. 

### What this means:
- ✅ **Personal use is FREE** - Use for learning, personal projects, experimentation
- ✅ **Modify and customize** for your personal needs
- ✅ **Share with family/friends** for non-commercial purposes
- ❌ **Commercial use prohibited** - No business, professional, or revenue-generating use
- ❌ **No commercial distribution** - Cannot be used in business environments

### Commercial Licensing Available
If you need to use this MCP server for commercial purposes, please contact 4miodio@gmail.com for commercial licensing options.

See the [LICENSE](LICENSE) file for complete terms and conditions.

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your Windows version supports PowerShell
3. Ensure Claude Desktop is the latest version
4. Open an issue on GitHub with details about your setup

**Note**: Support is provided for personal use only. Commercial users should contact us for commercial licensing and support options.

## Commercial Licensing

For commercial use, professional support, or enterprise deployment, please contact 4miodio@gmail.com to discuss commercial licensing options.

## Acknowledgments

- Built using the [Model Context Protocol (MCP) SDK](https://github.com/modelcontextprotocol/sdk)
- Designed for integration with Anthropic's Claude Desktop
- Uses Windows' native calculation capabilities for accuracy
