import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-lg font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-marca text-white hover:bg-marca-oscuro",
        // Único color de acento: solo para comprar.
        compra: "bg-acento text-white hover:bg-acento-oscuro",
        contorno: "border-2 border-white/70 text-white hover:bg-white/10",
      },
      size: { default: "min-h-12 px-7", lg: "min-h-14 px-8 w-full" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
