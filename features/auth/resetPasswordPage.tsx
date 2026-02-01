"use client";

import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EnvelopIcon from "@/components/icons/envelopIcon";
import KeyIcon from "@/components/icons/keyIcon";
import AuthPageWrapper from "./components/authPageWraper";
import { useRequestPasswordReset, useResetPassword } from "./hooks";

export default function ResetPasswordPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const isResetFlow = Boolean(token);

  const requestValidationSchema = Yup.object({
    email: Yup.string()
      .email(t("auth.validation.emailInvalid"))
      .required(t("auth.validation.emailRequired")),
  });

  const resetValidationSchema = Yup.object({
    password: Yup.string()
      .min(6, t("auth.validation.passwordMin"))
      .required(t("auth.validation.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("auth.validation.passwordsMatch"))
      .required(t("auth.validation.confirmPasswordRequired")),
  });

  const requestPasswordResetMutation = useRequestPasswordReset();
  const resetPasswordMutation = useResetPassword();

  return (
    <AuthPageWrapper
      title={
        isResetFlow
          ? t("auth.resetPassword.setTitle")
          : t("auth.resetPassword.title")
      }
    >
      <p className="text-text-secondary mb-8 text-sm">
        {isResetFlow
          ? t("auth.resetPassword.setInstructions")
          : t("auth.resetPassword.instructions")}
      </p>

      {isResetFlow ? (
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={resetValidationSchema}
          onSubmit={(values) => {
            resetPasswordMutation.mutate({
              token,
              password: values.password,
            });
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="text-dark-secondary-100 mb-2 block text-sm font-medium"
                >
                  {t("auth.resetPassword.newPassword")}
                </label>
                <Field name="password">
                  {({ field }: FieldProps<string>) => (
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder={t("auth.resetPassword.newPassword")}
                      icon={<KeyIcon />}
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-dark-secondary-100 mb-2 block text-sm font-medium"
                >
                  {t("auth.resetPassword.confirmPassword")}
                </label>
                <Field name="confirmPassword">
                  {({ field }: FieldProps<string>) => (
                    <Input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      placeholder={t("auth.resetPassword.confirmPassword")}
                      icon={<KeyIcon />}
                      error={!!(errors.confirmPassword && touched.confirmPassword)}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <Button
                type="submit"
                variant="default"
                size="default"
                className="w-full"
                disabled={resetPasswordMutation.isPending}
              >
                {t("auth.resetPassword.submitNewPassword")}
              </Button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-text-secondary hover:text-primary text-sm transition-colors"
                >
                  {t("auth.resetPassword.backToLogin")}
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ email: "" }}
          validationSchema={requestValidationSchema}
          onSubmit={(values) => {
            requestPasswordResetMutation.mutate({ email: values.email });
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="text-dark-secondary-100 mb-2 block text-sm font-medium"
                >
                  {t("auth.resetPassword.email")}
                </label>
                <Field name="email">
                  {({ field }: FieldProps<string>) => (
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder={t("auth.resetPassword.email")}
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

              <Button
                type="submit"
                variant="default"
                size="default"
                className="w-full"
                disabled={requestPasswordResetMutation.isPending}
              >
                {t("auth.resetPassword.submit")}
              </Button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-text-secondary hover:text-primary text-sm transition-colors"
                >
                  {t("auth.resetPassword.backToLogin")}
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </AuthPageWrapper>
  );
}
