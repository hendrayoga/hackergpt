import { IconPlus } from '@tabler/icons-react';
import { FC } from 'react';

import { Conversation } from '@/types/chat';

interface Props {
  selectedConversation: Conversation;
  onNewConversation: () => void;
}

export const Navbar: FC<Props> = ({
  selectedConversation,
  onNewConversation,
}) => {
  return (
    <nav className="flex items-center justify-between w-full bg-[#202123] py-3 px-4">
      <div className="mr-4"></div>

      <div className="flex-1 text-center text-base font-normal truncate">
        {selectedConversation.name}
      </div>

      <div>
        <IconPlus
          className="cursor-pointer hover:text-neutral-400"
          onClick={onNewConversation}
        />
      </div>
    </nav>
  );
};
