"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import { SafeImage } from "@/components/imagehandel";
import Link from "next/link";
import DownloadButton from "@/components/downloadbutton";

interface Download {
  download_id: number;
  user_id: number;
  product_id: number;
  name: string;
  category: string;
  product_image: string;
  design_file: string;
  formats: string;
  price: string;
  download_date: string;
}

export default function MyDownloadsPage() {
  const { user } = useAuth();
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDownloads = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/downloads?user_id=${user.id}`);
        const data = await res.json();

        if (data.status === "success") {
          setDownloads(data.downloads);
        } else {
          setDownloads([]);
        }
      } catch (error) {
        console.error("Failed to fetch downloads", error);
        setDownloads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Downloads</h1>

        {loading && <p>Loading downloads...</p>}

        {!loading && downloads.length === 0 && (
          <p className="text-muted-foreground">No downloads found.</p>
        )}

        {/* GRID VIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {downloads.map((item) => (
            <div
              key={item.download_id} // ✅ single, unique key
              className="group relative overflow-hidden rounded-xl bg-card shadow-sm transition hover:shadow-lg"
            >
              <div className="border rounded-lg bg-background overflow-hidden transition">

                {/* ✅ CLICKABLE PRODUCT AREA */}
                <Link href={`/designs/${item.product_id}`} className="block">
                  {/* Image */}
                  <div className="relative w-full h-48 bg-muted">
                    <SafeImage
                      src={item.product_image || "/images/images.png"}
                      alt={item.name}
                      className="object-contain object-center"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-1">
                    <h2 className="font-semibold text-sm line-clamp-2">
                      {item.name}
                    </h2>

                    <p className="text-xs text-muted-foreground">
                      Category: {item.category}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Downloaded on{" "}
                      {new Date(item.download_date).toLocaleDateString()}
                    </p>

                    <div className="pt-2 text-xs text-muted-foreground">
                      Download #{item.download_id}
                    </div>
                  </div>
                </Link>

                {/* ✅ DOWNLOAD BUTTON (NOT INSIDE LINK) */}
                <div className="px-4 pb-4">
                  <DownloadButton
                    downloadDate={item.download_date}
                    fileUrl={item.design_file}
                    fileName={`${item.name}.${item.design_file.split(".").pop() || "EMB"}`}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </ProtectedRoute>
  );
}
