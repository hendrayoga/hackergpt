import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from "@/utils/server/firebase-client-init";
import { initFirebaseApp } from "@/utils/server/firebase-client-init";
import { getCheckoutUrl } from "@/components/Payments/stripePayments";
import { getPremiumStatus } from "@/components/Payments/getPremiumStatus"
import UpgradeToPremiumPopup from '@/components/Payments/UpgradeToPremiumPopup';
import { useRouter } from "next/navigation";

type ModuleBenefits = {
  title: string;
  description: string;
  feature?: string; 
  extra?: string;
  buttonText?: string;
  beta?: boolean; 
};

export function RenderModuleBenefits(props: { moduleName: string | null }) {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isUpgradePopupOpen, setIsUpgradePopupOpen] = useState(false);

  const app = initFirebaseApp();
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const fetchCheckoutUrl = async () => {
      if (auth.currentUser) {
        try {
          const url = await getCheckoutUrl(app);
          setCheckoutUrl(url);
        } catch (error) {
          console.error('Error fetching Stripe checkout URL:', error);
        }
      }
    };
    fetchCheckoutUrl();
  }, [auth.currentUser?.uid]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as firebase.User | null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser?.uid) {
        try {
          const url = await getCheckoutUrl(app);
          setCheckoutUrl(url);
  
          const newPremiumStatus = await getPremiumStatus(app);
          setIsPremium(newPremiumStatus);
          
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [auth.currentUser?.uid]);

  let benefits: ModuleBenefits = {
    title: "",
    description: ""
  };
  
  switch (props.moduleName) {
    case "HackerGPT":
      benefits = {
        title: "AI + Hacker Wisdom: Unbeatable Combo",
        feature: "Constantly updated with fresh hacker knowledge",
        description: "Available to Free and Plus users",
        extra: "Unlimited to Plus users",
        beta: true
      };
      break;
    case "GPT-4":
      benefits = {
        title: "Hacker's Dream AI",
        feature: "Ready for complex challenges",
        description: "Available exclusively to Plus users",
        extra: "Includes Exclusive Web Browsing plugin",
        buttonText: "Upgrade to Plus",
      };
      break;
    default:
      benefits = {
        title: "Unknown Module",
        description: "This module is not recognized."
      };
      break;
  }

  const handleUpgradePopupOpen = () => {
    setIsUpgradePopupOpen(true);
  };

  const handleUpgradePopupClose = () => {
    setIsUpgradePopupOpen(false);
  };

  return (
    <div className="group/options flex flex-col rounded-xl border border-gray-100 bg-white text-left shadow-xxs dark:text-gray-100 dark:bg-[#202123] dark:border-gray-800 dark:shadow-xs mx-2 sm:mx-1 overflow-hidden">
      <div className="px-5 flex gap-2.5 flex-col py-4 whitespace-pre-line text-sm sm:text-base">
        <span className="block dark:text-white text-gray-900">{benefits.title}</span>
        {benefits.feature && <span className="block text-xs text-gray-500">{benefits.feature}</span>}
        <span className="block text-xs text-gray-500">{benefits.description}</span>
        {benefits.extra && ( 
          <span className="block text-xs text-gray-500">{benefits.extra}</span>
        )}
      </div>
      {(benefits.buttonText && !isPremium && user) || (benefits.beta) ? (
        <div role="group" className="max-h-[calc(100vh-300px)] overflow-auto text-sm mb-1 border-t border-gray-200 dark:border-[#343541]">
          {benefits.buttonText && (
            <div className="px-5 py-3">
              <button 
                className="bg-green-600 text-white font-bold rounded px-4 py-2 hover:bg-green-700 transition duration-200"
                onClick={handleUpgradePopupOpen}
              >
                {benefits.buttonText}
              </button>
            </div>
          )}
          {benefits.beta && (
            <div className="px-5 py-3">
              <span className="py-0.25 rounded px-1 text-sm font-bold capitalize bg-blue-200 text-blue-500">
                beta
              </span>
            </div>
          )}
        </div>
      ) : null}
      <div className="z-50">
        <UpgradeToPremiumPopup 
          isOpen={isUpgradePopupOpen} 
          onClose={handleUpgradePopupClose}
          checkoutUrl={checkoutUrl} 
        />
      </div>
    </div>
  );
}
