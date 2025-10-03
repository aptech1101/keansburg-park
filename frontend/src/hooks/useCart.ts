import { useState, useEffect } from 'react';

type CartItem = {
  id?: string;
  zoneCode: "PARK" | "WATER";
  visitDate: string;
  quantity: number;
};

const CART_KEY = "cart";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Đọc cart từ localStorage khi component mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const raw = localStorage.getItem(CART_KEY) || "[]";
        const parsed: CartItem[] = JSON.parse(raw);
        setCartItems(Array.isArray(parsed) ? parsed : []);
        // console.log('Loaded cart from localStorage:', parsed);
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
      }
    };
    
    loadCart();
    
    // Listen for focus events to reload cart when tab becomes active
    const handleFocus = () => {
      loadCart();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Lắng nghe thay đổi localStorage từ các tab khác và custom events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_KEY) {
        try {
          const raw = e.newValue || "[]";
          const parsed: CartItem[] = JSON.parse(raw);
          setCartItems(Array.isArray(parsed) ? parsed : []);
          // console.log('Storage changed, updated cart:', parsed);
        } catch {
          setCartItems([]);
        }
      }
    };

    const handleCartUpdate = (e: CustomEvent) => {
      // console.log('Cart update event received:', e.detail);
      setCartItems(e.detail.cartItems || []);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
    };
  }, []);

  // Tính tổng số lượng vé
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + Math.max(0, item.quantity || 0),
    0
  );
  
  // Debug log (remove in production)
  // console.log('useCart totalQuantity:', totalQuantity, 'cartItems:', cartItems);

  // Hàm để cập nhật cart items và localStorage
  const updateCartItems = (newItems: CartItem[]) => {
    setCartItems(newItems);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(newItems));
      // Dispatch custom event để sync với các components khác
      window.dispatchEvent(new CustomEvent('cartUpdated', { 
        detail: { cartItems: newItems } 
      }));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  };

  // Hàm để add to cart
  const addToCart = (item: CartItem) => {
    const newItems = [...cartItems, item];
    updateCartItems(newItems);
  };

  // Hàm để remove item from cart
  const removeFromCart = (index: number) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    updateCartItems(newItems);
  };

  // Hàm để update quantity
  const updateQuantity = (index: number, quantity: number) => {
    const newItems = cartItems.map((item, i) => 
      i === index ? { ...item, quantity } : item
    );
    updateCartItems(newItems);
  };

  // Hàm để clear cart
  const clearCart = () => {
    updateCartItems([]);
  };

  return {
    cartItems,
    totalQuantity,
    setCartItems: updateCartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
};
