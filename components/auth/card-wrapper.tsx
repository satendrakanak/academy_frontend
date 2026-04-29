"use client";

import { Card, CardContent } from "@/components/ui/card";
import AuthHeader from "./auth-header";
import SocialLogin from "./social-login";
import { BackButton } from "./back-button";
import Image from "next/image";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import FormImage from "./form-image";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  imageUrl?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const CardWrapper = ({ children, ...props }: CardWrapperProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <AuthHeader label={props.headerLabel} />
            {children}
            <FieldGroup className="mt-4">
              {props.showSocial && <SocialLogin />}
              <BackButton
                label={props.backButtonLabel}
                href={props.backButtonHref}
              />
            </FieldGroup>
          </div>
          {props.imageUrl && props.alt && props.width && props.height && (
            <FormImage
              imageUrl={props.imageUrl}
              alt={props.alt}
              width={props.width}
              height={props.height}
            />
          )}
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
};
