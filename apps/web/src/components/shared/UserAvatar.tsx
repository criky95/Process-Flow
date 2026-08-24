import React from 'react';

interface UserAvatarProps {
  name: string;
  role?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ name, role, size = 'md' }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  }[size];

  return (
    <div className="inline-flex items-center gap-2">
      <div
        className={`${sizeClasses} rounded-full bg-indigo-900/60 border border-indigo-500/30 text-indigo-200 font-semibold flex items-center justify-center flex-shrink-0 shadow-inner`}
      >
        {initials}
      </div>
      {role && (
        <div className="flex flex-col text-left leading-tight">
          <span className="text-xs font-medium text-slate-200">{name}</span>
          <span className="text-[10px] text-slate-400">{role}</span>
        </div>
      )}
    </div>
  );
};
