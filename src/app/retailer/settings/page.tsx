"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Save, Key, Shield, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"

// Mock user role - in real app this would come from auth context
const mockUser = {
  role: "admin", // or "user"
}

// Mock current settings
const mockSettings = {
  shopify: {
    apiKey: "sk_test_123456789",
    secretKey: "sk_secret_987654321",
    storeUrl: "mystore.myshopify.com",
    enabled: true,
  },
  magento: {
    apiKey: "mg_api_456789123",
    secretKey: "mg_secret_321654987",
    baseUrl: "https://mystore.magento.com",
    enabled: false,
  },
}

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState(mockSettings)
  const { toast } = useToast()

  // Check if user has admin access
  if (mockUser.role !== "admin") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Integration Settings</h1>
            <p className="text-muted-foreground">Configure platform integrations and API settings</p>
          </div>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Shield className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <p className="text-muted-foreground text-center">
              Only administrators can access integration settings. Please contact your system administrator for access.
            </p>
            <Badge variant="secondary" className="mt-4">
              Current Role: {mockUser.role}
            </Badge>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings Saved",
        description: "Integration settings have been successfully updated.",
      })
    }, 1500)
  }

  const updateShopifySettings = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      shopify: {
        ...prev.shopify,
        [field]: value,
      },
    }))
  }

  const updateMagentoSettings = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      magento: {
        ...prev.magento,
        [field]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integration Settings</h1>
          <p className="text-muted-foreground">Configure platform integrations and API settings</p>
        </div>
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          <Save className={`mr-2 h-4 w-4 ${isLoading ? "animate-pulse" : ""}`} />
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      {/* Security Notice */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
        <CardContent className="flex items-start gap-3 pt-6">
          <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-orange-800 dark:text-orange-200">Security Notice</h4>
            <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
              API keys and secrets are sensitive information. Ensure they are kept secure and only shared with
              authorized personnel.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Shopify Integration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Shopify Integration
              </CardTitle>
              <CardDescription>Configure your Shopify store connection and API credentials</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="shopify-enabled" className="text-sm">
                Enabled
              </Label>
              <Switch
                id="shopify-enabled"
                checked={settings.shopify.enabled}
                onCheckedChange={(checked) => updateShopifySettings("enabled", checked)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="shopify-store-url">Store URL</Label>
              <Input
                id="shopify-store-url"
                placeholder="mystore.myshopify.com"
                value={settings.shopify.storeUrl}
                onChange={(e) => updateShopifySettings("storeUrl", e.target.value)}
                disabled={!settings.shopify.enabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopify-api-key">API Key</Label>
              <Input
                id="shopify-api-key"
                type="password"
                placeholder="Enter Shopify API key"
                value={settings.shopify.apiKey}
                onChange={(e) => updateShopifySettings("apiKey", e.target.value)}
                disabled={!settings.shopify.enabled}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="shopify-secret">Secret Key</Label>
            <Input
              id="shopify-secret"
              type="password"
              placeholder="Enter Shopify secret key"
              value={settings.shopify.secretKey}
              onChange={(e) => updateShopifySettings("secretKey", e.target.value)}
              disabled={!settings.shopify.enabled}
            />
          </div>
          {settings.shopify.enabled && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Connected and active
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Magento Integration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Magento Integration
              </CardTitle>
              <CardDescription>Configure your Magento store connection and API credentials</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="magento-enabled" className="text-sm">
                Enabled
              </Label>
              <Switch
                id="magento-enabled"
                checked={settings.magento.enabled}
                onCheckedChange={(checked) => updateMagentoSettings("enabled", checked)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="magento-base-url">Base URL</Label>
              <Input
                id="magento-base-url"
                placeholder="https://mystore.magento.com"
                value={settings.magento.baseUrl}
                onChange={(e) => updateMagentoSettings("baseUrl", e.target.value)}
                disabled={!settings.magento.enabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="magento-api-key">API Key</Label>
              <Input
                id="magento-api-key"
                type="password"
                placeholder="Enter Magento API key"
                value={settings.magento.apiKey}
                onChange={(e) => updateMagentoSettings("apiKey", e.target.value)}
                disabled={!settings.magento.enabled}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="magento-secret">Secret Key</Label>
            <Input
              id="magento-secret"
              type="password"
              placeholder="Enter Magento secret key"
              value={settings.magento.secretKey}
              onChange={(e) => updateMagentoSettings("secretKey", e.target.value)}
              disabled={!settings.magento.enabled}
            />
          </div>
          {settings.magento.enabled ? (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Connected and active
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              Disabled
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Settings</CardTitle>
          <CardDescription>Configure additional integration preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-sync inventory</Label>
              <p className="text-sm text-muted-foreground">Automatically synchronize inventory levels every hour</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Real-time notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for order updates and inventory changes
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Debug logging</Label>
              <p className="text-sm text-muted-foreground">
                Enable detailed logging for troubleshooting integration issues
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
