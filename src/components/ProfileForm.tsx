import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProfileForm() {
  return (
    <form
      className="max-w-5xl mx-auto mt-10 space-y-10 bg-neutral-50 dark:bg-neutral-900 
                 border border-neutral-200 dark:border-neutral-800 rounded-xl 
                 p-6 md:p-10 shadow-sm transition-colors duration-300"
    >
      {/* === Basic Info === */}
      <FieldSet>
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 ">
          Basic Information
        </h2>
        <FieldGroup>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="name" className="text-neutral-700 dark:text-neutral-300">
                Full Name
              </FieldLabel>
              <Input
                id="name"
                placeholder="John Doe"
                className="bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                           dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="age" className="text-neutral-700 dark:text-neutral-300">
                Age
              </FieldLabel>
              <Input
                id="age"
                type="number"
                placeholder="25"
                className="bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                           dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="email" className="text-neutral-700 dark:text-neutral-300">
              Email
            </FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              className="bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                         dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
            />
            <FieldDescription className="text-neutral-500 dark:text-neutral-400">
              Your email is used for login and notifications.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>

      {/* === Bio === */}
      <FieldGroup>
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 ">
          About You
        </h2>
        <Field>
          <FieldLabel htmlFor="bio" className="text-neutral-700 dark:text-neutral-300">
            Bio
          </FieldLabel>
          <Textarea
            id="bio"
            placeholder="Tell us a little about yourself..."
            className="resize-none bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                       dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
            rows={4}
          />
        </Field>
      </FieldGroup>

      <Separator className="bg-neutral-200 dark:bg-neutral-800" />

      {/* === Address === */}
      <FieldSet>
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 ">
          Address
        </h2>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="country" className="text-neutral-700 dark:text-neutral-300">
              Country
            </FieldLabel>
            <Input
              id="country"
              placeholder="Pakistan"
              className="bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                         dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="city" className="text-neutral-700 dark:text-neutral-300">
              City
            </FieldLabel>
            <Input
              id="city"
              placeholder="Lahore"
              className="bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                         dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <Separator className="bg-neutral-200 dark:bg-neutral-800" />

      {/* === Social Links === */}
      <FieldSet>
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 ">
          Social Links
        </h2>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="github" className="text-neutral-700 dark:text-neutral-300">
              GitHub
            </FieldLabel>
            <Input
              id="github"
              placeholder="https://github.com/username"
              className="bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                         dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="linkedin" className="text-neutral-700 dark:text-neutral-300">
              LinkedIn
            </FieldLabel>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/username"
              className="bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                         dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="twitter" className="text-neutral-700 dark:text-neutral-300">
              Twitter
            </FieldLabel>
            <Input
              id="twitter"
              placeholder="https://twitter.com/username"
              className="bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                         dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="portfolio" className="text-neutral-700 dark:text-neutral-300">
              Portfolio
            </FieldLabel>
            <Input
              id="portfolio"
              placeholder="https://myportfolio.com"
              className="bg-neutral-100 dark:bg-neutral-800 border-neutral-200 
                         dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      {/* === Submit === */}
      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          className="px-6 py-2 bg-neutral-900 text-white hover:bg-neutral-800 
                     dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 
                     transition-all duration-200"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
