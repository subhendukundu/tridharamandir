#!/bin/bash
# Setup script: Replace Stape GA4 MCP with Google's official analytics-mcp
# Run from your Mac terminal: bash ~/Desktop/work/tridhara/tridhara-landing/setup-ga4-mcp.sh

set -e
echo "=== Step 1: Check prerequisites ==="

# Check pipx
if ! command -v pipx &> /dev/null; then
    echo "pipx not found. Installing via brew..."
    brew install pipx
    pipx ensurepath
    echo "Please restart your terminal after this script, or run: source ~/.zshrc"
fi

echo "pipx: $(which pipx)"

# Check gcloud
if ! command -v gcloud &> /dev/null; then
    echo ""
    echo "ERROR: gcloud CLI is not installed."
    echo "Install it from: https://cloud.google.com/sdk/docs/install"
    echo "On Mac: brew install google-cloud-sdk"
    echo ""
    echo "After installing gcloud, re-run this script."
    exit 1
fi

echo "gcloud: $(which gcloud)"

echo ""
echo "=== Step 2: Install Google Analytics MCP ==="
pipx install analytics-mcp
echo "analytics-mcp installed!"

echo ""
echo "=== Step 3: Set up Application Default Credentials ==="
echo "This will open a browser for Google OAuth consent..."
echo "Sign in with the Google account that has GA4 access."
echo ""

gcloud auth application-default login \
  --scopes https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform \
  --client-id-file="$HOME/claude-mcp/client_secrets.json"

# Find the ADC credentials path
ADC_PATH="$HOME/.config/gcloud/application_default_credentials.json"
if [ ! -f "$ADC_PATH" ]; then
    echo "WARNING: Expected credentials at $ADC_PATH but file not found."
    echo "Check the output above for the actual path."
    exit 1
fi

echo "Credentials saved at: $ADC_PATH"

echo ""
echo "=== Step 4: Update Claude Desktop config ==="
CONFIG_PATH="$HOME/Library/Application Support/Claude/claude_desktop_config.json"

if [ ! -f "$CONFIG_PATH" ]; then
    echo "Claude Desktop config not found at: $CONFIG_PATH"
    echo "You'll need to manually update your config."
    exit 1
fi

echo "Current config:"
cat "$CONFIG_PATH"
echo ""

# Use python3 to update the JSON config
python3 << 'PYEOF'
import json, os, sys

config_path = os.path.expanduser("~/Library/Application Support/Claude/claude_desktop_config.json")
adc_path = os.path.expanduser("~/.config/gcloud/application_default_credentials.json")

with open(config_path, "r") as f:
    config = json.load(f)

servers = config.get("mcpServers", {})

# Remove old Stape GA4 entry (check common names)
for key in list(servers.keys()):
    if "ga4" in key.lower() or "stape" in key.lower():
        print(f"Removing old entry: {key}")
        del servers[key]

# Add new Google official analytics-mcp
servers["analytics-mcp"] = {
    "command": "pipx",
    "args": ["run", "analytics-mcp"],
    "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": adc_path,
        "GOOGLE_PROJECT_ID": "gen-lang-client-0373494956"
    }
}

config["mcpServers"] = servers

with open(config_path, "w") as f:
    json.dump(config, f, indent=2)

print("Updated config:")
print(json.dumps(config, indent=2))
PYEOF

echo ""
echo "=== Done! ==="
echo "Restart Claude Desktop to pick up the new GA4 MCP."
echo "The old Stape GA4 entry has been removed and replaced with Google's official analytics-mcp."
