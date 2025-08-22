import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    paymentMethod: {
      type: String,
      enum: ["manual", "gateway"],
      required: [true, "Payment method is required"],
    },
    status: {
      type: String,
      enum: [
        "success",
        "pending",
        "cancelled",
        "failure",
        "pending-verification",
      ],
      required: [true, "Status is required"],
      index: true,
    },
    verificationSource: {
      type: String,
      enum: ["webhook", "handler", "manual","cron", "null"],
      default: "null",
    },
    manualObject: {
      type: Schema.Types.Mixed,
      validate: {
        validator: function (value) {
          // Only required if paymentMethod is "manual"
          if (this.paymentMethod === "manual") {
            return value != null;
          }
          return true;
        },
        message: "Manual payment details are required when payment method is manual.",
      },
    },
    razorpayObject: {
      type: Schema.Types.Mixed,
      validate: {
        validator: function (value) {
          // Only required if paymentMethod is "gateway"
          if (this.paymentMethod === "gateway") {
            return value != null; // Check if razorpayObject is provided
          }
          return true; // If paymentMethod is not "gateway", don't require razorpayObject
        },
        message:
          "Razorpay order object is required when payment method is gateway.",
      },
    },
    razorpayResponseObject: {
      type: Schema.Types.Mixed,
      validate: {
        validator: function (value) {
          // Validation when status is "success"
          if (this.status === "success" && this.paymentMethod === "gateway") {
            return value != null; // Check if razorpayResponseObject is provided
          }
          return true; // No validation required for other statuses
        },
        message:
          "Razorpay response object is required when status is 'success'.",
      },
    },
    manualResponseObject: {
      type: Schema.Types.Mixed,
      validate: {
        validator: function (value) {
          if (this.status === "success" && this.paymentMethod === "manual") {
            return value != null;
          }
          return true;
        },
      },
      message: "Manual response object is required when status is 'success'.",
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);

Payment.on("error", function (error) {
  console.error("Payment Model Error:", error);
});
