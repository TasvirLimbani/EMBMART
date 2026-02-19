// import { NextRequest, NextResponse } from "next/server";

// // Example DB insert function (replace with real DB logic)
// async function insertOrder(data: {
//   user_id: number;
//   product_id: number;
//   product_name: string;
//   product_category: string;
//   product_image: string;
//   quantity: number;
// }) {
//   // TODO: replace with MySQL / Prisma / Mongo insert
//   console.log("Order received:", data);

//   return {
//     order_id: Date.now(), // mock order id
//   };
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const {
//       user_id,
//       product_id,
//       product_name,
//       product_category,
//       product_image,
//       quantity,
//     } = body;

//     // ✅ Validation
//     if (
//       !user_id ||
//       !product_id ||
//       !product_name ||
//       !product_category ||
//       !quantity
//     ) {
//       return NextResponse.json(
//         {
//           status: "error",
//           message: "Missing required fields",
//         },
//         { status: 400 }
//       );
//     }

//     // ✅ Save order
//     const result = await insertOrder({
//       user_id,
//       product_id,
//       product_name,
//       product_category,
//       product_image: product_image || "",
//       quantity,
//     });

//     return NextResponse.json(
//       {
//         status: "success",
//         message: "Order added successfully",
//         data: result,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Order API error:", error);

//     return NextResponse.json(
//       {
//         status: "error",
//         message: "Internal server error",
//       },
//       { status: 500 }
//     );
//   }
// }







import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Read body sent from frontend
    const body = await req.json();

    // Forward request to PHP API
    const response = await fetch(
      "http://embmart.soon.it/product/addorder.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: body.user_id,
          product_id: body.product_id,
          product_name: body.product_name,
          product_category: body.product_category,
          product_image: body.product_image,
          quantity: body.quantity,
        }),
      }
    );

    const data = await response.json();

    // Return PHP API response to frontend
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Order proxy error:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Order API failed",
      },
      { status: 500 }
    );
  }
}
