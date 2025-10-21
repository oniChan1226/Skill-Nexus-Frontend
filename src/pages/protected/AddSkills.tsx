import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import Button from "@/components/shared/Button";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";

const AddSkills = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* === BREADCRUMB === */}
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
              <BreadcrumbPage>Add Skills</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <IconArrowLeft size={18} /> Back to Dashboard
        </Link>
      </div>

      {/* === MAIN CARD === */}
      <Card className="border border-neutral-200 dark:border-neutral-800 shadow-md bg-white dark:bg-neutral-950">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
            Add New Skill
          </CardTitle>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Add skills you want to offer or learn. These will appear in your
            profile and help others connect with you.
          </p>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="offered" className="w-full">
            <TabsList className="grid grid-cols-2 w-full dark:bg-neutral-900/90">
              <TabsTrigger
                value="offered"
                className="data-[state=active]:dark:bg-neutral-800 data-[state=active]:dark:text-white data-[state=active]:dark:border-neutral-700 shadow-sm transition-all"
              >
                Offered Skill
              </TabsTrigger>
              <TabsTrigger
                value="required"
                className="data-[state=active]:dark:bg-neutral-800 data-[state=active]:dark:text-white data-[state=active]:dark:border-neutral-700 shadow-sm transition-all"
              >
                Required Skill
              </TabsTrigger>
            </TabsList>

            {/* === OFFERED SKILL TAB === */}
            <TabsContent value="offered" className="mt-6">
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="name" className="dark:text-white">
                      Skill Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Web Development"
                      className="bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                    />
                  </div>
                  <div className="space-y-1 w-full">
                    <Label htmlFor="level" className="dark:text-white">
                      Proficiency Level
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full bg-neutral-50 text-neutral-900 dark:bg-neutral-800 dark:border-neutral-800 dark:hover:bg-neutral-700/60 dark:text-neutral-100">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-700">
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="category" className="dark:text-white">
                    Categories
                  </Label>
                  <Input
                    id="category"
                    placeholder="e.g. Programming, Design"
                    className="bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="desc" className="dark:text-white">
                    Description
                  </Label>
                  <Textarea
                    id="desc"
                    placeholder="Describe your skill, tools you use, or your experience..."
                    className="bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <Button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 mt-3"
                >
                  <IconPlus size={18} /> Add Offered Skill
                </Button>
              </form>
            </TabsContent>

            {/* === REQUIRED SKILL TAB === */}
            <TabsContent value="required" className="mt-6">
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="rname" className="dark:text-white">
                      Skill Name
                    </Label>
                    <Input
                      id="rname"
                      placeholder="e.g. Public Speaking"
                      className="bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="priority" className="dark:text-white">
                      Learning Priority
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-800 dark:hover:bg-neutral-700/60 dark:text-neutral-100">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-700">
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="rlevel" className="dark:text-white">
                    Current Level
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-800 dark:hover:bg-neutral-700/60 dark:text-neutral-100">
                      <SelectValue placeholder="Select current level" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-700 ">
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="rdesc" className="dark:text-white">
                    Description
                  </Label>
                  <Textarea
                    id="rdesc"
                    placeholder="Why do you want to learn this skill? What are your goals?"
                    className="bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <Button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 mt-3"
                >
                  <IconPlus size={18} /> Add Required Skill
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSkills;
