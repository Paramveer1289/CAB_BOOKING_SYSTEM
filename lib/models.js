import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["CUSTOMER", "ADMIN"], default: "CUSTOMER" },
  createdAt: { type: Date, default: Date.now }
});

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  license: { type: String, required: true },
  phone: { type: String, required: true },
  availability: { type: Boolean, default: true }
});

const RouteSchema = new mongoose.Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  fare: { type: Number, required: true },
  estimatedTime: { type: Number, required: true }
});

const BookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
  finalFare: { type: Number, required: true },
  status: { type: String, enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"], default: "PENDING" },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Driver = mongoose.models.Driver || mongoose.model("Driver", DriverSchema);
export const Route = mongoose.models.Route || mongoose.model("Route", RouteSchema);
export const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
