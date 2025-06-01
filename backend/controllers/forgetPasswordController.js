

import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTP } from "../config/nodemailer.js";
import mongoose from "mongoose";
import crypto from "crypto"


export const forgotPassword = async (req, res) => {
       try {
              const { email } = req.body;
              if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                     return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
              }

              const user = await User.findOne({ email });
              if (!user) {
                     return res.status(404).json({ success: false, message: 'Email not registered' });
              }

              // Generate 6-digit OTP
              const otp = crypto.randomInt(100000, 999999).toString();
              const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

              // Save OTP to user
              user.otp = otp;
              user.otpExpires = otpExpires;
              await user.save();
              // OTP Email Content
              const otpEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(to right, #4f46e5, #7c3aed); padding: 20px; text-align: center;">
         <div className="flex items-center space-x-2  rounded-lg shadow-"> 
                     <img src="https://i.postimg.cc/3J0QKbRh/IMG-20250524-020910.png" alt="" className='w-[40px]  text-2xl rounded-lg ' style=" width:70px; padding: 5px; text-align: center;" />
                     <h1>
                       Dream
                       <span style="colour:yellow">
                         Pay
                       </span>
                     </h1>
         
                   </div>
         
        </div>
        <!-- Body -->
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px; text-align: center;">Your OTP for KYC Verification</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            Hello ${user.name || 'Valued Customer'},<br/><br/>
            You have requested an OTP to complete your KYC verification. Please use the following OTP to proceed:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; background-color: #4f46e5; color: #ffffff; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 6px; letter-spacing: 2px;">
              ${otp}
            </span>
          </div>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            This OTP is valid for <strong>10 minutes</strong>. If you did not request this, please contact our support team immediately.
          </p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          
          </div>
        </div>
        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 15px; text-align: center;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Need help? Contact us at <a href="mailto:support@example.com" style="color: #4f46e5; text-decoration: none;">support@example.com</a></p>
          <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    `;

              await sendOTP({ email, subject: "Your OTP for forgot Password", html: otpEmailContent });


              res.status(200).json({ success: true, message: 'OTP sent to your email' });
       } catch (error) {
              res.status(500).json({ success: false, message: 'Server error. Please try again later' });
       }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
       try {
              const { email, otp } = req.body;
              if (!email || !otp) {
                     return res.status(400).json({ success: false, message: 'Email and OTP are required' });
              }

              const user = await User.findOne({ email });
              if (!user) {
                     return res.status(404).json({ success: false, message: 'Email not registered' });
              }

              if (user.otp !== otp || user.otpExpires < Date.now()) {
                     return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
              }

         
              user.otp = undefined;
              user.otpExpires = undefined;
              await user.save();

              res.status(200).json({ success: true, message: 'OTP verified' });
       } catch (error) {
              res.status(500).json({ success: false, message: 'Server error. Please try again later' });
       }
};

// Reset Password
export const resetPassword = async (req, res) => {
       try {
              const { email, newPassword } = req.body;
              if (!email  || !newPassword) {
                     return res.status(400).json({ success: false, message: 'Email and new password are required' });
              }

              if (newPassword.length < 8) {
                     return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
              }

              const user = await User.findOne({ email });
              if (!user) {
                     return res.status(404).json({ success: false, message: 'Email not registered' });
              }

              // Hash new password
              const salt = await bcrypt.genSalt(12);
              const hashedPassword = await bcrypt.hash(newPassword, salt);

              // Update password, clear reset token
              user.password = hashedPassword;
              await user.save();

              res.status(200).json({ success: true, message: 'Password reset successful' });
       } catch (error) {
              res.status(500).json({ success: false, message: 'Server error. Please try again later' });
       }
};