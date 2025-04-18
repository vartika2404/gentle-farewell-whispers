
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Heart, MessageCircle, Clock, Shield } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-charcoal">
            One-time messages for meaningful closure
          </h1>
          <p className="text-xl md:text-2xl text-softGrey mb-10 leading-relaxed">
            A private, respectful space to express your final thoughts when a relationship ends
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link to="/send" className="btn-primary">
              Create a message
            </Link>
            <Link to="/preview" className="btn-secondary">
              Preview recipient view
            </Link>
          </div>
          
          <div className="w-full max-w-3xl mx-auto h-64 md:h-96 bg-dustyRose/10 rounded-2xl border border-dustyRose mb-16 flex items-center justify-center">
            <p className="text-buttonPrimary text-lg md:text-xl italic">"Sometimes words need to be said, even if just once."</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white rounded-2xl border border-dustyRose">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card flex flex-col items-center text-center">
              <Heart className="w-12 h-12 text-buttonPrimary mb-4" />
              <h3 className="text-xl font-medium mb-2">Respectful Communication</h3>
              <p className="text-softGrey">Send one thoughtful message to someone from your past, with no pressure to reply.</p>
            </div>
            
            <div className="card flex flex-col items-center text-center">
              <MessageCircle className="w-12 h-12 text-buttonPrimary mb-4" />
              <h3 className="text-xl font-medium mb-2">One-time delivery</h3>
              <p className="text-softGrey">Messages are delivered once via WhatsApp and cannot be sent repeatedly.</p>
            </div>
            
            <div className="card flex flex-col items-center text-center">
              <Clock className="w-12 h-12 text-buttonPrimary mb-4" />
              <h3 className="text-xl font-medium mb-2">Expires in 24 hours</h3>
              <p className="text-softGrey">Recipients can view the message once before it expires permanently.</p>
            </div>
            
            <div className="card flex flex-col items-center text-center">
              <Shield className="w-12 h-12 text-buttonPrimary mb-4" />
              <h3 className="text-xl font-medium mb-2">Respectful boundaries</h3>
              <p className="text-softGrey">Recipients can choose whether they're ready to read your message.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Closure exists</h2>
          <p className="text-lg text-softGrey mb-8 leading-relaxed">
            We created Closure because ending relationships is hard. Sometimes there are words left unsaid 
            that need to be expressed, but ongoing contact isn't healthy. Closure provides a respectful, 
            one-time channel for that final communication.
          </p>
          <Link to="/send" className="btn-primary">
            Send your message
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
