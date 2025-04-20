"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  unit: string
  image: string
  farmerId: number
  farmerName: string
  organic: boolean
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

/**
 * Provides a context for managing a shopping cart using React's Context API.
 *
 * @param {Object} props - The component's props.
 * @param {ReactNode} props.children - The children components to render within the cart provider.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("krishijyothi_cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse saved cart:", error)
      }
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("krishijyothi_cart", JSON.stringify(items))
  }, [items])

  /**
   * Adds or updates an item in the cart.
   *
   * @param {CartItem} item - The item to add or update. Must not include the "quantity" property.
   * @param {number} [quantity=1] - The quantity of the item to add. Defaults to 1.
   * @returns {void}
   *
   * @example
   * addItem({ id: '001', name: 'T-shirt' }, 2);
   * // Adds two T-shirts to the cart
   */
  const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((currentItems) => {
      // Check if item already exists in cart
      const existingItemIndex = currentItems.findIndex((i) => i.id === item.id)

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex].quantity += quantity

        toast({
          title: "Cart updated",
          description: `${item.name} quantity updated in your cart.`,
        })

        return updatedItems
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${item.name} has been added to your cart.`,
        })

        return [...currentItems, { ...item, quantity }]
      }
    })
  }

  const removeItem = (id: number) => {
    setItems((currentItems) => {
      const itemToRemove = currentItems.find((item) => item.id === id)
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.name} has been removed from your cart.`,
        })
      }
      return currentItems.filter((item) => item.id !== id)
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setItems((currentItems) => currentItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  /**
   * Clears the cart by resetting the items array to an empty state and displaying a toast notification.
   *
   * @function clearCart
   * @returns {void}
   */
  const clearCart = () => {
    setItems([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }

  // Calculate total number of items
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

/**
 * Custom hook that provides access to the cart context within a component.
 *
 * @returns {object} The current value of the CartContext. Throws an error if used outside of a CartProvider.
 * @throws {Error} If called outside of a CartProvider, indicating that the component is not wrapped in a CartProvider.
 */
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
