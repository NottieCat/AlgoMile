"use client"

import * as React from "react"
import Image from "next/image"
import { z } from "zod"
import { Loader2, Plus, Minus, Trash2, ShoppingCart, Clock, DollarSign } from "lucide-react"

import { optimizeRoute, type OptimizeRouteOutput } from "@/ai/flows/dynamic-route-optimization"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog"

// Mock product data
const products = [
  { id: 1, name: "Wireless Mouse", price: 25.99, image: "https://placehold.co/400x300.png", hint: "wireless mouse" },
  { id: 2, name: "Mechanical Keyboard", price: 79.99, image: "https://placehold.co/400x300.png", hint: "mechanical keyboard" },
  { id: 3, name: "4K Webcam", price: 59.50, image: "https://placehold.co/400x300.png", hint: "webcam" },
  { id: 4, name: "USB-C Hub", price: 34.00, image: "https://placehold.co/400x300.png", hint: "usb hub" },
  { id: 5, name: "Ergonomic Chair", price: 299.99, image: "https://placehold.co/400x300.png", hint: "office chair" },
  { id: 6, name: "Standing Desk", price: 450.00, image: "https://placehold.co/400x300.png", hint: "standing desk" },
];

type Product = typeof products[0];
type CartItem = Product & { quantity: number };

export default function CustomerDashboardPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [result, setResult] = React.useState<OptimizeRouteOutput | null>(null)
  const [cart, setCart] = React.useState<CartItem[]>([])
  const [optimizationPreference, setOptimizationPreference] = React.useState<"time" | "cost">("time")
  const { toast } = useToast()

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId))
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const subtotal = React.useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }, [cart])
  
  const shippingCost = React.useMemo(() => {
    if (cart.length === 0) return 0
    return optimizationPreference === "cost" ? 5.99 : 15.99
  }, [cart.length, optimizationPreference]);

  const total = subtotal + shippingCost

  async function handleCheckout() {
    setIsLoading(true)
    setResult(null)
    
    const shipmentDetails = `
      Order for customer.
      Items: ${cart.map(item => `${item.quantity}x ${item.name}`).join(", ")}.
      Total Value: $${total.toFixed(2)}.
      User optimization preference: ${optimizationPreference === 'time' ? 'Fastest delivery time' : 'Lowest delivery cost'}.
    `.trim()

    try {
      const response = await optimizeRoute({
        shipmentDetails,
        trafficConditions: "Moderate traffic in urban areas.", // generic value
        weatherConditions: "Clear skies.", // generic value
      })
      setResult(response)
    } catch (error) {
      console.error("Error during checkout:", error)
      toast({
        variant: "destructive",
        title: "Checkout Error",
        description: "Failed to plan the route. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader className="p-0">
                  <Image 
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover rounded-t-lg"
                    data-ai-hint={product.hint}
                  />
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-xl font-semibold mt-2">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" onClick={() => addToCart(product)}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 lg:sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>Your Order</CardTitle>
              <CardDescription>Review your items before checkout.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <ShoppingCart className="mx-auto h-12 w-12" />
                  <p className="mt-2">Your cart is empty.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint={item.hint}/>
                      <div className="flex-grow">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => updateQuantity(item.id, 0)}>
                        <Trash2 className="h-4 w-4"/>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              {cart.length > 0 && (
                <>
                  <Separator />
                  <RadioGroup value={optimizationPreference} onValueChange={(v) => setOptimizationPreference(v as "time" | "cost")} className="grid grid-cols-2 gap-4">
                     <div>
                      <RadioGroupItem value="time" id="time" className="peer sr-only" />
                      <Label htmlFor="time" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                        <Clock className="mb-2 h-6 w-6"/>
                        Optimize Time
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="cost" id="cost" className="peer sr-only" />
                      <Label htmlFor="cost" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                        <DollarSign className="mb-2 h-6 w-6"/>
                        Optimize Cost
                      </Label>
                    </div>
                  </RadioGroup>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCheckout} disabled={isLoading || cart.length === 0}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : "Proceed to Checkout"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {result && (
        <AlertDialog open={!!result} onOpenChange={(open) => !open && setResult(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Order Placed & Route Optimized!</AlertDialogTitle>
              <AlertDialogDescription>
                Here is your optimized delivery plan. Thank you for your order!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-4 my-4">
              <div>
                <h3 className="font-semibold">Recommended Route</h3>
                <p className="text-sm text-muted-foreground">{result.optimizedRoute}</p>
              </div>
              <div>
                <h3 className="font-semibold">Estimated Arrival Time</h3>
                <p className="text-sm text-muted-foreground">{result.estimatedTimeOfArrival}</p>
              </div>
              <div>
                <h3 className="font-semibold">Potential Delays</h3>
                <p className="text-sm text-muted-foreground">{result.potentialDelays}</p>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => {
                setResult(null)
                setCart([])
              }}>
                Close & New Order
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
