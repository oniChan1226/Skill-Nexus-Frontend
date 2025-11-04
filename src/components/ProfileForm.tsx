import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Button from "./shared/Button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/schemas/ProfileSchema";
import { shallowEqual, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useUpdateUserMutation } from "@/services/user.service";
import type { UserModal } from "@/types/user.types";
import { toast } from "react-toastify";

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const { user } = useSelector((state: RootState) => state.auth, shallowEqual);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (user) {
      const userData: Partial<ProfileFormData> = {
        name: user.name || "",
        age: String(user.age) || "",
        email: user.email || "",
        profession: user.profession || "",
        bio: user.bio || "",
        country: user.address?.country || "",
        city: user.address?.city || "",
        ...user?.socialLinks,
        // github: user.socialLinks.github || "",
        // linkedin: user.socialLinks.linkedin || "",
        // twitter: user.socialLinks.twitter || "",
        // portfolio: user.socialLinks.portfolio || "",
      };
      reset(userData);
    }
  }, [user, reset]);

  // ✅ Form Submit Handler
  const onSubmit = async (data: ProfileFormData) => {
    const payload = {
      name: data.name,
      age: Number(data.age),
      email: data.email,
      bio: data.bio,
      profession: data.profession,
      address: {
        country: data.country,
        city: data.city,
      },
      socialLinks: {
        github: data.github,
        linkedin: data.linkedin,
        twitter: data.twitter,
        portfolio: data.portfolio,
      },
    };

    try {
      await updateUser(payload as UserModal).unwrap();
      toast.success("Profile updated successfully!");
      // Optional: show success toast or update state
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-7xl mx-auto mt-10 space-y-10 bg-neutral-50 dark:bg-neutral-900 
                 border border-neutral-200 dark:border-neutral-800 rounded-xl 
                 p-6 md:p-10 shadow-sm transition-colors duration-300"
    >
      {/* === Basic Info === */}
      <FieldSet>
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
          Basic Information
        </h2>
        <FieldGroup>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name")}
                className={`${
                  errors.name ? "border-red-500 focus:ring-red-500" : ""
                } bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                  dark:border-neutral-700 text-neutral-900 dark:text-neutral-100`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="age">Age</FieldLabel>
              <Input
                id="age"
                type="number"
                placeholder="25"
                {...register("age")}
                className={`${
                  errors.age ? "border-red-500 focus:ring-red-500" : ""
                } bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                  dark:border-neutral-700 text-neutral-900 dark:text-neutral-100`}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.age.message}
                </p>
              )}
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                {...register("email")}
                className={`${
                  errors.email ? "border-red-500 focus:ring-red-500" : ""
                } bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                dark:border-neutral-700 text-neutral-900 dark:text-neutral-100`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
              <FieldDescription>
                Your email is used for login and notifications.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="profession">Profession</FieldLabel>
              <Input
                id="profession"
                type="text"
                placeholder="Software Developer"
                {...register("profession")}
                className={`${
                  errors.profession ? "border-red-500 focus:ring-red-500" : ""
                } bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                dark:border-neutral-700 text-neutral-900 dark:text-neutral-100`}
              />
              {errors.profession && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.profession.message}
                </p>
              )}
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>

      {/* === Bio === */}
      <FieldGroup>
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
          About You
        </h2>
        <Field>
          <FieldLabel htmlFor="bio">Bio</FieldLabel>
          <Textarea
            id="bio"
            placeholder="Tell us a little about yourself..."
            {...register("bio")}
            rows={4}
            className={`${
              errors.bio ? "border-red-500 focus:ring-red-500" : ""
            } resize-none bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
              dark:border-neutral-700 text-neutral-900 dark:text-neutral-100`}
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
        </Field>
      </FieldGroup>

      <Separator className="bg-neutral-200 dark:bg-neutral-800" />

      {/* === Address === */}
      <FieldSet>
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
          Address
        </h2>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="country">Country</FieldLabel>
            <Input
              id="country"
              placeholder="Pakistan"
              {...register("country")}
              className={`${
                errors.country ? "border-red-500 focus:ring-red-500" : ""
              } bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                dark:border-neutral-700 text-neutral-900 dark:text-neutral-100`}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input
              id="city"
              placeholder="Lahore"
              {...register("city")}
              className={`${
                errors.city ? "border-red-500 focus:ring-red-500" : ""
              } bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                dark:border-neutral-700 text-neutral-900 dark:text-neutral-100`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>

      <Separator className="bg-neutral-200 dark:bg-neutral-800" />

      {/* === Social Links === */}
      <FieldSet>
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
          Social Links
        </h2>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["github", "linkedin", "twitter", "portfolio"].map((platform) => (
            <Field key={platform}>
              <FieldLabel htmlFor={platform}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </FieldLabel>
              <Input
                id={platform}
                placeholder={`https://${platform}.com/username`}
                {...register(platform as keyof ProfileFormData)}
                className={`${
                  errors[platform as keyof ProfileFormData]
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                } bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                  dark:border-neutral-700 text-neutral-900 dark:text-neutral-100`}
              />
              {errors[platform as keyof ProfileFormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[platform as keyof ProfileFormData]?.message as string}
                </p>
              )}
            </Field>
          ))}
        </FieldGroup>
      </FieldSet>

      {/* === Submit === */}
      <div className="flex justify-end">
        <Button
          className="px-4 py-2 flex items-center space-x-1 group duration-300"
          type="submit"
          disabled={isLoading}
        >
          <IconDeviceFloppy
            size={22}
            className="group-hover:rotate-12 group-hover:scale-105 duration-300"
          />
          <span>{isLoading ? "Saving..." : "Save Changes"}</span>
        </Button>
      </div>
    </form>
  );
}
