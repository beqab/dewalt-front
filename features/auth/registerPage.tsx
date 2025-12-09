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

export default function RegisterPage() {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("auth.validation.emailInvalid"))
      .required(t("auth.validation.emailRequired")),
    password: Yup.string()
      .min(6, t("auth.validation.passwordMin"))
      .required(t("auth.validation.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("auth.validation.passwordsMatch"))
      .required(t("auth.validation.confirmPasswordRequired")),
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (!agreeToTerms) {
      toast.error(t("auth.validation.termsRequired"));
      return;
    }

    try {
      // TODO: Implement actual registration API call
      console.log("Registration attempt:", values);
      toast.success("Registration successful!");
      // Redirect to login or dashboard
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <AuthPageWrapper title={t("auth.register.title")}>
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
                    {t("auth.register.email")}
                  </label>
                  <Field name="email">
                    {({ field }: FieldProps<string>) => (
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder={t("auth.register.email")}
                        icon={<EnvelopIcon />}
                        error={!!(errors.email && touched.email)}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mt-1 text-xs"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="text-dark-secondary-100 mb-2 block text-sm font-medium"
                  >
                    {t("auth.register.password")}
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
                    className="text-red-500 mt-1 text-xs"
                  />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="text-dark-secondary-100 mb-2 block text-sm font-medium"
                  >
                    {t("auth.register.confirmPassword")}
                  </label>
                  <Field name="confirmPassword">
                    {({ field }: FieldProps<string>) => (
                      <Input
                        {...field}
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="**********"
                        icon={<KeyIcon />}
                        rightIcon={
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="text-text-secondary hover:text-dark-secondary-100"
                          >
                            {showConfirmPassword ? (
                              <EyeOffIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </button>
                        }
                        error={
                          !!(
                            errors.confirmPassword && touched.confirmPassword
                          )
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 mt-1 text-xs"
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
                  {t("auth.register.submit")}
                </Button>

                {/* Login Link */}
                <div className="text-center">
                  <span className="text-text-secondary text-sm">
                    {t("auth.register.hasAccount")}{" "}
                  </span>
                  <Link
                    href="/login"
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    {t("auth.register.login")}
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
                        {t("auth.register.agreeTerms")}
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

