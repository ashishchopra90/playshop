import React, { useState } from 'react';
import { ShoppingCart, Home, Package, Wallet, Search, Star, ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const PlayShopApp = () => {
  const INITIAL_WALLET = 1000000;
  
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wallet, setWallet] = useState(INITIAL_WALLET);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { 
      id: 'kids', 
      name: 'Kids', 
      icon: '👶',
      description: 'Fashion & accessories for children',
      color: 'bg-gradient-to-br from-pink-50 to-pink-100'
    },
    { 
      id: 'electronics', 
      name: 'Electronics', 
      icon: '🎮',
      description: 'Kid-friendly tech & gadgets',
      color: 'bg-gradient-to-br from-blue-50 to-blue-100'
    },
    { 
      id: 'fashion', 
      name: 'Fashion', 
      icon: '👕',
      description: 'Trendy clothes & accessories',
      color: 'bg-gradient-to-br from-purple-50 to-purple-100'
    },
    { 
      id: 'toys', 
      name: 'Toys', 
      icon: '🎨',
      description: 'Educational & fun toys',
      color: 'bg-gradient-to-br from-yellow-50 to-yellow-100'
    }
  ];

  const products = {
    kids: [
      { 
        id: 'k1', 
        name: 'Dinosaur T-Shirt', 
        price: 25.99, 
        image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=150&h=150&fit=crop',
        rating: 4.5,
        reviews: 128,
        description: 'Cool T-Rex design, 100% cotton'
      },
      {
        id: 'k2',
        name: 'Rainbow Sneakers',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=150&h=150&fit=crop',
        rating: 4.7,
        reviews: 95,
        description: 'Colorful and comfortable sneakers'
      },
      {
        id: 'k3',
        name: 'Space Backpack',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop',
        rating: 4.6,
        reviews: 157,
        description: 'Fun galaxy print school bag'
      }
    ],
    electronics: [
      { 
        id: 'e1', 
        name: 'Learning Tablet', 
        price: 199.99, 
        image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=150&h=150&fit=crop',
        rating: 4.8,
        reviews: 256,
        description: 'Educational apps & parental controls'
      },
      {
        id: 'e2',
        name: 'Smart Watch',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=150&h=150&fit=crop',
        rating: 4.6,
        reviews: 183,
        description: 'Kid-friendly smartwatch with GPS'
      },
      {
        id: 'e3',
        name: 'Music Player',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=150&h=150&fit=crop',
        rating: 4.5,
        reviews: 142,
        description: 'Portable music player with headphones'
      }
    ],
    fashion: [
      { 
        id: 'f1', 
        name: 'Party Dress', 
        price: 49.99, 
        image: 'https://images.unsplash.com/photo-1534534665817-8493579d3fde?w=150&h=150&fit=crop',
        rating: 4.7,
        reviews: 89,
        description: 'Sparkly celebration wear'
      },
      {
        id: 'f2',
        name: 'Superhero Costume',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=150&h=150&fit=crop',
        rating: 4.9,
        reviews: 276,
        description: 'Complete superhero outfit'
      },
      {
        id: 'f3',
        name: 'Winter Jacket',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=150&h=150&fit=crop',
        rating: 4.8,
        reviews: 164,
        description: 'Warm and stylish winter coat'
      }
    ],
    toys: [
      { 
        id: 't1', 
        name: 'Building Blocks', 
        price: 59.99, 
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=150&h=150&fit=crop',
        rating: 4.9,
        reviews: 312,
        description: 'Creative construction set'
      },
      {
        id: 't2',
        name: 'Art Set',
        price: 44.99,
        image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=150&h=150&fit=crop',
        rating: 4.7,
        reviews: 198,
        description: 'Complete art supplies kit'
      },
      {
        id: 't3',
        name: 'Science Kit',
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=150&h=150&fit=crop',
        rating: 4.8,
        reviews: 245,
        description: 'Educational science experiments'
      }
    ]
  };

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const placeOrder = () => {
    const totalCost = cart.reduce((sum, item) => sum + item.price, 0);
    if (totalCost <= wallet) {
      const newOrder = {
        id: Date.now(),
        items: cart,
        total: totalCost,
        status: 'Processing',
        date: new Date().toLocaleDateString(),
        estimatedDelivery: new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()
      };
      setOrders([newOrder, ...orders]);
      setWallet(wallet - totalCost);
      setCart([]);
    }
  };

  const filteredProducts = selectedCategory ? 
    products[selectedCategory].filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

  const HomeView = () => (
    <div className="space-y-6">
      <div className="sticky top-0 bg-white py-4 space-y-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {!selectedCategory ? (
        <>
          <h2 className="text-2xl font-bold">Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map(category => (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-transform hover:scale-105 ${category.color}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{category.icon}</span>
                    <ChevronRight className="text-gray-400" />
                  </div>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">
              {categories.find(c => c.id === selectedCategory).name}
            </h3>
            <Button
              variant="ghost"
              onClick={() => setSelectedCategory(null)}
            >
              Back to Categories
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-40 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <h4 className="font-bold mb-2">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">{product.rating}</span>
                    <span className="ml-2 text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">${product.price}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    onClick={() => addToCart(product)}
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const CartView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      {cart.length === 0 ? (
        <Alert>
          <AlertTitle>Your cart is empty</AlertTitle>
          <AlertDescription>
            Start shopping to add items to your cart!
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <Card key={item.cartId}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <Button 
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromCart(item.cartId)}
                      >
                        Remove
                      </Button>
                    </div>
                    <p className="text-green-600 mt-2">${item.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Total:</span>
                  <span className="font-bold">
                    ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                  </span>
                </div>
                <Button 
                  onClick={placeOrder}
                  className="w-full"
                  size="lg"
                >
                  Place Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  const OrdersView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Orders</h2>
      {orders.length === 0 ? (
        <Alert>
          <AlertTitle>No orders yet</AlertTitle>
          <AlertDescription>
            Your order history will appear here
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order #{order.id}</CardTitle>
                    <CardDescription>Placed on {order.date}</CardDescription>
                  </div>
                  <Badge variant={
                    order.status === 'Delivered' ? 'default' :
                    order.status === 'Processing' ? 'secondary' :
                    'outline'
                  }>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.cartId} className="flex justify-between items-center py-2 border-b">
                      <div className="flex gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      <span className="font-medium">${item.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4">
                    <div>
                      <p className="text-sm text-gray-600">Estimated Delivery</p>
                      <p className="font-medium">{order.estimatedDelivery}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Order Total</p>
                      <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const WalletView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Wallet</h2>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Available Balance</p>
              <p className="text-4xl font-bold text-green-600">
                ${wallet.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Initial Amount</p>
                  <p className="text-2xl font-bold">
                    ${INITIAL_WALLET.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Total Spent</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${(INITIAL_WALLET - wallet).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.slice(0, 5).map(order => (
            <div key={order.id} className="flex justify-between items-center py-3 border-b last:border-0">
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-gray-600">{order.date}</p>
              </div>
              <p className="text-red-600">-${order.total.toFixed(2)}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">PlayShop</h1>
      
      {/* Main Content */}
      <div className="mb-16">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'cart' && <CartView />}
        {activeTab === 'orders' && <OrdersView />}
        {activeTab === 'wallet' && <WalletView />}
      </div>

      {/* Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-md mx-auto flex justify-around p-4">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('cart')}
            className={`flex flex-col items-center ${activeTab === 'cart' ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <ShoppingCart size={24} />
            <span className="text-xs">Cart ({cart.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex flex-col items-center ${activeTab === 'orders' ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <Package size={24} />
            <span className="text-xs">Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex flex-col items-center ${activeTab === 'wallet' ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <Wallet size={24} />
            <span className="text-xs">Wallet</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayShopApp;
