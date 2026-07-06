"use client";

import React, { useState } from "react";
import { ShoppingBag, CreditCard, CheckCircle, ArrowRight, Loader2, RotateCcw, Star, Heart, Tag, ShieldCheck } from "lucide-react";

type FlowStep = "product" | "checkout" | "processing" | "success";

export default function ShopEaseSimulator() {
  const [step, setStep] = useState<FlowStep>("product");
  const [cartCount, setCartCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleAddToCart = () => {
    setCartCount(1);
  };

  const handleStartCheckout = () => {
    if (cartCount > 0) {
      setStep("checkout");
    }
  };

  const handleSimulatePayment = () => {
    setStep("processing");
    // Simulate API query and Webhook processing
    setTimeout(() => {
      setStep("success");
    }, 1800);
  };

  const handleReset = () => {
    setCartCount(0);
    setStep("product");
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF9F5] text-ink p-4 font-sans select-none justify-between border-t border-ink/5">
      {/* Header inside phone screen */}
      <div className="flex items-center justify-between border-b border-ink/10 pb-2">
        <div className="flex items-center space-x-1.5">
          <ShoppingBag className="w-4 h-4 text-emerald" />
          <span className="font-display font-bold text-xs tracking-wide">ShopEase</span>
        </div>
        <div className="relative">
          <div className="absolute -top-1.5 -right-1.5 bg-ochre text-ink text-[8px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center border border-ink">
            {cartCount}
          </div>
          <ShoppingBag className="w-4 h-4 text-ink" />
        </div>
      </div>

      {/* Dynamic step rendering */}
      <div className="flex-1 my-2 flex flex-col justify-center">
        {step === "product" && (
          <div className="space-y-3 animate-fadeIn">
            <div className="relative bg-white border border-ink/10 rounded-xl overflow-hidden p-3 shadow-xl shadow-ink/5 group">
              
              {/* Product Visual Container with Real Image */}
              <div className="w-full h-32 bg-neutral-100 rounded-lg border border-ink/5 overflow-hidden mb-2.5 relative">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" 
                  alt="HyperSound Pro Wireless Headphones" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Discount Tag */}
                <div className="absolute top-2 left-2 bg-ochre text-ink text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
                  <Tag className="w-2.5 h-2.5" />
                  <span>20% OFF</span>
                </div>

                {/* Wishlist Heart Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <Heart className={`w-3.5 h-3.5 ${liked ? "fill-red-500 text-red-500" : "text-ink/60"}`} />
                </button>

                {/* Price Pill */}
                <div className="absolute bottom-2 right-2 bg-ink text-paper text-[10px] px-2 py-0.5 font-bold rounded-full shadow-md flex items-center gap-1">
                  <span className="line-through text-[8px] text-paper/60">$349</span>
                  <span className="text-emerald">$279</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-emerald uppercase tracking-wider">Audio Flagship</span>
                  <div className="flex items-center gap-0.5 text-[9px] font-bold text-ink">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>4.9</span>
                    <span className="text-ink/40 font-normal">(1.2k)</span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-xs text-ink leading-tight">
                  HyperSound Pro Wireless
                </h3>
                
                <p className="text-[9px] text-ink/60 leading-relaxed">
                  Active noise-cancelling studio headphones with 40hr battery life & seamless Bluetooth 5.3 pairing.
                </p>
              </div>

              {/* Free Shipping Badge */}
              <div className="mt-2 pt-2 border-t border-ink/5 flex items-center gap-1 text-[8px] text-ink/60 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald" />
                <span>In Stock · Free Express Delivery</span>
              </div>
            </div>

            {cartCount === 0 ? (
              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 bg-emerald text-white text-[10px] font-sans border border-emerald/50 shadow-lg shadow-emerald/20 font-bold rounded-xl hover:bg-emerald/90 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD TO CART · $279.00</span>
              </button>
            ) : (
              <button
                onClick={handleStartCheckout}
                className="w-full py-2.5 bg-ochre text-ink text-[10px] font-sans border border-ink shadow-lg shadow-ochre/20 font-bold rounded-xl flex items-center justify-center space-x-1 animate-pulse active:scale-95"
              >
                <span>PROCEED TO STRIPE PAY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {step === "checkout" && (
          <div className="bg-white border border-ink/15 p-3 rounded-xl shadow-lg shadow-ink/5 space-y-3">
            <div className="flex items-center space-x-1 border-b border-ink/5 pb-1.5">
              <CreditCard className="w-3.5 h-3.5 text-emerald" />
              <span className="font-display font-semibold text-[10px]">Stripe Checkout</span>
            </div>
            
            <div className="space-y-2">
              <div>
                <label className="text-[7px] font-sans text-ink/50 uppercase">Email Address</label>
                <div className="border border-ink/20 px-2 py-1 text-[9px] font-sans bg-paper/20 rounded">
                  customer@domain.com
                </div>
              </div>
              <div>
                <label className="text-[7px] font-sans text-ink/50 uppercase">Card Number</label>
                <div className="border border-ink/20 px-2 py-1 text-[9px] font-sans bg-paper/20 rounded flex items-center justify-between">
                  <span>•••• •••• •••• 4242</span>
                  <span className="text-[7px] font-bold text-ink/40">VISA</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSimulatePayment}
              className="w-full py-2 bg-ink text-paper text-[10px] font-sans font-bold rounded-lg border border-ink shadow-lg shadow-ink/5 flex items-center justify-center space-x-1"
            >
              <span>AUTHORIZE $49.00</span>
            </button>
          </div>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center justify-center space-y-2 text-center py-6">
            <Loader2 className="w-8 h-8 text-emerald animate-spin" />
            <span className="text-[10px] font-sans text-ink/70">Connecting to stripe.com...</span>
            <span className="text-[8px] font-sans text-ink/40">Executing webhook listener...</span>
          </div>
        )}

        {step === "success" && (
          <div className="space-y-3">
            <div className="bg-emerald/10 border border-emerald/30 p-3 rounded-xl flex flex-col items-center text-center space-y-2">
              <CheckCircle className="w-8 h-8 text-emerald animate-bounce" />
              <span className="font-display font-bold text-[11px] text-emerald tracking-wide">WEBHOOK VERIFIED</span>
              <p className="text-[9px] text-ink/80 leading-normal">Stripe payment session complete. Order processed instantly.</p>
            </div>

            <div className="bg-ink text-paper p-2.5 rounded-lg border border-emerald/50 space-y-1">
              <div className="flex justify-between text-[8px] font-sans text-paper/60">
                <span>DATABASE STATUS</span>
                <span className="text-emerald">INDEXED</span>
              </div>
              <div className="flex justify-between text-[8px] font-sans text-paper/60">
                <span>API RUNTIME</span>
                <span className="text-ochre font-bold">245ms</span>
              </div>
              <div className="flex justify-between text-[8px] font-sans text-paper/60">
                <span>WEBHOOK EVENT</span>
                <span className="text-paper">payment_intent.succeeded</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-1.5 bg-paper text-ink text-[9px] font-sans border border-ink/20 rounded flex items-center justify-center space-x-1 hover:bg-emerald/10 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>TEST AGAIN</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer statistics bar inside phone screen */}
      <div className="border-t border-ink/5 pt-2 flex justify-between items-center text-[7.5px] font-sans text-ink/50">
        <span>Cart: {cartCount} items</span>
        <span>Stripe SDK v19.2</span>
      </div>
    </div>
  );
}
