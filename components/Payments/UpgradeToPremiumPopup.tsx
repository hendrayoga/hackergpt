import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/router';
import { IconX, IconCircleCheck } from '@tabler/icons-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  checkoutUrl: string | null;
}

const UpgradeToPremiumPopup: React.FC<Props> = ({ isOpen, onClose, checkoutUrl }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const upgradeToPremium = () => {
    if (checkoutUrl) {
      router.push(checkoutUrl);
    }
  };

  return (
    <>
      {isOpen ? createPortal (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 inset-negative-5">
         <div className="fixed inset-0 z-10 overflow-hidden">
           <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
             <div className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"></div>
             <div
                ref={modalRef}
                className="inline-block transform overflow-y-auto rounded-lg border border-gray-300 bg-[#202123] px-4 pt-5 pb-4 text-left align-bottom shadow-xl sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 sm:align-middle"
                role="dialog"
              >
                <div 
                  className="absolute top-2 right-2 cursor-pointer rounded-full w-10 h-10 flex items-center justify-center"
                  onClick={onClose}
                >
                  <IconX color={'gray'} size={22} strokeWidth={2} />
                </div>
                <div className="text-white flex justify-between items-center">
                  <div className="text-md pb-4 font-bold">
                    Your Plan
                  </div>
                </div>
                
                {/* Container for both plans */}
                <div className="text-white flex flex-col sm:flex-row">
                  {/* User Plan */}
                  <div className="bg-[#202123] flex-1 rounded-lg mb-4 sm:mb-0">
                      <h3 className="text-lg font-bold mb-2">Free plan</h3>
                      <button className="w-full mb-4 bg-[#8e8ea0] text-[#202123] rounded px-4 py-2"
                      disabled>
                        Your current plan
                      </button>
                      <div className="flex items-center mb-2">
                        <div className="icon-container mr-2">
                          <IconCircleCheck color={'#8e8ea0'} size={22} strokeWidth={2} />
                        </div>
                        <div className="text-container flex-1">
                          <p className="whitespace-nowrap overflow-hidden truncate">Access to our HackerGPT model</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="icon-container mr-2">
                          <IconCircleCheck color={'#8e8ea0'} size={22} strokeWidth={2} />
                        </div>
                        <div className="text-container">
                          <p>Regular model updates</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="icon-container mr-2">
                          <IconCircleCheck color={'#8e8ea0'} size={22} strokeWidth={2} />
                        </div>
                        <div className="text-container">
                          <p>Standard response speed</p>
                        </div>
                      </div>
                    </div>
  
                  {/* Vertical Divider for larger screens */}
                  <div className="hidden sm:block bg-gray-300 w-px my-2 mx-4"></div>
  
                  {/* Premium Plan */}
                  <div className="bg-[#202123] flex-1 rounded-lg mb-4 sm:mb-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold mb-2">HackerGPT Plus</h3>
                    <div className="text-lg text-[#8e8ea0] mb-2">USD $29/mo</div>
                  </div>
                  <button onClick={upgradeToPremium} className="w-full mb-4 bg-green-600 text-white font-bold rounded px-4 py-2 hover:bg-green-700 transition duration-200">
                        Upgrade to Plus
                      </button>
                      <div className="flex items-center mb-2">
                        <div className="icon-container mr-2">
                          <IconCircleCheck color={'#43A047'} size={22} strokeWidth={2} />
                        </div>
                        <div className="text-container flex-1">
                          <p className="whitespace-nowrap overflow-hidden truncate">Unlimited access to our HackerGPT model</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="icon-container mr-2">
                          <IconCircleCheck color={'#43A047'} size={22} strokeWidth={2} />
                        </div>
                        <div className="text-container">
                          <p>Access to GPT-4 Turbo model</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="icon-container mr-2">
                          <IconCircleCheck color={'#43A047'} size={22} strokeWidth={2} />
                        </div>
                        <div className="text-container">
                          <p>Access to Web Browsing plugin</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="icon-container mr-2">
                          <IconCircleCheck color={'#43A047'} size={22} strokeWidth={2} />
                        </div>
                        <div className="text-container">
                          <p>Faster response speed</p>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.getElementById('__next') as HTMLElement
      ) : null}
    </>
  );  
 };


export default UpgradeToPremiumPopup;