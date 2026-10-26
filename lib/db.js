import dbConnect from "./mongodb";
import { User, Driver, Route, Booking } from "./models";

// Helper to convert Mongoose document to a plain object with 'id' instead of '_id'
function toPlainObject(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  
  // Handle root id
  if (obj._id) {
    obj.id = obj._id.toString();
  }

  // Handle foreign keys and common fields
  if (obj.customerId && typeof obj.customerId === 'object' && obj.customerId._id) {
    obj.customer = { ...obj.customerId, id: obj.customerId._id.toString() };
    obj.customerId = obj.customerId._id.toString();
  } else if (obj.customerId) {
    obj.customerId = obj.customerId.toString();
  }

  if (obj.driverId && typeof obj.driverId === 'object' && obj.driverId._id) {
    obj.driver = { ...obj.driverId, id: obj.driverId._id.toString() };
    obj.driverId = obj.driverId._id.toString();
  } else if (obj.driverId) {
    obj.driverId = obj.driverId.toString();
  }

  if (obj.routeId && typeof obj.routeId === 'object' && obj.routeId._id) {
    obj.route = { ...obj.routeId, id: obj.routeId._id.toString() };
    obj.routeId = obj.routeId._id.toString();
  } else if (obj.routeId) {
    obj.routeId = obj.routeId.toString();
  }

  return obj;
}

export const db = {
  user: {
    findMany: async (args = {}) => {
      await dbConnect();
      const query = args.where || {};
      const users = await User.find(query).lean();
      
      const results = [];
      for (const u of users) {
        const bookingCount = await Booking.countDocuments({ customerId: u._id });
        results.push({
          ...u,
          id: u._id.toString(),
          _count: { bookings: bookingCount }
        });
      }
      return results;
    },
    findUnique: async (args) => {
      await dbConnect();
      const query = args.where || {};
      let user;
      if (query.id) user = await User.findById(query.id);
      else user = await User.findOne(query);
      return toPlainObject(user);
    },
    create: async (args) => {
      await dbConnect();
      const user = await User.create(args.data);
      return toPlainObject(user);
    },
    count: async (args = {}) => {
      await dbConnect();
      return User.countDocuments(args.where || {});
    }
  },
  driver: {
    findMany: async (args = {}) => {
      await dbConnect();
      const drivers = await Driver.find(args.where || {}).lean();
      return drivers.map(d => ({ ...d, id: d._id.toString() }));
    },
    findFirst: async (args = {}) => {
      await dbConnect();
      const driver = await Driver.findOne(args.where || {});
      return toPlainObject(driver);
    },
    update: async (args) => {
      await dbConnect();
      const driver = await Driver.findByIdAndUpdate(args.where.id, args.data, { new: true });
      return toPlainObject(driver);
    },
    count: async () => {
      await dbConnect();
      return Driver.countDocuments();
    },
    create: async (args) => {
      await dbConnect();
      const driver = await Driver.create(args.data);
      return toPlainObject(driver);
    }
  },
  route: {
    findMany: async () => {
      await dbConnect();
      const routes = await Route.find({}).lean();
      return routes.map(r => ({ ...r, id: r._id.toString() }));
    },
    findUnique: async (args) => {
      await dbConnect();
      const route = await Route.findById(args.where.id);
      return toPlainObject(route);
    },
    count: async () => {
      await dbConnect();
      return Route.countDocuments();
    },
    create: async (args) => {
      await dbConnect();
      const route = await Route.create(args.data);
      return toPlainObject(route);
    }
  },
  booking: {
    findMany: async (args = {}) => {
      await dbConnect();
      const bookings = await Booking.find(args.where || {})
        .populate("customerId")
        .populate("driverId")
        .populate("routeId")
        .lean();
      
      return bookings.map(b => toPlainObject(b));
    },
    findFirst: async (args = {}) => {
      await dbConnect();
      const query = { ...args.where };
      if (query.status?.in) {
        query.status = { $in: query.status.in };
      }
      const booking = await Booking.findOne(query);
      return toPlainObject(booking);
    },
    findUnique: async (args) => {
      await dbConnect();
      const booking = await Booking.findById(args.where.id)
        .populate("customerId")
        .populate("driverId")
        .populate("routeId")
        .lean();
      
      return toPlainObject(booking);
    },
    update: async (args) => {
      await dbConnect();
      const booking = await Booking.findByIdAndUpdate(args.where.id, args.data, { new: true });
      return toPlainObject(booking);
    },
    count: async (args = {}) => {
      await dbConnect();
      const query = { ...args.where };
      if (query.status?.in) {
        query.status = { $in: query.status.in };
      }
      return Booking.countDocuments(query);
    },
    create: async (args) => {
      await dbConnect();
      const booking = await Booking.create(args.data);
      return toPlainObject(booking);
    }
  }
};
