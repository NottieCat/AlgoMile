"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search, Star } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

// Mock product data
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 128,
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation",
    inStock: true,
    fastDelivery: true,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.3,
    reviews: 89,
    category: "Electronics",
    description: "Track your fitness goals with this advanced smartwatch",
    inStock: true,
    fastDelivery: true,
  },
  {
    id: 3,
    name: "Organic Coffee Beans",
    price: 24.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 256,
    category: "Food & Beverages",
    description: "Premium organic coffee beans from sustainable farms",
    inStock: true,
    fastDelivery: false,
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviews: 67,
    category: "Furniture",
    description: "Comfortable ergonomic chair for long work sessions",
    inStock: false,
    fastDelivery: false,
  },
  {
    id: 5,
    name: "Portable Phone Charger",
    price: 39.99,
    originalPrice: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.2,
    reviews: 145,
    category: "Electronics",
    description: "High-capacity portable charger for all your devices",
    inStock: true,
    fastDelivery: true,
  },
  {
    id: 6,
    name: "Yoga Mat Premium",
    price: 49.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 203,
    category: "Sports & Fitness",
    description: "Non-slip premium yoga mat for all skill levels",
    inStock: true,
    fastDelivery: true,
  },
]

const categories = ["All", "Electronics", "Food & Beverages", "Furniture", "Sports & Fitness"]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const { addToCart } = useCart()
  const { toast } = useToast()

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || product.category === selectedCategory),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto py-28 px-4 md:px-6">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold font-headline">Browse Products</h1>
        <p className="text-muted-foreground">Discover amazing products with fast delivery options.</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
              {product.fastDelivery && <Badge className="absolute top-2 left-2 bg-green-500">Fast Delivery</Badge>}
              {!product.inStock && (
                <Badge variant="destructive" className="absolute top-2 right-2">
                  Out of Stock
                </Badge>
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm ml-1">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <Button className="w-full" onClick={() => handleAddToCart(product)} disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
