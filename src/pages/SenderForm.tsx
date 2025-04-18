import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Calendar, Clock, Volume2, Phone, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import PhoneVerification from '@/components/PhoneVerification';

const SenderForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    senderName: '',
    recipientName: '',
    recipientPhone: '',
    message: '',
    audioFile: null as File | null,
    deliveryOption: 'now', // 'now', '24hours', 'custom'
    deliveryDate: '',
  });
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [senderPhoneVerified, setSenderPhoneVerified] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, audioFile: e.target.files![0] }));
    }
  };
  
  const handleNext = () => {
    if (step === 1) {
      if (!formData.senderName || !formData.recipientName || !formData.recipientPhone) {
        toast.error('Please fill all required fields before continuing');
        return;
      }
    }
    if (step === 3) {
      if (formData.deliveryOption === 'custom' && !formData.deliveryDate) {
        toast.error('Please select a delivery date');
        return;
      }
      setStep(4); // Move to phone verification
    } else {
      setStep(prev => prev + 1);
    }
  };
  
  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 4) {
      handleNext();
      return;
    }
    
    // Last step - verify and submit
    if (!verificationSent) {
      sendVerificationCode();
    } else {
      verifyAndSubmit();
    }
  };
  
  const sendVerificationCode = () => {
    setIsSubmitting(true);
    
    // Simulate sending OTP
    setTimeout(() => {
      setIsSubmitting(false);
      setVerificationSent(true);
      toast.success('Verification code sent to your phone');
    }, 1500);
  };
  
  const verifyAndSubmit = () => {
    if (verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate verification and submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Your message has been scheduled for delivery');
      navigate('/preview', { state: { preview: true, formData } });
    }, 1500);
  };

  const handlePhoneVerificationComplete = (phoneNumber: string) => {
    setSenderPhoneVerified(true);
    setVerifiedPhone(phoneNumber);
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2 text-center">Send a one-time message</h1>
        <p className="text-softGrey text-center mb-8">All fields marked with * are required</p>
        
        <div className="card">
          <div className="flex justify-between mb-8">
            <div className={`flex-1 text-center ${step >= 1 ? 'text-buttonPrimary' : 'text-softGrey'}`}>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 1 ? 'bg-buttonPrimary text-white' : 'bg-softGrey/20 text-softGrey'}`}>1</div>
              <p className="mt-1 text-sm">Details</p>
            </div>
            <div className={`flex-1 text-center ${step >= 2 ? 'text-buttonPrimary' : 'text-softGrey'}`}>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 2 ? 'bg-buttonPrimary text-white' : 'bg-softGrey/20 text-softGrey'}`}>2</div>
              <p className="mt-1 text-sm">Message</p>
            </div>
            <div className={`flex-1 text-center ${step >= 3 ? 'text-buttonPrimary' : 'text-softGrey'}`}>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 3 ? 'bg-buttonPrimary text-white' : 'bg-softGrey/20 text-softGrey'}`}>3</div>
              <p className="mt-1 text-sm">Delivery</p>
            </div>
            <div className={`flex-1 text-center ${step >= 4 ? 'text-buttonPrimary' : 'text-softGrey'}`}>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 4 ? 'bg-buttonPrimary text-white' : 'bg-softGrey/20 text-softGrey'}`}>4</div>
              <p className="mt-1 text-sm">Verify</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                {!senderPhoneVerified ? (
                  <div className="mb-6">
                    <h3 className="font-medium mb-4">Verify your phone number *</h3>
                    <PhoneVerification onVerificationComplete={handlePhoneVerificationComplete} />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block mb-2 font-medium">Your verified phone number</label>
                      <input
                        type="text"
                        value={verifiedPhone}
                        className="input-field"
                        disabled
                      />
                    </div>
                    <div>
                      <label htmlFor="senderName" className="block mb-2 font-medium">Your name *</label>
                      <input
                        type="text"
                        id="senderName"
                        name="senderName"
                        placeholder="Your name..."
                        value={formData.senderName}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="recipientName" className="block mb-2 font-medium">Recipient's name *</label>
                      <input
                        type="text"
                        id="recipientName"
                        name="recipientName"
                        placeholder="Their name..."
                        value={formData.recipientName}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="recipientPhone" className="block mb-2 font-medium">Recipient's WhatsApp number *</label>
                      <input
                        type="tel"
                        id="recipientPhone"
                        name="recipientPhone"
                        placeholder="+1234567890"
                        value={formData.recipientPhone}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                      <p className="text-xs text-softGrey mt-1">Must include country code (e.g., +1 for USA)</p>
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        type="button" 
                        onClick={handleNext}
                        className="btn-primary w-full"
                      >
                        Continue
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">Your message *</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Say what you need to say..."
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field min-h-[200px]"
                    required
                  />
                  <p className="text-xs text-softGrey mt-1">This is a one-time message, so take your time to say what matters.</p>
                </div>
                
                <div>
                  <label htmlFor="audioFile" className="block mb-2 font-medium">Add audio or song (optional)</label>
                  <div className="flex items-center gap-4">
                    <label htmlFor="audioFile" className="flex items-center gap-2 btn-secondary cursor-pointer">
                      <Volume2 className="w-5 h-5" />
                      <span>Upload audio</span>
                    </label>
                    <input
                      type="file"
                      id="audioFile"
                      name="audioFile"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {formData.audioFile && (
                      <span className="text-sm text-buttonPrimary truncate">
                        {formData.audioFile.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-softGrey mt-1">MP3, WAV or M4A. Max 5MB.</p>
                </div>
                
                <div className="flex justify-between pt-4">
                  <button 
                    type="button" 
                    onClick={handleBack}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button 
                    type="button" 
                    onClick={handleNext}
                    className="btn-primary"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium">When should we deliver this message? *</label>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-dustyRose rounded-2xl cursor-pointer transition-all hover:bg-dustyRose/10">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="now"
                        checked={formData.deliveryOption === 'now'}
                        onChange={handleChange}
                        className="w-4 h-4 accent-buttonPrimary"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-buttonPrimary" />
                          <span className="font-medium">Send immediately</span>
                        </div>
                        <p className="text-sm text-softGrey ml-7">The message will be sent right away</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 p-3 border border-dustyRose rounded-2xl cursor-pointer transition-all hover:bg-dustyRose/10">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="24hours"
                        checked={formData.deliveryOption === '24hours'}
                        onChange={handleChange}
                        className="w-4 h-4 accent-buttonPrimary"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-buttonPrimary" />
                          <span className="font-medium">Send in 24 hours</span>
                        </div>
                        <p className="text-sm text-softGrey ml-7">Gives you time to reflect before sending</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 p-3 border border-dustyRose rounded-2xl cursor-pointer transition-all hover:bg-dustyRose/10">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="custom"
                        checked={formData.deliveryOption === 'custom'}
                        onChange={handleChange}
                        className="w-4 h-4 accent-buttonPrimary"
                      />
                      <div className="w-full">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-buttonPrimary" />
                          <span className="font-medium">Choose specific date & time</span>
                        </div>
                        {formData.deliveryOption === 'custom' && (
                          <input
                            type="datetime-local"
                            name="deliveryDate"
                            value={formData.deliveryDate}
                            onChange={handleChange}
                            className="mt-2 input-field"
                            min={new Date().toISOString().slice(0, 16)}
                            required={formData.deliveryOption === 'custom'}
                          />
                        )}
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="border-t border-dustyRose pt-6 mt-6">
                  <h3 className="font-medium mb-4">Limits and guidelines:</h3>
                  <ul className="text-sm text-softGrey space-y-2 mb-6">
                    <li>• You can send one message per recipient every 90 days</li>
                    <li>• You can send one message total each month</li>
                    <li>• Messages expire after 24 hours from first viewing</li>
                    <li>• Recipients can choose not to view your message</li>
                    <li>• Be respectful and kind, even in difficult moments</li>
                  </ul>
                </div>
                
                <div className="flex justify-between pt-4">
                  <button 
                    type="button" 
                    onClick={handleBack}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="btn-primary flex items-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                </div>
              </div>
            )}
            
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <Phone className="w-12 h-12 text-buttonPrimary mx-auto mb-2" />
                  <h2 className="text-xl font-medium">Verify your identity</h2>
                  <p className="text-softGrey">Before sending, please verify your phone number</p>
                </div>
                
                {!verificationSent ? (
                  <div>
                    <label htmlFor="senderPhone" className="block mb-2 font-medium">Your phone number *</label>
                    <Input
                      type="tel"
                      id="senderPhone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 (234) 567-8901"
                      className="input-field"
                      required
                    />
                    <p className="text-xs text-softGrey mt-1">Include your country code (e.g., +1 for USA)</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <label className="block mb-2 font-medium">Enter the 6-digit code sent to your phone</label>
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
                    <p className="text-xs text-softGrey mb-4 text-center">
                      Didn't receive a code? <button type="button" onClick={() => setVerificationSent(false)} className="text-buttonPrimary hover:underline">Try again</button>
                    </p>
                  </div>
                )}
                
                <div className="border-t border-dustyRose pt-6 mt-6">
                  <h3 className="font-medium mb-4">Message Summary:</h3>
                  <ul className="text-sm space-y-2 mb-6">
                    <li><span className="text-softGrey">To:</span> {formData.recipientName} ({formData.recipientPhone})</li>
                    <li><span className="text-softGrey">From:</span> {formData.senderName}</li>
                    <li><span className="text-softGrey">Delivery:</span> {formData.deliveryOption === 'now' ? 'Immediately' : 
                      formData.deliveryOption === '24hours' ? 'In 24 hours' : 
                      new Date(formData.deliveryDate).toLocaleString()}</li>
                    <li><span className="text-softGrey">Includes audio:</span> {formData.audioFile ? 'Yes' : 'No'}</li>
                  </ul>
                </div>
                
                <div className="flex justify-between pt-4">
                  <button 
                    type="button" 
                    onClick={handleBack}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="btn-primary flex items-center gap-2"
                    disabled={isSubmitting || (verificationSent && verificationCode.length !== 6)}
                  >
                    {isSubmitting ? 'Processing...' : verificationSent ? 'Verify & Send' : 'Send verification code'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        
        <div className="mt-8 flex justify-center items-center text-softGrey text-sm">
          <Globe className="w-4 h-4 mr-2" />
          <span>Available worldwide for sending one-time messages</span>
        </div>
      </div>
    </Layout>
  );
};

export default SenderForm;
