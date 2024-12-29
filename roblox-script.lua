-- Key System Script for Roblox
local HttpService = game:GetService("HttpService")
local API_URL = "YOUR_API_URL" -- Replace with your actual API URL

local function getHWID()
    -- Generate a unique HWID based on Roblox-specific identifiers
    local hwid = game:GetService("RbxAnalyticsService"):GetClientId()
    return hwid
end

local function verifyKey(key)
    local success, response = pcall(function()
        return HttpService:RequestAsync({
            Url = API_URL .. "/api/verify-key",
            Method = "POST",
            Headers = {
                ["Content-Type"] = "application/json"
            },
            Body = HttpService:JSONEncode({
                key = key,
                robloxHwid = getHWID()
            })
        })
    end)
    
    if success then
        local data = HttpService:JSONDecode(response.Body)
        return data.success
    end
    
    return false
end

-- Example usage in your Roblox game
local function onKeySubmitted(key)
    if verifyKey(key) then
        print("Key verified successfully!")
        -- Grant access to your game features here
    else
        print("Invalid or expired key!")
        -- Show error message to player
    end
end

-- Create UI for key input
local screenGui = Instance.new("ScreenGui")
local frame = Instance.new("Frame")
local textBox = Instance.new("TextBox")
local submitButton = Instance.new("TextButton")

-- Configure UI elements
frame.Size = UDim2.new(0, 300, 0, 150)
frame.Position = UDim2.new(0.5, -150, 0.5, -75)
frame.BackgroundColor3 = Color3.fromRGB(45, 45, 45)

textBox.Size = UDim2.new(0.8, 0, 0.3, 0)
textBox.Position = UDim2.new(0.1, 0, 0.2, 0)
textBox.PlaceholderText = "Enter your key..."

submitButton.Size = UDim2.new(0.6, 0, 0.3, 0)
submitButton.Position = UDim2.new(0.2, 0, 0.6, 0)
submitButton.Text = "Submit"
submitButton.BackgroundColor3 = Color3.fromRGB(0, 120, 215)

-- Set up hierarchy
frame.Parent = screenGui
textBox.Parent = frame
submitButton.Parent = frame
screenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

-- Connect button to verification
submitButton.MouseButton1Click:Connect(function()
    onKeySubmitted(textBox.Text)
end)