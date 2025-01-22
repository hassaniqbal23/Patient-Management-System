"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

const PassKeyModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePasskey = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear any previous errors

    try {
      if (!passkey) {
        setError("Please enter the passkey");
        return;
      }

      if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push("/admin");
      } else {
        setError("Invalid passkey. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const handlePasskeyChange = (value: string) => {
    setError(""); // Clear error when user types
    setPasskey(value);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between text-white">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={closeModal}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            To access the admin page, please enter the passkey
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={handlePasskeyChange}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="text-red-500 text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={validatePasskey}
            className="shad-primary-btn w-full"
            disabled={isLoading}
          >
            {isLoading ? "Validating..." : "Enter Admin Passkey"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;