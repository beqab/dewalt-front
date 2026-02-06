"use client";

import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EnvelopIcon from "@/components/icons/envelopIcon";
import KeyIcon from "@/components/icons/keyIcon";
import EyeOpenIcon from "@/components/icons/eyeOpenIcon";
import EyeClosedIcon from "@/components/icons/eyeClosedIcon";
import AuthPageWrapper from "./components/authPageWraper";
import { useLogin } from "./hooks/useLogin";

export default function LoginPage() {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, isLoading, clearError } = useLogin();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("auth.validation.emailInvalid"))
      .required(t("auth.validation.emailRequired")),
    password: Yup.string().required(t("auth.validation.passwordRequired")),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    login(values);
  };

  return (
    <AuthPageWrapper title={t("auth.login.title")}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6" noValidate>
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
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
                    onChange={(event) => {
                      clearError();
                      field.onChange(event);
                    }}
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
                        aria-label={
                          showPassword
                            ? t("auth.common.hidePassword")
                            : t("auth.common.showPassword")
                        }
                        aria-pressed={showPassword}
                      >
                        {!showPassword ? (
                          <EyeClosedIcon className="h-5 w-5" />
                        ) : (
                          <EyeOpenIcon className="h-5 w-5" />
                        )}
                      </button>
                    }
                    error={!!(errors.password && touched.password)}
                    onChange={(event) => {
                      clearError();
                      field.onChange(event);
                    }}
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
              disabled={isLoading}
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
          </Form>
        )}
      </Formik>
    </AuthPageWrapper>
  );
}
