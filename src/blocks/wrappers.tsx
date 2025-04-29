import * as React from 'react';
import { cn } from '../lib/utils';

const Main = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    className={cn(
        "w-full min-h-screen inline-flex flex-col items-center justify-start bg-Branding-backgroundPrimary px-4",    
        className
    )}
    {...props}
  />
))
Main.displayName = "Main"

const LoginMain = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    className={cn(
        "w-full min-h-screen bg-Branding-backgroundPrimary relative",    
        className
    )}
    {...props}
  />
))
LoginMain.displayName = "LoginMain"

const Wrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
        "w-full max-w-[60rem] inline-flex flex-col items-center justify-start gap-6 py-4",    
        className
    )}
    {...props}
  />
))
Wrapper.displayName = "Wrapper"

const LoginWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
        "w-[25rem] sm:w-full sm:max-w-[27.5rem] bg-Branding-cardPrimary border border-blue-200 rounded-2xl absolute left-1/2 transform -translate-x-1/2 top-[8.125rem] flex flex-col items-start justify-start gap-3 p-[1.375rem]",    
        className
    )}
    {...props}
  />
))
LoginWrapper.displayName = "LoginWrapper"

export { Main, LoginMain, Wrapper, LoginWrapper }