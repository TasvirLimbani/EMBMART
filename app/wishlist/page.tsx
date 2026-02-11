

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import { SafeImage } from "@/components/imagehandel";
import { Badge, Check, Eye, ShoppingCart } from "lucide-react";
import WishlistButton from "@/components/WishlistButton";
import router from "next/router";
import { useCart } from "@/lib/cart-context";
import { FreedesignItem } from "@/models/Freedesign";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loading from "../designs/loading";

interface Order {
    id: number;
    designcode: string;
    area: string;
    name: string;
    category: string;
    image: string;
    stitches: string;
    price: string;
    created_at: string;
}
export default function WishlistPage() {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState<FreedesignItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [gridCols, setGridCols] = useState<3 | 4>(3)
    const [totalPages, setTotalPages] = useState(1)
    const [addedItems, setAddedItems] = useState<number[]>([])
    const [wishlistIds, setWishlistIds] = useState<number[]>([])
    const { addToCart, formatPrice } = useCart()

    useEffect(() => {
        setLoading(true)
        fetch(`/api/wishlist/get?user_id=${user?.id}`)
            .then((res) => res.json())
            .then((data) => {
                const ids = data.products.map((item: any) => item.id)
                setWishlistIds(ids)
                setWishlist(data.products)
                setLoading(false)
            })
            .catch(() => { })
    }, [user?.id])

    const handleAddToCart = (design: FreedesignItem) => {
        addToCart(design)

        setAddedItems((prev) => [...prev, design.id])
        setTimeout(() => {
            setAddedItems((prev) => prev.filter((id) => id !== design.id))
        }, 2000)
    }

    const toggleWishlist = async (designId: number) => {
        const isWishlisted = wishlistIds.includes(designId)

        await fetch(`/api/wishlist/${isWishlisted ? "delete" : "add"}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user?.id,
                product_id: designId,
            }),
        })

        setWishlistIds((prev) =>
            isWishlisted
                ? prev.filter((id) => id !== designId)
                : [...prev, designId]
        )
    }


    return (
        <ProtectedRoute>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-3">My Wishlist</h1>
                <p className="text-muted-foreground mb-6">
                    Browse our collection of {wishlist.length}+ premium embroidery designs
                </p>
                {/* GRID VIEW */}
                {loading ? (
                    <Loading />
                ) : (<>
                    <div className={`grid gap-6 sm:grid-cols-2 ${gridCols === 4 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
                        {wishlist.map((design) => (
                            <Link
                                key={design.id}
                                href={`/designs/${design.id}`}
                                className="group relative overflow-hidden rounded-xl bg-card shadow-sm transition hover:shadow-lg"
                            >
                                {/* Image */}
                                <div className="relative aspect-square overflow-hidden">
                                    <SafeImage
                                        src={design.image || "/images/images.png"}
                                        alt={design.name}
                                        className="object-contain object-center transition duration-300 group-hover:scale-105 "
                                    />


                                    {/* Badges */}
                                    <div className="absolute left-3 top-3 flex flex-col gap-1">
                                        {design.created_at &&
                                            new Date(design.created_at).toDateString() ===
                                            new Date().toDateString() && (
                                                <Badge className="bg-accent text-accent-foreground">
                                                    New
                                                </Badge>
                                            )}
                                        {/* {design.isSale && (
                    <Badge className="bg-destructive text-white">
                      Sale
                    </Badge>
                  )} */}
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition group-hover:opacity-100">
                                        <WishlistButton
                                            productId={design.id}
                                            user_id={Number(user?.id)}
                                            wishlistIds={wishlistIds}
                                            onToggle={toggleWishlist}
                                        />

                                        <button
                                            type="button"
                                            aria-label="Quick view"
                                            className="rounded-full bg-card p-2 text-foreground shadow-md transition hover:bg-primary hover:text-primary-foreground"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                router.push(`/designs/${design.id}`)
                                            }}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart */}
                                <div className="absolute inset-x-0 bottom-[72px] translate-y-full bg-white p-3 transition duration-300 group-hover:translate-y-0">
                                    <Button
                                        className="w-full bg-primary/30 text-foreground hover:bg-primary/90 hover:text-white"
                                        disabled={addedItems.includes(design.id)}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleAddToCart(design)
                                        }}
                                    >
                                        {addedItems.includes(design.id) ? (
                                            <>
                                                <Check className="mr-2 h-4 w-4" />
                                                Added to Cart
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="mr-2 h-4 w-4" />
                                                Add to Cart
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {/* Info */}
                                <div className="p-4">
                                    <span className="mb-1 block text-xs font-medium text-muted-foreground">
                                        {design.category}
                                    </span>
                                    <h3 className="mb-2 font-semibold text-foreground transition group-hover:text-primary overflow-hidden text-ellipsis"
                                        style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {design.name}
                                    </h3>

                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-primary">
                                            {formatPrice(Number(design.price))}
                                        </span>
                                        {Number(design.price) && (
                                            <span className="text-sm text-muted-foreground line-through">
                                                {formatPrice(Number(design.price) * 1.5)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>


                </>)}

            </div>
        </ProtectedRoute>
    );
}
