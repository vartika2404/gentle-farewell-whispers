
import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const countryCodes = [
  { code: '+1', country: 'United States & Canada' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+61', country: 'Australia' },
  { code: '+33', country: 'France' },
  { code: '+49', country: 'Germany' },
  { code: '+81', country: 'Japan' },
  { code: '+86', country: 'China' },
  { code: '+91', country: 'India' },
  { code: '+52', country: 'Mexico' },
  { code: '+55', country: 'Brazil' },
  { code: '+34', country: 'Spain' },
  { code: '+39', country: 'Italy' },
  { code: '+7', country: 'Russia' },
  { code: '+82', country: 'South Korea' },
  { code: '+31', country: 'Netherlands' },
  // Add more country codes as needed
];

interface PhoneVerificationProps {
  onVerificationComplete: (phoneNumber: string) => void;
}

const PhoneVerification = ({ onVerificationComplete }: PhoneVerificationProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendVerification = async () => {
    if (!phoneNumber) {
      toast.error('Please enter your phone number');
      return;
    }

    setIsSubmitting(true);
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    try {
      // Here you would integrate with Firebase Phone Auth
      // For now, we'll simulate the verification process
      setTimeout(() => {
        setVerificationSent(true);
        toast.success('Verification code sent to your phone');
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      toast.error('Error sending verification code');
      console.error('Error:', error);
      setIsSubmitting(false);
    }
  };

  const verifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Please enter a valid verification code');
      return;
    }

    setIsSubmitting(true);
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    try {
      // Here you would verify the code with Firebase Phone Auth
      // For now, we'll simulate the verification process
      setTimeout(() => {
        onVerificationComplete(fullPhoneNumber);
        toast.success('Phone number verified successfully');
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      toast.error('Invalid verification code');
      console.error('Error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {!verificationSent ? (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Country Code
            </label>
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country code" />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.code} - {country.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number (without country code)
            </label>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter phone number"
              className="w-full"
            />
          </div>

          <Button
            onClick={handleSendVerification}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Sending...' : 'Send Verification Code'}
          </Button>
        </>
      ) : (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Enter the 6-digit code sent to {countryCode + phoneNumber}
          </label>
          <div className="flex justify-center mb-4">
            <InputOTP
              maxLength={6}
              value={verificationCode}
              onChange={(value) => setVerificationCode(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="space-y-2">
            <Button
              onClick={verifyCode}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Verifying...' : 'Verify Code'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setVerificationSent(false)}
              className="w-full"
            >
              Change Phone Number
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneVerification;
