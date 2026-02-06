"use client";

import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import KeyIcon from "@/components/icons/keyIcon";
import EyeOpenIcon from "@/components/icons/eyeOpenIcon";
import EyeClosedIcon from "@/components/icons/eyeClosedIcon";
import { useChangePassword } from "@/features/auth/hooks";
import Loading from "@/components/ui/loading";

import ProfileSidebar from "@/components/profileSidebar";
import MobileProfileMenu from "@/components/profileSidebar/mobileProfileMenu";

export default function ProfilePage() {
  const t = useTranslations();
  const { data: session, status } = useSession();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const changePasswordMutation = useChangePassword();

  // Show loading state while session is being fetched
  if (status === "loading") {
    return <Loading message={t("profile.loading")} minHeight="screen" />;
  }

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required(
      t("auth.validation.passwordRequired")
    ),
    newPassword: Yup.string()
      .min(6, t("auth.validation.passwordMin"))
      .required(t("auth.validation.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], t("auth.validation.passwordsMatch"))
      .required(t("auth.validation.confirmPasswordRequired")),
  });

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    changePasswordMutation.mutate(
      {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          // Reset form after successful password change
          resetForm();
          setShowCurrentPassword(false);
          setShowNewPassword(false);
          setShowConfirmPassword(false);
        },
      }
    );
  };

  return (
    <div className="min-h-screen py-10">
      <div className="customContainer">
        <div className="mt-10 flex gap-6 md:mt-0">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block">
            <ProfileSidebar />
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            <div className="md:px-0">
              {/* Mobile Profile Menu */}
              <MobileProfileMenu />

              {/* Profile Information Section - Read Only */}
              <div className="mb-8 rounded-lg border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-primary mb-6 text-xl font-semibold">
                  {t("profile.profileChanges")}
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t("profile.name")}
                      </label>
                      <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900">
                        {session?.user?.name || "-"}
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t("profile.email")}
                      </label>
                      <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900">
                        {session?.user?.email || "-"}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {t("profile.surname")}
                      </label>
                      <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900">
                        {session?.user?.surname || "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Change Section */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-primary mb-6 text-xl font-semibold">
                  {t("profile.passwordChanges")}
                </h2>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form className="space-y-6">
                      {/* Current Password Field */}
                      <div>
                        <label
                          htmlFor="currentPassword"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          {t("profile.currentPassword")}
                        </label>
                        <Field name="currentPassword">
                          {({ field }: FieldProps<string>) => (
                            <Input
                              {...field}
                              id="currentPassword"
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder="**********"
                              icon={<KeyIcon />}
                              rightIcon={
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowCurrentPassword(!showCurrentPassword)
                                  }
                                  className="text-text-secondary hover:text-dark-secondary-100"
                                  aria-label={
                                    showCurrentPassword
                                      ? t("auth.common.hidePassword")
                                      : t("auth.common.showPassword")
                                  }
                                  aria-pressed={showCurrentPassword}
                                >
                                  {!showCurrentPassword ? (
                                    <EyeClosedIcon className="h-5 w-5" />
                                  ) : (
                                    <EyeOpenIcon className="h-5 w-5" />
                                  )}
                                </button>
                              }
                              error={
                                !!(
                                  errors.currentPassword &&
                                  touched.currentPassword
                                )
                              }
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="currentPassword"
                          component="div"
                          className="mt-1 text-xs text-red-500"
                        />
                      </div>

                      {/* New Password Field */}
                      <div>
                        <label
                          htmlFor="newPassword"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          {t("profile.newPassword")}
                        </label>
                        <Field name="newPassword">
                          {({ field }: FieldProps<string>) => (
                            <Input
                              {...field}
                              id="newPassword"
                              type={showNewPassword ? "text" : "password"}
                              placeholder="**********"
                              icon={<KeyIcon />}
                              rightIcon={
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                  }
                                  className="text-text-secondary hover:text-dark-secondary-100"
                                  aria-label={
                                    showNewPassword
                                      ? t("auth.common.hidePassword")
                                      : t("auth.common.showPassword")
                                  }
                                  aria-pressed={showNewPassword}
                                >
                                  {!showNewPassword ? (
                                    <EyeClosedIcon className="h-5 w-5" />
                                  ) : (
                                    <EyeOpenIcon className="h-5 w-5" />
                                  )}
                                </button>
                              }
                              error={
                                !!(errors.newPassword && touched.newPassword)
                              }
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="newPassword"
                          component="div"
                          className="mt-1 text-xs text-red-500"
                        />
                      </div>

                      {/* Confirm Password Field */}
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          {t("profile.confirmPassword")}
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
                                  aria-label={
                                    showConfirmPassword
                                      ? t("auth.common.hidePassword")
                                      : t("auth.common.showPassword")
                                  }
                                  aria-pressed={showConfirmPassword}
                                >
                                  {!showConfirmPassword ? (
                                    <EyeClosedIcon className="h-5 w-5" />
                                  ) : (
                                    <EyeOpenIcon className="h-5 w-5" />
                                  )}
                                </button>
                              }
                              error={
                                !!(
                                  errors.confirmPassword &&
                                  touched.confirmPassword
                                )
                              }
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="mt-1 text-xs text-red-500"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        variant="default"
                        size="default"
                        className="w-full md:w-auto"
                        disabled={
                          changePasswordMutation.isPending || isSubmitting
                        }
                      >
                        {changePasswordMutation.isPending || isSubmitting
                          ? t("profile.saving")
                          : t("profile.save")}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
