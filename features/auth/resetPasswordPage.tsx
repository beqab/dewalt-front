"use client";

import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EnvelopIcon from "@/components/icons/envelopIcon";
import { toast } from "sonner";
import AuthPageWrapper from "./components/authPageWraper";
import { useRequestPasswordReset } from "./hooks";

export default function ResetPasswordPage() {
  const t = useTranslations();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("auth.validation.emailInvalid"))
      .required(t("auth.validation.emailRequired")),
  });

  const initialValues = {
    email: "",
  };

  const requestPasswordResetMutation = useRequestPasswordReset();

  const handleSubmit = async (values: typeof initialValues) => {
    requestPasswordResetMutation.mutate({
      email: values.email,
    });
  };

  return (
    <AuthPageWrapper title={t("auth.resetPassword.title")}>
      <p className="text-text-secondary mb-8 text-sm">
        {t("auth.resetPassword.instructions")}
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            {/* Email Field */}
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

            {/* Submit Button */}
            <Button
              type="submit"
              variant="default"
              size="default"
              className="w-full"
              disabled={requestPasswordResetMutation.isPending}
            >
              {t("auth.resetPassword.submit")}
            </Button>

            {/* Back to Login Link */}
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
    </AuthPageWrapper>
  );
}
