"use client";

import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import EnvelopIcon from "@/components/icons/envelopIcon";
import KeyIcon from "@/components/icons/keyIcon";
import EyeIcon from "@/components/icons/eyeIcon";
import EyeOffIcon from "@/components/icons/eyeOffIcon";
import { toast } from "sonner";
import AuthPageWrapper from "./components/authPageWraper";

export default function LoginPage() {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("auth.validation.emailInvalid"))
      .required(t("auth.validation.emailRequired")),
    password: Yup.string()
      .min(6, t("auth.validation.passwordMin"))
      .required(t("auth.validation.passwordRequired")),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (!agreeToTerms) {
      toast.error(t("auth.validation.termsRequired"));
      return;
    }

    try {
      // TODO: Implement actual login API call
      console.log("Login attempt:", values);
      toast.success("Login successful!");
      // Redirect to home or dashboard
    } catch (error: unknown) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <AuthPageWrapper title={t("auth.login.title")}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="text-dark-secondary-100 mb-2 block text-sm font-medium"
              >
                {t("auth.login.email")}
              </label>
              <Field name="email">
                {({ field }: FieldProps<string>) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder={t("auth.login.email")}
                    icon={<EnvelopIcon />}
                    error={!!(errors.email && touched.email)}
                  />
                )}
              </Field>
              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-xs text-red-500"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="text-dark-secondary-100 mb-2 block text-sm font-medium"
              >
                {t("auth.login.password")}
              </label>
              <Field name="password">
                {({ field }: FieldProps<string>) => (
                  <Input
                    {...field}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
                    icon={<KeyIcon />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-text-secondary hover:text-dark-secondary-100"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    }
                    error={!!(errors.password && touched.password)}
                  />
                )}
              </Field>
              <ErrorMessage
                name="password"
                component="div"
                className="mt-1 text-xs text-red-500"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="default"
              size="default"
              className="w-full"
              disabled={isSubmitting}
            >
              {t("auth.login.submit")}
            </Button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <Link
                href="/reset-password"
                className="text-text-secondary hover:text-primary text-sm transition-colors"
              >
                {t("auth.login.forgotPassword")}
              </Link>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <span className="text-text-secondary text-sm">
                {t("auth.login.noAccount")}{" "}
              </span>
              <Link
                href="/register"
                className="text-primary text-sm font-medium hover:underline"
              >
                {t("auth.login.register")}
              </Link>
            </div>

            {/* Terms Checkbox */}
            <div className="bg-background p-4 pt-4">
              <Checkbox
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                label={
                  <Link
                    href="/terms"
                    className="text-text-secondary text-xs hover:underline"
                  >
                    {t("auth.login.agreeTerms")}
                  </Link>
                }
                labelClassName="text-text-secondary text-xs pl-2"
                className="gap-2"
              />
            </div>
          </Form>
        )}
      </Formik>
    </AuthPageWrapper>
  );
}
