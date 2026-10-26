"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Calculate discount based on loyalty
export async function calculateDiscountedFare(customerId, originalFare) {
  const pastBookingsCount = await db.booking.count({
    where: {
      customerId,
      status: "COMPLETED"
    }
  });

  // Example logic: 5% discount for > 2 rides, 10% for > 5 rides
  let discountPercentage = 0;
  if (pastBookingsCount > 5) discountPercentage = 0.10;
  else if (pastBookingsCount > 2) discountPercentage = 0.05;

  const discountAmount = originalFare * discountPercentage;
  return {
    discountPercentage,
    finalFare: originalFare - discountAmount
  };
}

export async function createBooking(routeId) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      throw new Error("Unauthorized");
    }

    // Check for active bookings
    const activeBooking = await db.booking.findFirst({
      where: {
        customerId: session.user.id,
        status: {
          in: ["PENDING", "CONFIRMED"]
        }
      }
    });

    if (activeBooking) {
      throw new Error("You already have an active booking. Please complete or pay for your current ride first.");
    }

    const route = await db.route.findUnique({
      where: { id: routeId }
    });

    if (!route) {
      throw new Error("Route not found");
    }

    // Calculate final fare using discount system
    const { finalFare } = await calculateDiscountedFare(session.user.id, route.fare);

    // Automatically assign available driver
    const driver = await db.driver.findFirst({
      where: { availability: true }
    });

    const booking = await db.booking.create({
      data: {
        customerId: session.user.id,
        routeId: route.id,
        driverId: driver?.id,
        finalFare,
        status: driver ? "CONFIRMED" : "PENDING"
      }
    });

    if (driver) {
      await db.driver.update({
        where: { id: driver.id },
        data: { availability: false }
      });
    }

    revalidatePath("/dashboard/history");
    return { success: true, booking };
  } catch (error) {
    console.error("Booking error:", error);
    return { success: false, error: error.message };
  }
}

export async function payBooking(bookingId) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      throw new Error("Unauthorized");
    }

    const booking = await db.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) throw new Error("Booking not found");
    if (booking.customerId !== session.user.id) throw new Error("Not authorized for this booking");
    if (booking.status !== "CONFIRMED") throw new Error("Booking is not ready for payment");

    // Update booking status
    await db.booking.update({
      where: { id: bookingId },
      data: { status: "COMPLETED" }
    });

    // Free up driver
    if (booking.driverId) {
      await db.driver.update({
        where: { id: booking.driverId },
        data: { availability: true }
      });
    }

    revalidatePath("/dashboard/history");
    return { success: true };
  } catch (error) {
    console.error("Payment error:", error);
    return { success: false, error: error.message };
  }
}
