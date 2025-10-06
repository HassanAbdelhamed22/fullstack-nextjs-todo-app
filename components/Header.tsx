"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { CheckSquare } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/70 border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl">
            <CheckSquare className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            <span className="text-primary">Todo</span> List
          </h1>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <ModeToggle />

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 border border-border shadow-sm",
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button
                variant="default"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
