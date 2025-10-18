import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Button from "@/components/shared/Button";
import { IconDeviceFloppy } from "@tabler/icons-react";
import ProfileForm from "@/components/ProfileForm";

const ProfileSetup = () => {
  return (
    <div>
      <section className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard/profile">Profile</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button className="px-6 py-2 flex items-center space-x-2 group transition-all duration-300">
            <IconDeviceFloppy className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105" />
            <span className="font-semibold">Save</span>
          </Button>
        </div>
      </section>
      <ProfileForm />
    </div>
  );
};

export default ProfileSetup;
