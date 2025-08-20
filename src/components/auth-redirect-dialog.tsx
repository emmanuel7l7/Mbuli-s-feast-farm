
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthRedirectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AuthRedirectDialog({ open, onOpenChange }: AuthRedirectDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create an Account or Login</AlertDialogTitle>
          <AlertDialogDescription>
            You need to be logged in to add items to your cart. Please create an account or sign in to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Button asChild className="w-full">
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
