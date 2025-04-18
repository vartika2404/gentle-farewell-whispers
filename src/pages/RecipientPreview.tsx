
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { PlayCircle, Clock, Download, Heart, Globe, Phone, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface FormData {
  senderName: string;
  recipientName: string;
  recipientPhone: string;
  message: string;
  audioFile: File | null;
  deliveryOption: string;
  deliveryDate: string;
}

interface LocationState {
  preview?: boolean;
  formData?: FormData;
}

const RecipientPreview = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [messageState, setMessageState] = useState<'unopened' | 'opened' | 'declined' | 'authenticate' | 'confirmed'>('unopened');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use either the form data passed from the sender form, or default preview data
  const senderName = state?.formData?.senderName || 'Alex';
  const recipientName = state?.formData?.recipientName || 'Jordan';
  const message = state?.formData?.message || 
    "Jordan, I've been reflecting on our time together and felt I needed to express my gratitude for the good moments we shared. While things didn't work out between us, I learned so much about myself through our relationship. I hope you're finding peace and happiness on your journey. This isn't asking for a response - just wanted to share these thoughts one last time. Take care.";
  
  const handleOpenMessage = () => {
    setMessageState('authenticate');
  };
  
  const handleDeclineMessage = () => {
    setMessageState('declined');
  };
  
  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending verification code
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Verification code sent to your phone');
      // In a real app, this would trigger an API call to send an OTP
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsSubmitting(false);
      setMessageState('opened');
      toast.success('Phone verified successfully');
    }, 1500);
  };

  const handleConfirmSend = () => {
    setIsSubmitting(true);
    
    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setMessageState('confirmed');
      toast.success('Your message has been sent');
    }, 2000);
  };
  
  const expiryTime = new Date();
  expiryTime.setHours(expiryTime.getHours() + 24);
  
  return (
    <Layout>
      <div className="max-w-xl mx-auto py-8 animate-fade-in">
        {state?.preview && (
          <div className="bg-buttonPrimary/10 border border-buttonPrimary rounded-2xl p-4 mb-8 text-center">
            <p className="text-charcoal">This is a preview of how your recipient will see your message</p>
            <Link to="/send" className="text-buttonPrimary font-medium hover:underline">
              ← Return to message form
            </Link>
          </div>
        )}
        
        <div className="card">
          {messageState === 'unopened' && (
            <div className="text-center">
              <Heart className="w-16 h-16 text-buttonPrimary mx-auto mb-6 animate-bounce-soft" />
              
              <h1 className="text-2xl font-bold mb-4">
                You've received a one-time message from {senderName}
              </h1>
              
              <p className="text-softGrey mb-8 leading-relaxed">
                This is a thoughtful message that may carry emotional weight.
                You can choose to read it now, later, or not at all.
              </p>
              
              <div className="space-y-3 max-w-sm mx-auto">
                <button 
                  onClick={handleOpenMessage} 
                  className="btn-primary w-full"
                >
                  Yes, I'd like to read it
                </button>
                
                <button 
                  onClick={handleDeclineMessage}
                  className="btn-secondary w-full"
                >
                  No, not right now
                </button>
              </div>
              
              <p className="text-xs text-softGrey mt-6">
                This message will be available for 7 days. After you open it, it will expire in 24 hours.
              </p>
            </div>
          )}

          {messageState === 'authenticate' && (
            <div className="text-center">
              <Phone className="w-16 h-16 text-buttonPrimary mx-auto mb-6" />
              
              <h1 className="text-2xl font-bold mb-4">
                Verify your phone number
              </h1>
              
              <p className="text-softGrey mb-8 leading-relaxed">
                For your privacy and security, we need to verify your phone number 
                before showing you the message from {senderName}.
              </p>
              
              {verificationCode === '' ? (
                <form onSubmit={handlePhoneSubmit} className="space-y-4 max-w-sm mx-auto">
                  <div className="text-left">
                    <label htmlFor="phoneNumber" className="block mb-2 font-medium">Your phone number</label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 (234) 567-8901"
                      className="input-field"
                      required
                    />
                    <p className="text-xs text-softGrey mt-1">Include your country code (e.g., +1 for USA)</p>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-buttonPrimary hover:bg-buttonHover"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send verification code'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyCode} className="space-y-4 max-w-sm mx-auto">
                  <div className="text-center">
                    <label htmlFor="verificationCode" className="block mb-2 font-medium">Enter the 6-digit code sent to your phone</label>
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
                    <p className="text-xs text-softGrey mb-4">
                      Didn't receive a code? <button type="button" className="text-buttonPrimary hover:underline">Resend</button>
                    </p>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-buttonPrimary hover:bg-buttonHover"
                    disabled={isSubmitting || verificationCode.length !== 6}
                  >
                    {isSubmitting ? 'Verifying...' : 'Verify and continue'}
                  </Button>
                </form>
              )}
              
              <button 
                type="button"
                onClick={() => setMessageState('unopened')}
                className="mt-6 text-sm text-softGrey hover:text-buttonPrimary"
              >
                ← Go back
              </button>
            </div>
          )}
          
          {messageState === 'opened' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Message from {senderName}</h2>
                <div className="flex items-center gap-1 text-softGrey text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Expires in 24h</span>
                </div>
              </div>
              
              <div className="bg-sand/50 p-6 rounded-2xl border border-dustyRose mb-6">
                <p className="whitespace-pre-line leading-relaxed">{message}</p>
              </div>
              
              {state?.formData?.audioFile && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Audio message:</h3>
                  <div className="flex items-center gap-4 p-4 bg-sand/50 rounded-2xl border border-dustyRose">
                    <button 
                      onClick={toggleAudio}
                      className="text-buttonPrimary hover:text-buttonHover"
                    >
                      <PlayCircle className="w-10 h-10" />
                    </button>
                    <div className="flex-grow">
                      <div className="h-3 bg-dustyRose/30 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-buttonPrimary rounded-full transition-all duration-300 ${
                            audioPlaying ? 'w-3/4 animate-pulse' : 'w-0'
                          }`}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-softGrey mt-1">
                        <span>{audioPlaying ? '0:45' : '0:00'}</span>
                        <span>1:30</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <button className="btn-primary flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  <span>Download message</span>
                </button>
              </div>
              
              <p className="text-xs text-center text-softGrey mt-6">
                This message will expire on {expiryTime.toLocaleString()} and cannot be accessed after that time.
              </p>

              {!state?.preview && (
                <div className="mt-8 pt-8 border-t border-dustyRose">
                  <button 
                    onClick={handleConfirmSend}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send message to recipient'}
                  </button>
                  <p className="text-xs text-center text-softGrey mt-2">
                    The message will be sent to the phone number you provided
                  </p>
                </div>
              )}
            </div>
          )}
          
          {messageState === 'declined' && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">Message not viewed</h2>
              
              <p className="text-softGrey mb-8 leading-relaxed">
                You chose not to open the message from {senderName} right now.
                That's okay. Closure looks different for everyone.
              </p>
              
              <p className="text-softGrey mb-6">
                The message will remain available for 7 days if you change your mind.
              </p>
              
              <button 
                onClick={() => setMessageState('unopened')}
                className="btn-primary"
              >
                Return to message
              </button>
            </div>
          )}

          {messageState === 'confirmed' && (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              
              <h2 className="text-2xl font-bold mb-6">Message sent successfully</h2>
              
              <p className="text-softGrey mb-8 leading-relaxed">
                Your message has been successfully sent to {recipientName}.
                They will receive it on their phone via WhatsApp.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-8">
                <p className="text-green-800">
                  Thank you for using Closure to communicate respectfully.
                </p>
              </div>
              
              <Link to="/" className="btn-primary">
                Return to home
              </Link>

              <p className="text-xs text-center text-softGrey mt-6">
                Remember, you can send one message per month, and one message every 90 days to the same recipient.
              </p>
            </div>
          )}
        </div>

        {messageState !== 'confirmed' && (
          <div className="mt-8 flex justify-center items-center text-softGrey text-sm">
            <Globe className="w-4 h-4 mr-2" />
            <span>Available worldwide for sending one-time messages</span>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecipientPreview;
