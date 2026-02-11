"use client";

import { useEffect, useRef, useState } from "react";
import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link"
import { log } from "console";

interface Account {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    created_at: string;
}

export default function MyAccountPage() {
    const { user, loginWithUser } = useAuth();
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState(true);

    const hasFetched = useRef(false);

    useEffect(() => {
        if (!user || hasFetched.current) return;

        const fetchAccount = async () => {
            try {
                const res = await fetch(`/api/account?user_id=${user.id}`);
                const data = await res.json();

                if (data.status) {
                    setAccount(data.data);
                    loginWithUser(data.data);
                }
            } catch (error) {
                console.error("Failed to load account", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccount();
        hasFetched.current = true; // mark as fetched
    }, [user]);
    const handleForgotPassword = async (email: string) => {
        try {
            const res = await fetch("/api/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            alert(data.message);
            console.log("Forgot password response:", data);
        } catch (error) {
            console.error("Error sending forgot password request:", error);
        }
    };




    const initials =
        (account?.firstname?.[0]?.toUpperCase() ?? "") +
        (account?.lastname?.[0]?.toUpperCase() ?? "");



    return (
        <ProtectedRoute>
            <div className="max-w-5xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">My Account</h1>

                {loading && <p>Loading account...</p>}

                {!loading && account && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="border rounded-xl p-6 bg-background flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mb-4">
                                {initials || "U"}
                            </div>

                            <h2 className="text-lg font-semibold">
                                {account.firstname} {account.lastname}
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                {account.email}
                            </p>

                            <p className="text-xs text-muted-foreground mt-2">
                                Member since{" "}
                                {new Date(account.created_at).toLocaleDateString()}
                            </p>


                            <div className="flex gap-4">
                                <Link href={`/edit-profile?id=${account?.id}`}>
                                    <button className="mt-4 px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition">
                                        Edit Profile
                                    </button>
                                </Link>
                                <button onClick={() => {
                                    handleForgotPassword(account.email);

                                }} className="mt-4 px-4 py-2 text-sm rounded-md bg-destructive text-primary-foreground hover:opacity-40 transition">
                                    Reset Password
                                </button>
                            </div>




                        </div>

                        {/* Account Details */}
                        <div className="md:col-span-2 border rounded-xl p-6 bg-background">
                            <h3 className="font-semibold mb-4">Account Information</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-muted-foreground">First Name</p>
                                    <p className="font-medium">{account.firstname || "-"}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">Last Name</p>
                                    <p className="font-medium">{account.lastname || "-"}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">Email</p>
                                    <p className="font-medium">{account.email}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">Phone</p>
                                    <p className="font-medium">
                                        {account.phonenumber || "Not provided"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">User ID</p>
                                    <p className="font-medium">#{account.id}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">Account Created</p>
                                    <p className="font-medium">
                                        {new Date(account.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}