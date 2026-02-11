"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import { SafeImage } from "@/components/imagehandel";
import Link from "next/link";

interface Order {
    id: number;
    user_id: number;
    product_id: number;
    product_name: string;
    product_category: string;
    product_image: string;
    quantity: number;
    order_date: string;
}

export default function MyOrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/orders?user_id=${user.id}`);
                const data = await res.json();

                if (data.status === "success") {
                    setOrders(data.orders);
                } else {
                    setOrders([]);
                }
            } catch (error) {
                console.error("Failed to fetch orders", error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    return (
        <ProtectedRoute>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">My Orders</h1>

                {loading && <p>Loading orders...</p>}

                {!loading && orders.length === 0 && (
                    <p className="text-muted-foreground">No orders found.</p>
                )}

                {/* GRID VIEW */}
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {orders.map((order) => (
    <div
      key={order.id} // ✅ SINGLE UNIQUE KEY
      className="group relative overflow-hidden rounded-xl bg-card shadow-sm transition hover:shadow-lg"
    >
      <div className="border rounded-lg bg-white overflow-hidden transition">

        {/* ✅ CLICKABLE PRODUCT AREA */}
        <Link href={`/designs/${order.product_id}`} className="block">
          {/* Image */}
          <div className="relative w-full h-48 bg-white">
            <SafeImage
              src={order.product_image || "/images/images.png"}
              alt={order.product_name}
              className="object-contain object-center"
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-1 bg-primary/5">
            <h2 className="font-semibold text-sm line-clamp-1">
              {order.product_name}
            </h2>

            <p className="text-xs text-muted-foreground">
              Category: {order.product_category}
            </p>

            <p className="text-xs">
              Qty: <strong>{order.quantity}</strong>
            </p>

            <p className="text-xs text-muted-foreground">
              {new Date(order.order_date).toLocaleDateString()}
            </p>

            <div className="pt-2 text-xs text-muted-foreground">
              Order #{order.id}
            </div>
          </div>
        </Link>

        {/* 🔮 OPTIONAL: future actions area */}
        {/* 
        <div className="p-4 border-t">
          <Button size="sm">View Invoice</Button>
        </div> 
        */}
      </div>
    </div>
  ))}
</div>

            </div>
        </ProtectedRoute>
    );
}
